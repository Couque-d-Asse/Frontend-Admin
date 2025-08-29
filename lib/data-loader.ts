// CSV 데이터 로드 및 처리 함수들

export interface ComplaintData {
    date: string
    count: number
    change: number
  }
  
  export interface RawComplaintData {
    일자: string
    기관: string
    분야: string
    건수: string
  }

  export interface ComplaintItem {
    id: number
    title: string
    registeredAt: string
    content: string
    type: string
  }
  
  // CSV 텍스트를 파싱하는 함수
  function parseCSV(csvText: string): RawComplaintData[] {
    const lines = csvText.trim().split('\n')
    const data: RawComplaintData[] = []
    
    // 첫 번째 행은 헤더이므로 건너뛰고 두 번째 행부터 파싱
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (line.trim()) {
        // CSV 파싱 (쉼표로 구분, 따옴표 제거)
        const values = line.split(',').map(val => val.replace(/"/g, '').trim())
        if (values.length >= 4) {
          data.push({
            일자: values[0],
            기관: values[1],
            분야: values[2],
            건수: values[3]
          })
        }
      }
    }
    
    return data
  }
  
  // 민원 CSV 텍스트를 파싱하는 함수
  function parseComplaintsCSV(csvText: string): ComplaintItem[] {
    const lines = csvText.trim().split('\n')
    const data: ComplaintItem[] = []
    
    // 첫 번째 행은 헤더이므로 건너뛰고 두 번째 행부터 파싱
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (line.trim()) {
        // CSV 파싱 (쉼표로 구분, 따옴표 처리)
        const values = parseCSVLine(line)
        if (values.length >= 4) {
          data.push({
            id: i, // 인덱스를 ID로 사용
            title: values[0],
            registeredAt: values[1],
            content: values[2],
            type: values[3]
          })
        }
      }
    }
    
    return data
  }

  // CSV 라인을 파싱하는 함수 (따옴표 처리)
  function parseCSVLine(line: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    let i = 0
    
    while (i < line.length) {
      const char = line[i]
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // 이스케이프된 따옴표
          current += '"'
          i += 2
        } else {
          // 따옴표 시작/끝
          inQuotes = !inQuotes
          i++
        }
      } else if (char === ',' && !inQuotes) {
        // 필드 구분자
        result.push(current.trim())
        current = ''
        i++
      } else {
        // 일반 문자
        current += char
        i++
      }
    }
    
    // 마지막 필드 추가
    result.push(current.trim())
    
    return result
  }
  
  // 증감률 계산 함수
  function calculateChange(current: number, previous: number): number {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  // 민원 데이터 로드 함수
  export async function loadComplaintsData(): Promise<ComplaintItem[]> {
    try {
      const filePath = '/data/complaints/traffic_issues_final_corrected.csv'
      
      // CSV 파일 로드
      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error(`Failed to load CSV file: ${response.statusText}`)
      }
      
      const csvText = await response.text()
      const complaintsData = parseComplaintsCSV(csvText)
      
      return complaintsData
    } catch (error) {
      console.error('Error loading complaints data:', error)
      // 에러 시 기본 데이터 반환
      return []
    }
  }
  
  // CSV 파일에서 데이터 로드 및 처리
  export async function loadComplaintData(
    period: 'daily' | 'monthly',
    category: 'traffic' | 'road'
  ): Promise<ComplaintData[]> {
    try {
      // 파일 경로 설정
      const fileName = period === 'daily' ? 'Daily_2025-08-28.csv' : 'Monthly_2025-08-28.csv'
      const filePath = `/data/charts/complaint-trends/${fileName}`
      
      // CSV 파일 로드
      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error(`Failed to load CSV file: ${response.statusText}`)
      }
      
      const csvText = await response.text()
      const rawData = parseCSV(csvText)
      
      // 카테고리별 필터링
      const categoryMap = {
        'traffic': '교통',
        'road': '도로'
      }
      
      const filteredData = rawData.filter((item: RawComplaintData) => item.분야 === categoryMap[category])
      
      // 날짜별로 그룹화하고 건수 합계 계산
      const groupedData = new Map<string, number>()
      filteredData.forEach((item: RawComplaintData) => {
        const date = item.일자
        const count = parseInt(item.건수) || 0
        groupedData.set(date, (groupedData.get(date) || 0) + count)
      })
      
      // 날짜순으로 정렬
      const sortedEntries = Array.from(groupedData.entries()).sort((a, b) => {
        return new Date(a[0]).getTime() - new Date(b[0]).getTime()
      })
      
      // ComplaintData 형태로 변환하고 증감률 계산
      const result: ComplaintData[] = []
      for (let i = 0; i < sortedEntries.length; i++) {
        const [date, count] = sortedEntries[i]
        const previousCount = i > 0 ? sortedEntries[i - 1][1] : count
        const change = calculateChange(count, previousCount)
        
        // 날짜 형식 변환 (YYYY-MM-DD -> YY.MM.DD)
        const formattedDate = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2.$3')
        
        result.push({
          date: formattedDate,
          count,
          change: Math.round(change * 10) / 10 // 소수점 첫째자리까지
        })
      }
      
      return result
    } catch (error) {
      console.error('Error loading complaint data:', error)
      // 에러 시 기본 데이터 반환
      return []
    }
  }