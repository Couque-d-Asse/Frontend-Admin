# 동대문 대시보드 (Dongdaemun Dashboard)

동대문 지역의 교통·도로 민원을 실시간으로 모니터링하고 분석하는 웹 기반 대시보드 애플리케이션입니다.

## 🚀 프로젝트 개요

이 프로젝트는 동대문 지역의 교통 및 도로 관련 민원 데이터를 시각화하고 분석하여 효율적인 도시 관리와 민원 대응을 지원하는 대시보드입니다.

### 주요 기능
- **실시간 민원 현황**: 현재 발생한 민원들을 실시간으로 표시
- **키워드 워드클라우드**: 민원 키워드를 시각적으로 분석
- **민원 발생 추이**: 일별/월별 민원 발생 통계 차트
- **민원 상세 조회**: 개별 민원의 상세 정보 확인
- **카테고리별 분석**: 민원 유형별 분류 및 분석
- **반응형 디자인**: 다양한 디바이스에서 최적화된 사용자 경험

## 🛠 기술 스택

### Frontend Framework
- **Next.js 15.2.4**: React 기반의 풀스택 프레임워크
- **React 19**: 사용자 인터페이스 구축
- **TypeScript 5**: 타입 안전성 보장

### UI/UX 라이브러리
- **Tailwind CSS 4.1.9**: 유틸리티 기반 CSS 프레임워크
- **Radix UI**: 접근성이 뛰어난 UI 컴포넌트 라이브러리
- **Lucide React**: 아이콘 라이브러리
- **Recharts**: 데이터 시각화 차트 라이브러리

### 상태 관리 및 폼
- **React Hook Form**: 폼 상태 관리
- **Zod**: 스키마 검증

### 개발 도구
- **PostCSS**: CSS 전처리기
- **ESLint**: 코드 품질 관리
- **Autoprefixer**: CSS 벤더 프리픽스 자동화

## 📁 프로젝트 구조

```
dongdaemun-dashboard/
├── app/                          # Next.js App Router
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지
├── components/                   # React 컴포넌트
│   ├── ui/                      # 재사용 가능한 UI 컴포넌트
│   ├── dashboard-home.tsx       # 대시보드 홈 페이지
│   ├── sidebar.tsx              # 사이드바 네비게이션
│   ├── complaint-chart.tsx      # 민원 차트 컴포넌트
│   ├── word-cloud.tsx           # 워드클라우드 컴포넌트
│   ├── realtime-complaints.tsx  # 실시간 민원 목록
│   └── ...                      # 기타 페이지 컴포넌트
├── lib/                         # 유틸리티 함수
│   ├── utils.ts                 # 공통 유틸리티
│   └── data-loader.ts           # 데이터 로딩 로직
├── public/                      # 정적 파일
│   ├── data/                    # CSV 데이터 파일
│   │   └── charts/
│   │       └── complaint-trends/
│   │           ├── Daily_2025-08-28.csv
│   │           └── Monthly_2025-08-28.csv
│   └── images/                  # 이미지 파일
└── hooks/                       # 커스텀 React 훅
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 pnpm 패키지 매니저

### 민원 데이터 구조
```typescript
interface Complaint {
  id: string
  title: string
  category: string
  status: string
  createdAt: string
  description: string
  location: string
  priority: 'high' | 'medium' | 'low'
}
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #B22B78 (동대문 브랜드 컬러)
- **Background**: #FFFFFF (흰색)
- **Text**: #000000 (검정색)
- **Border**: #E5E7EB (회색)

### 컴포넌트 라이브러리
- **shadcn/ui**: Radix UI 기반의 재사용 가능한 컴포넌트
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **다크 모드 지원**: 시스템 테마에 따른 자동 전환

## 🔧 개발 가이드

### 컴포넌트 작성 규칙
1. **TypeScript 사용**: 모든 컴포넌트는 TypeScript로 작성
2. **Props 인터페이스 정의**: 명확한 타입 정의
3. **재사용성 고려**: 범용적으로 사용 가능한 컴포넌트 설계
4. **접근성 준수**: ARIA 라벨 및 키보드 네비게이션 지원

### 코드 스타일
- **ESLint**: 코드 품질 및 일관성 유지
- **Prettier**: 코드 포맷팅 자동화
- **TypeScript strict mode**: 엄격한 타입 검사

## 📈 성능 최적화

- **Next.js App Router**: 서버 컴포넌트 활용
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 스플리팅**: 동적 import를 통한 번들 최적화
- **캐싱 전략**: 정적 데이터 캐싱

## 🧪 테스트

```bash
# 린트 검사
npm run lint

# 타입 체크
npx tsc --noEmit
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

**최종 업데이트**: 2025년 1월
