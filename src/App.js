import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, Lock, HelpCircle, Eye, Edit3 } from 'lucide-react';

const CareerAspirationWorkbook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');

  const [basicInfo, setBasicInfo] = useState({
    job: '',
    company: ''
  });

  const [answers, setAnswers] = useState({});

  const handleLogin = () => {
    if (password === 'CeIp2025@') {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 직무와 회사를 입력하세요' },
    {
      id: 1,
      title: 'STEP 1: 직무 이해 및 목표 설정',
      subtitle: '지원하는 직무에 대한 명확한 이해와 목표 수립',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 이 직무의 핵심 업무 3가지는 무엇인가요?',
          hint: '구체적이고 실무 중심적인 업무',
          guide: {
            description: '답변 가이드: 채용공고와 직무소개서를 기반으로 핵심 업무 파악',
            diagnosis: '즉석자가진단: "그 업무를 왜 하나요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '채용공고에서 강조한 업무는?',
              '이 직무의 최종 목표는?',
              '하루 일과의 대부분을 차지하는 업무는?'
            ],
            ifDifficult: '채용공고의 "주요업무" 섹션을 다시 읽어보세요.',
            ifStillDifficult: '현직자 인터뷰나 직무 소개 영상을 찾아보세요.'
          },
          placeholder: '예: 첫 번째 핵심 업무는 고객 데이터 분석을 통한 마케팅 인사이트 도출입니다. 매주 고객 행동 패턴을 분석하여 캠페인 효과를 측정하고 개선안을 제시합니다.',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 입사 1년차에 예상되는 업무는?',
          hint: '신입사원이 현실적으로 수행할 수 있는 업무',
          guide: {
            description: '답변 가이드: 신입사원 수준에서 현실적으로 가능한 업무',
            diagnosis: '즉석자가진단: "신입이 정말 할 수 있나요?"에 답변 가능한가?',
            helpQuestions: [
              '선배의 지도를 받으며 할 수 있는 일은?',
              '보조적인 역할로 참여할 수 있는 업무는?',
              '독립적으로 수행 가능한 단순 업무는?'
            ],
            ifDifficult: '선배들의 업무를 보조하는 역할부터 시작하세요.',
            ifStillDifficult: '"데이터 정리를 담당하며", "팀 회의 자료 준비를 지원하고", "간단한 리포트 작성을 독립적으로 수행할 수 있을 것입니다"처럼 신입사원 수준에 맞는 현실적인 업무를 작성하세요.'
          },
          placeholder: '예: 입사 1년차에는 선배님들의 지도를 받아 기본적인 데이터 분석 업무를 수행하고, 주간/월간 리포트 작성을 담당하며, 팀 프로젝트에서 보조적인 역할을 수행하면서 실무를 익혀나갈 것으로 예상합니다.',
          rows: 3
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 이 직무에서 5년 후 전문가가 되기 위해 필요한 역량은 무엇인가요?',
          hint: '중장기적으로 개발해야 할 전문 역량',
          guide: {
            description: '답변 가이드: 중장기적으로 개발해야 할 전문 역량',
            diagnosis: '즉석자가진단: "그게 이 분야의 전문가 기준인가요?"에 답변 가능한가?',
            helpQuestions: [
              '이 분야의 전문가들이 공통적으로 갖춘 역량은?',
              '기술적 역량과 소프트 스킬 중 무엇이 더 중요한가?',
              '시장에서 인정받는 전문가의 기준은?'
            ],
            ifDifficult: '해당 직무 5년차 이상 선배들의 이력을 분석해 보세요.',
            ifStillDifficult: '"모든 것을 다 잘하는 전문가"라는 막연한 표현보다, "데이터 분석에서는 고급 통계 기법과 머신러닝을 활용할 수 있고", "비즈니스 측면에서는 ROI 기반 의사결정을 주도할 수 있으며", "팀 관리 면에서는 주니어 멤버를 멘토링할 수 있는 수준"처럼 구체적인 역량으로 나누어 작성하세요.'
          },
          placeholder: '예: 5년 후 전문가가 되기 위해서는 첫째, 고급 데이터 분석 기술과 비즈니스 인사이트 도출 능력이 필요하고, 둘째, 프로젝트 매니지먼트와 팀 리더십 역량이 요구되며, 셋째, 업계 트렌드를 선도할 수 있는 전략적 사고력이 필수적이라고 생각합니다.',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 현재 역량 진단',
      subtitle: '현재 보유 역량과 부족한 부분 파악',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 현재 보유하고 있는 관련 역량은 무엇인가요?',
          hint: '즉시 활용 가능한 역량 중심',
          guide: {
            description: '답변 가이드: 즉시 활용 가능한 역량 중심으로 구체적 수준 명시',
            diagnosis: '즉석자가진단: 각 역량을 증명할 수 있는 경험이 있나요?',
            helpQuestions: [
              '지금 당장 할 수 있는 것은 무엇인가요?',
              '어떤 도구나 프로그램을 사용할 수 있나요?',
              '관련 프로젝트나 활동 경험이 있나요?'
            ],
            ifDifficult: 'Excel 중급 (피벗테이블, VLOOKUP 활용 가능), Python 기초 (데이터 전처리 프로젝트 경험), 팀 프로젝트 리드 경험 (3회) 같은 구체적인 수준을 명시하세요.',
            ifStillDifficult: '"아무것도 할 수 없다"고 생각하지 마세요. 학교 수업에서 배운 것, 동아리에서 사용한 것, 개인적으로 익힌 것 모두가 역량입니다. "Excel 기초 수준이지만 수업 과제에서 데이터 정리에 활용했고", "프레젠테이션 능력은 발표 수업을 통해 기본기를 갖추었으며", "팀워크는 3번의 팀 프로젝트를 통해 경험했습니다"처럼 작은 경험도 구체적으로 표현하세요.'
          },
          placeholder: '예: 현재 데이터 분석 도구인 Excel은 중급 수준으로 피벗테이블과 각종 함수를 활용할 수 있으며, Python은 기초 문법을 익혀 간단한 데이터 전처리가 가능합니다. 또한 3회의 팀 프로젝트 리더 경험을 통해 프로젝트 관리와 커뮤니케이션 역량을 보유하고 있습니다.',
          rows: 3
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 부족하다고 느끼는 역량은 무엇인가요?',
          hint: '솔직하되 개선 의지를 함께 표현',
          guide: {
            description: '답변 가이드: 솔직하되 개선 의지를 함께 표현',
            diagnosis: '즉석자가진단: 단기간에 개선 가능한 수준인가요?',
            helpQuestions: [
              'STEP 1에서 파악한 필요 역량 중 부족한 것은?',
              '당장은 할 수 없지만 배우고 싶은 것은?',
              '업무 수행 시 가장 걱정되는 부분은?'
            ],
            ifDifficult: '데이터 시각화 도구 (Tableau) 미숙, 비즈니스 영어 커뮤니케이션 부족, 업계 도메인 지식 초급 수준 같은 구체적인 부족함을 인정하세요.',
            ifStillDifficult: '"모든 것이 부족하다"는 막연한 표현보다, "데이터 시각화 도구는 아직 다루지 못하지만 온라인 강의로 학습 중이고", "업계 전문 용어는 익숙하지 않지만 관련 서적을 읽으며 익히고 있으며", "프레젠테이션 스킬은 부족하지만 스터디를 통해 연습하고 있습니다"처럼 구체적인 부족함과 개선 노력을 함께 표현하세요.'
          },
          placeholder: '예: 현재 데이터 시각화 도구인 Tableau 활용 능력이 부족하고, 비즈니스 영어로 보고서를 작성하는 것에 어려움을 느끼며, 마케팅 업계의 전문 용어와 트렌드에 대한 이해가 아직 초급 수준에 머물러 있다고 판단합니다.',
          rows: 3
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 이미 시작한 역량 개발 노력이 있나요?',
          hint: '구체적인 학습 활동과 시기 명시',
          guide: {
            description: '답변 가이드: 구체적인 학습 활동과 시기 명시',
            diagnosis: '즉석자가진단: 증명 가능한 활동인가요?',
            helpQuestions: [
              '최근 3개월 내 시작한 학습 활동은?',
              '온라인 강의나 자격증 준비 중인 것은?',
              '관련 프로젝트나 스터디 참여는?'
            ],
            ifDifficult: '온라인 강의 수강 중, 관련 도서 읽기, 현직자 멘토링 받기, 스터디 그룹 참여 같은 구체적인 활동을 명시하세요.',
            ifStillDifficult: '"열심히 준비하겠다"보다 "이미 코세라에서 데이터 분석 강의를 수강 중이고", "매일 30분씩 업계 뉴스를 읽으며", "주말마다 개인 프로젝트를 진행하고 있습니다"처럼 실제 진행 중인 활동을 작성하세요.'
          },
          placeholder: '예: Tableau 역량 강화를 위해 이미 유데미 강의를 구매했고, 향후 2개월간 주 5시간씩 학습할 계획입니다. 또한 캐글 데이터셋을 활용한 실습 프로젝트를 월 2개씩 진행하여 입사 전까지 포트폴리오 5개를 완성할 예정입니다.',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 1년 내 단기 목표',
      subtitle: '입사 후 1년 내 구체적인 성장 목표',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 입사 후 1년 내 달성하고 싶은 구체적 목표는?',
          hint: '측정 가능하고 현실적인 목표',
          guide: {
            description: '답변 가이드: 측정 가능하고 현실적인 1년차 목표',
            diagnosis: '즉석자가진단: "1년 안에 가능한가요?"에 답변 가능한가?',
            helpQuestions: [
              '독립적으로 수행하고 싶은 업무는?',
              '어떤 프로젝트에 참여하고 싶은가?',
              '어떤 역량을 개발하고 싶은가?'
            ],
            ifDifficult: '신입사원의 일반적인 성장 단계를 참고하세요.',
            ifStillDifficult: '"빨리 배우겠다"보다 "1년 내 소규모 프로젝트를 독립적으로 수행하고", "분기별 리포트 작성을 담당하며", "팀 내 데이터 분석 전문가로 인정받겠습니다"처럼 구체적인 목표를 설정하세요.'
          },
          placeholder: '예: 입사 1년 내에 팀의 주간 데이터 분석 리포트를 독립적으로 작성하고, 소규모 마케팅 캠페인 2개를 기획부터 실행까지 주도하며, 사내 데이터 분석 툴을 능숙하게 활용하여 팀원들에게 교육할 수 있는 수준에 도달하고 싶습니다.',
          rows: 3
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 목표 달성을 위한 구체적 실행 계획은?',
          hint: '단계별, 시기별 구체적 계획',
          guide: {
            description: '답변 가이드: 단계별, 시기별 구체적 실행 계획',
            diagnosis: '즉석자가진단: "다음 달에는 뭘 할 건가요?"에 즉답 가능한가?',
            helpQuestions: [
              '월별/분기별 세부 계획은?',
              '누구의 도움을 받을 것인가?',
              '어떤 자원이 필요한가?'
            ],
            ifDifficult: '3개월 단위로 계획을 나누어 보세요.',
            ifStillDifficult: '"열심히 하겠다"보다 "첫 3개월: 업무 프로세스 숙지 및 선배 업무 보조", "3-6개월: 간단한 업무 독립 수행", "6-12개월: 소규모 프로젝트 리드"처럼 시기별 계획을 수립하세요.'
          },
          placeholder: '예: 첫 3개월은 선배님들의 업무를 보조하며 실무 프로세스를 익히고, 3-6개월차에는 주간 리포트 작성을 독립적으로 담당하며, 6-12개월차에는 소규모 캠페인을 직접 기획하고 실행하는 경험을 쌓겠습니다. 매주 금요일 선배님과 1:1 미팅을 통해 피드백을 받고, 분기마다 목표 달성도를 점검하겠습니다.',
          rows: 3
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 1년차 성과를 어떻게 측정할 것인가?',
          hint: '객관적이고 측정 가능한 지표',
          guide: {
            description: '답변 가이드: 객관적이고 측정 가능한 성과 지표',
            diagnosis: '즉석자가진단: "어떻게 증명할 건가요?"에 답변 가능한가?',
            helpQuestions: [
              '정량적 지표는 무엇인가?',
              '정성적 평가 기준은?',
              '누가 평가할 것인가?'
            ],
            ifDifficult: '숫자로 표현할 수 있는 것을 찾으세요.',
            ifStillDifficult: '"잘하고 있다는 평가"보다 "리포트 작성 오류율 5% 이하 유지", "캠페인 목표 달성률 80% 이상", "팀 내 만족도 평가 4.0/5.0 이상"처럼 구체적인 지표를 설정하세요.'
          },
          placeholder: '예: 주간 리포트의 정확도 95% 이상 유지, 담당한 캠페인의 목표 KPI 달성률 80% 이상, 팀장님 및 선배님들의 분기별 평가에서 "기대 이상" 평가 획득, 그리고 사내 데이터 분석 툴 활용 능력 인증 시험 통과로 성과를 측정하겠습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 3-5년 중기 목표',
      subtitle: '전문성 개발 및 리더십 구축',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 3-5년 후 도달하고 싶은 전문성 수준은?',
          hint: '구체적인 전문성 수준과 역할',
          guide: {
            description: '답변 가이드: 구체적인 전문성 수준과 역할',
            diagnosis: '즉석자가진단: "그 수준이 현실적인가요?"에 답변 가능한가?',
            helpQuestions: [
              '어떤 분야의 전문가가 되고 싶은가?',
              '조직 내에서 어떤 역할을 맡고 싶은가?',
              '어떤 프로젝트를 리드하고 싶은가?'
            ],
            ifDifficult: '해당 분야 3-5년차 선배들의 역할을 참고하세요.',
            ifStillDifficult: '"전문가가 되겠다"보다 "데이터 기반 마케팅 전략 수립 전문가로 성장하여 중대형 프로젝트를 리드하고", "팀 내 데이터 분석 방법론을 확립하며", "주니어 멤버 2-3명을 멘토링할 수 있는 수준"처럼 구체적으로 작성하세요.'
          },
          placeholder: '예: 3-5년 후에는 데이터 기반 마케팅 전략 수립 전문가로 성장하여, 연간 예산 5억 이상의 중대형 프로젝트를 독립적으로 기획하고 실행할 수 있으며, 팀 내에서 데이터 분석 방법론을 선도하고 주니어 멤버 2-3명을 멘토링하는 시니어 역할을 수행하고 싶습니다.',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 이를 위한 경력 개발 계획은?',
          hint: '단계별 역량 확장 계획',
          guide: {
            description: '답변 가이드: 단계별 역량 확장 계획',
            diagnosis: '즉석자가진단: "어떻게 그 수준에 도달할 건가요?"에 답변 가능한가?',
            helpQuestions: [
              '1년차 기초 위에 무엇을 쌓을 건가요?',
              '어떤 프로젝트 경험이 필요한가요?',
              '추가로 필요한 교육이나 자격은?'
            ],
            ifDifficult: '2년차: 심화 업무 담당 및 소규모 프로젝트 참여, 3년차: 프로젝트 일부 리드 및 전문 자격 취득, 4-5년차: 독립 프로젝트 수행 및 후배 지도 같은 단계별 계획을 수립하세요.',
            ifStillDifficult: '"계속 열심히 하겠다"보다 "2년차에는 A 업무 마스터 + B 자격증 취득", "3년차에는 C 프로젝트 참여 + D 스킬 습득", "4-5년차에는 E 역할 수행 + F 전문성 확보"처럼 연차별 구체적 목표를 설정하세요.'
          },
          placeholder: '예: 2년차에는 심화 데이터 분석 업무를 담당하며 Google Analytics 자격증을 취득하고, 3년차에는 소규모 캠페인을 독립적으로 운영하며 프로젝트 매니지먼트 역량을 기르고, 4-5년차에는 중형 프로젝트를 리드하며 팀원 멘토링을 시작할 계획입니다.',
          rows: 3
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 목표하는 역할과 책임은?',
          hint: '조직 내 포지션과 기여 영역',
          guide: {
            description: '답변 가이드: 조직 내 포지션과 기여 영역',
            diagnosis: '즉석자가진단: "회사 조직 구조상 가능한가요?"에 답변 가능한가?',
            helpQuestions: [
              '팀 내에서 어떤 역할을 맡고 싶나요?',
              '어떤 의사결정에 참여하고 싶나요?',
              '어떤 성과로 인정받고 싶나요?'
            ],
            ifDifficult: '특정 업무 영역의 담당자/책임자, 신규 프로젝트 기획 참여, 팀 성과 향상에 핵심 기여 같은 구체적인 역할과 책임을 명시하세요.',
            ifStillDifficult: '"리더가 되겠다"보다 "데이터 분석 파트의 책임자로서 팀의 분석 방법론을 확립하고", "신규 마케팅 전략 수립에 핵심 기여하며", "팀 KPI 달성에 30% 이상 기여하는 역할"처럼 구체적으로 작성하세요.'
          },
          placeholder: '예: 3-5년 후에는 데이터 분석팀의 시니어 멤버로서 팀의 분석 방법론과 프로세스 개선을 주도하고, 전사 마케팅 전략 회의에 정기적으로 참여하여 데이터 기반 의사결정을 지원하며, 연간 팀 목표 달성에 30% 이상 기여하는 핵심 인재로 자리잡고 싶습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 5년 후 장기 비전',
      subtitle: '장기적 전문가상과 영향력',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 5년 후 어떤 전문가가 되고 싶은가?',
          hint: '구체적인 전문가상과 전문 분야',
          guide: {
            description: '답변 가이드: 구체적인 전문가상과 전문 분야',
            diagnosis: '즉석자가진단: "그런 전문가가 실제로 있나요?"에 답변 가능한가?',
            helpQuestions: [
              '어떤 분야에서 인정받고 싶은가?',
              '어떤 문제를 해결하는 전문가인가?',
              '업계에서 어떻게 알려지고 싶은가?'
            ],
            ifDifficult: '롤모델이 되는 선배나 업계 리더를 떠올려보세요.',
            ifStillDifficult: '"훌륭한 전문가"보다 "고객 데이터 분석과 행동 예측 모델링 전문가로", "마케팅 ROI 최적화 전략가로", "팀원들이 가장 먼저 찾는 데이터 분석 멘토로" 같이 구체적인 전문가상을 그려보세요.'
          },
          placeholder: '예: 5년 후에는 고객 데이터 분석과 행동 예측 모델링 분야의 전문가로 성장하여, 데이터 기반 마케팅 전략 수립에서 업계 내 인정받는 전문가가 되고 싶습니다. "데이터로 고객을 이해하고 비즈니스 성과를 만드는 전략가"로 알려지고 싶습니다.',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 조직 내에서 어떤 영향력을 발휘하고 싶은가?',
          hint: '조직과 동료들에게 미치는 긍정적 영향',
          guide: {
            description: '답변 가이드: 조직과 동료들에게 미치는 긍정적 영향',
            diagnosis: '즉석자가진단: "어떻게 영향을 미칠 건가요?"에 답변 가능한가?',
            helpQuestions: [
              '팀/부서에 어떤 변화를 가져오고 싶은가?',
              '후배들에게 어떤 멘토가 되고 싶은가?',
              '조직 문화에 어떻게 기여하고 싶은가?'
            ],
            ifDifficult: '업무 프로세스 개선, 팀 역량 강화, 조직 문화 발전 측면에서 생각해보세요.',
            ifStillDifficult: '"좋은 영향을 주겠다"보다 "데이터 기반 의사결정 문화를 확산시키고", "주니어들이 성장할 수 있는 학습 환경을 조성하며", "팀 간 협업 프로세스를 개선하여 전사 효율성을 높이는" 같이 구체적으로 작성하세요.'
          },
          placeholder: '예: 5년 후에는 데이터 기반 의사결정 문화를 팀 전체에 확산시키고, 주니어 멤버들이 빠르게 성장할 수 있도록 체계적인 교육 프로그램을 만들어 운영하며, 마케팅팀과 데이터팀 간의 협업 프로세스를 개선하여 전사 마케팅 효율성을 높이는 데 기여하고 싶습니다.',
          rows: 3
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 개인 브랜드와 전문성 구축 계획은?',
          hint: '업계 내 인지도와 네트워킹',
          guide: {
            description: '답변 가이드: 업계 내 인지도와 네트워킹 계획',
            diagnosis: '즉석자가진단: "어떻게 알려질 건가요?"에 답변 가능한가?',
            helpQuestions: [
              '어떤 채널로 전문성을 드러낼 것인가?',
              '어떤 활동으로 네트워킹할 것인가?',
              '업계에 어떻게 기여할 것인가?'
            ],
            ifDifficult: '블로그/SNS 운영, 컨퍼런스 발표, 외부 강의, 논문/칼럼 기고 등을 고려해보세요.',
            ifStillDifficult: '"유명해지고 싶다"보다 "분기마다 블로그에 실무 인사이트를 공유하고", "연 1회 이상 데이터 마케팅 컨퍼런스에서 발표하며", "업계 스터디 그룹을 운영하여 지식을 나누는" 같이 구체적으로 작성하세요.'
          },
          placeholder: '예: 개인 블로그를 통해 분기마다 실무에서 얻은 데이터 분석 인사이트를 공유하고, 연 1-2회 마케팅/데이터 컨퍼런스에서 사례 발표를 진행하며, LinkedIn을 통해 업계 전문가들과 지속적으로 교류하고, 사내외 데이터 마케팅 스터디를 운영하여 지식을 나누겠습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 회사 기여 및 가치 창출',
      subtitle: '회사와 함께 성장하는 비전',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 회사에 어떤 가치를 창출하고 싶은가?',
          hint: '측정 가능한 구체적 가치와 기여',
          guide: {
            description: '답변 가이드: 측정 가능한 구체적 가치와 기여',
            diagnosis: '즉석자가진단: "그게 얼마나 가치 있나요?"에 답변 가능한가?',
            helpQuestions: [
              '회사 매출/이익에 어떻게 기여할 것인가?',
              '업무 효율성을 어떻게 높일 것인가?',
              '회사의 경쟁력을 어떻게 강화할 것인가?'
            ],
            ifDifficult: '매출 증대, 비용 절감, 프로세스 개선, 신규 사업 기회 발굴 등 측면에서 생각해보세요.',
            ifStillDifficult: '"회사 발전에 기여하겠다"보다 "데이터 기반 마케팅으로 연간 매출 10% 증대에 기여하고", "업무 자동화로 팀 생산성 30% 향상시키며", "신규 고객 세그먼트 발굴로 시장 확대에 기여하는" 같이 구체적으로 작성하세요.'
          },
          placeholder: '예: 데이터 기반 마케팅 전략을 통해 캠페인 ROI를 지속적으로 개선하여 연간 마케팅 효율 20% 향상에 기여하고, 고객 행동 예측 모델을 구축하여 신규 비즈니스 기회를 발굴하며, 데이터 분석 방법론을 확립하여 전사 의사결정 품질을 높이는 가치를 창출하고 싶습니다.',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 회사 성장에 어떻게 기여하고 싶은가?',
          hint: '회사의 성장 방향과 연계',
          guide: {
            description: '답변 가이드: 회사의 성장 방향과 연계한 기여',
            diagnosis: '즉석자가진단: "회사 비전과 맞나요?"에 답변 가능한가?',
            helpQuestions: [
              '회사의 주요 성장 전략은?',
              '그 전략에서 내 역할은?',
              '어떤 성과로 기여를 증명할 것인가?'
            ],
            ifDifficult: '회사 홈페이지에서 중장기 비전과 전략을 확인하세요.',
            ifStillDifficult: '"회사와 함께 성장하겠다"보다 "회사의 글로벌 확장 전략에 맞춰 해외 시장 고객 데이터 분석 전문성을 키우고", "신규 사업 영역 진출 시 데이터 기반 시장 분석으로 지원하며", "AI 기반 마케팅 자동화로 회사의 디지털 전환에 기여하는" 같이 구체적으로 작성하세요.'
          },
          placeholder: '예: 회사가 추진하는 글로벌 시장 확장에 발맞춰 해외 고객 데이터 분석 역량을 강화하고, 신규 사업 영역 진출 시 데이터 기반 시장 분석과 고객 니즈 파악으로 의사결정을 지원하며, AI/ML 기술을 활용한 마케팅 자동화를 선도하여 회사의 디지털 전환과 경쟁력 강화에 기여하고 싶습니다.',
          rows: 3
        },
        {
          id: 'q1_6_3',
          label: 'Q1.6.3. 회사와 함께 성장하는 모습은?',
          hint: '장기적 파트너십 의지 표현',
          guide: {
            description: '답변 가이드: 장기적 파트너십 의지 표현',
            diagnosis: '즉석자가진단: "진심인가요?"에 답변 가능한가?',
            helpQuestions: [
              '회사 성장에 어떻게 기여하고 싶나요?',
              '회사 발전과 개인 성장의 시너지는?',
              '10년 후에도 함께하고 있을까요?'
            ],
            ifDifficult: '회사 신사업에 핵심 인력으로 참여, 조직 문화 발전에 기여, 차세대 리더로 성장하여 지속 기여 같은 장기적 관점의 상호 성장을 그려보세요.',
            ifStillDifficult: '"오래 일하겠다"보다 "회사의 신규 시장 진출 시 핵심 멤버로 참여하고", "조직 문화 개선 TF 활동으로 기여하며", "사내 교육 프로그램을 개발하여 후배 양성에 기여하는" 같이 구체적인 동반 성장 모습을 제시하세요.'
          },
          placeholder: '예: 회사가 새로운 시장에 진출할 때 데이터 분석으로 시장 기회를 발굴하고, 신규 사업의 마케팅 전략 수립에 핵심 역할을 수행하며, 궁극적으로는 회사의 지속 가능한 성장을 이끄는 차세대 리더로 성장하여 조직과 함께 발전하고 싶습니다.',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. Q1.1.1(핵심 업무 3가지)에서 언급한 각 업무를 더 구체적으로 설명해주세요',
        hint: '실제 업무 프로세스와 협업 방식',
        guide: {
          description: '답변 가이드: 실제 업무 프로세스와 협업 방식을 구체적으로',
          diagnosis: '즉석자가진단: "하루 일과를 설명해보세요"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '업무 시작부터 완료까지의 프로세스는?',
            '어떤 팀/부서와 협업하나요?',
            '주요 산출물은 무엇인가요?'
          ],
          ifDifficult: '채용공고의 상세 업무 내용을 다시 확인하세요.',
          ifStillDifficult: '현직자 인터뷰나 직무 소개 자료를 참고하세요.'
        },
        placeholder: '예: 첫 번째 핵심 업무인 "고객 데이터 분석"은 매주 월요일 주간 목표 설정으로 시작하여, 화-수요일 데이터 수집 및 정제, 목요일 분석 및 인사이트 도출, 금요일 리포트 작성 및 팀 공유의 프로세스로 진행됩니다.',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 이 직무에서 가장 어려운 업무는 무엇이고, 어떻게 준비하고 있나요?',
        hint: '도전적인 업무에 대한 인식과 준비',
        guide: {
          description: '답변 가이드: 도전적인 업무에 대한 인식과 준비 상태',
          diagnosis: '즉석자가진단: "왜 그게 어렵다고 생각하나요?"에 답변 가능한가?',
          helpQuestions: [
            '가장 고난도 업무는?',
            '어떤 역량이 특히 필요한가요?',
            '어떻게 준비 중인가요?'
          ],
          ifDifficult: '선배 직원들의 인터뷰나 후기를 찾아보세요.',
          ifStillDifficult: '직무의 트렌드와 미래 변화를 고려하세요.'
        },
        placeholder: '예: 가장 어려운 부분은 실시간 트렌드를 빠르게 캐치하고 콘텐츠로 만드는 것입니다. 이를 위해 매일 30분씩 트렌드 리포트를 작성하며 감각을 키우고 있습니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. Q1.2.1(보유 역량)을 증명할 구체적 경험은?',
        hint: 'STAR 기법으로 경험 구체화',
        guide: {
          description: '답변 가이드: STAR 기법으로 경험 구체화',
          diagnosis: '즉석자가진단: "그때 정확히 뭘 했어요?"라고 물으면 상세 설명 가능한가?',
          helpQuestions: [
            '언제, 어디서, 무엇을 했나요?',
            '어떤 결과를 만들었나요?',
            '피드백은 어땠나요?'
          ],
          ifDifficult: '가장 자신 있는 프로젝트 하나를 선택하세요.',
          ifStillDifficult: '작은 경험도 구체화하면 의미가 있습니다.'
        },
        placeholder: '예: 2023년 2학기 "디지털 마케팅" 수업에서 실제 스타트업과 협업한 프로젝트에서 데이터 분석을 담당했습니다.',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 부족한 역량을 보완할 구체적 계획은?',
        hint: '시기별 구체적 학습 로드맵',
        guide: {
          description: '답변 가이드: 시기별 구체적 학습 로드맵',
          diagnosis: '즉석자가진단: "다음 달에는 뭘 할 건가요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '어떤 방법으로 학습할 건가요?',
            '예상 소요 시간과 비용은?',
            '진행 상황을 어떻게 측정할 건가요?'
          ],
          ifDifficult: '온라인 강의 플랫폼을 검색해보세요.',
          ifStillDifficult: '매일/주간 단위의 구체적 계획을 세우세요.'
        },
        placeholder: '예: 코세라에서 "Google Data Analytics" 과정을 3개월간 수강하고, 매주 토요일 SQL 스터디에 참여할 계획입니다.',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. Q1.3.1(1년 목표)의 첫 100일 계획은 무엇인가요?',
        hint: '30일 단위 구체적 목표',
        guide: {
          description: '답변 가이드: 30일 단위 구체적 목표',
          diagnosis: '즉석자가진단: "30일째에는 뭘 할 수 있을까요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '첫 달에는 무엇을?',
            '둘째 달에는?',
            '100일째 달성하고 싶은 것은?'
          ],
          ifDifficult: '일반적인 신입사원 온보딩을 참고하세요.',
          ifStillDifficult: '첫 주, 첫 달, 100일 단위로 나누어 계획하세요.'
        },
        placeholder: '예: 첫 30일은 팀 업무 프로세스와 사용 도구를 완벽히 익히고, 60일째에는 선배 지도 하에 실제 프로젝트에 참여하며, 100일째에는 작은 규모의 캠페인 하나를 독립적으로 운영할 수 있는 수준에 도달하는 것이 목표입니다.',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 1년차 목표 달성을 위한 멘토링/교육 계획은?',
        hint: '누구에게 무엇을 배울 것인가',
        guide: {
          description: '답변 가이드: 구체적인 멘토링/교육 계획',
          diagnosis: '즉석자가진단: "누구한테 도움받을 건가요?"에 답변 가능한가?',
          helpQuestions: [
            '사내 멘토링 프로그램은?',
            '선배들에게 배우고 싶은 것은?',
            '외부 교육이나 세미나 참여 계획은?'
          ],
          ifDifficult: '회사의 교육 프로그램을 조사해보세요.',
          ifStillDifficult: '주간/월간 단위로 학습 계획을 세우세요.'
        },
        placeholder: '예: 매주 금요일 팀장님과 1:1 미팅을 통해 주간 업무 피드백을 받고, 월 1회 타팀 선배와의 커피챗으로 다양한 관점을 배우며, 분기별 사내 데이터 분석 교육에 참여하겠습니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. Q1.4.1(3-5년 전문성)을 달성한 롤모델이 있나요?',
        hint: '구체적 롤모델과 배울 점',
        guide: {
          description: '답변 가이드: 구체적 롤모델과 배울 점',
          diagnosis: '즉석자가진단: "그 사람처럼 되려면 뭘 해야 하나요?"에 답변 가능한가?',
          helpQuestions: [
            '누구를 롤모델로 삼고 있나요?',
            '그분의 어떤 점을 배우고 싶나요?',
            '어떤 경로로 성장하셨나요?'
          ],
          ifDifficult: '회사 내부나 업계의 선배를 찾아보세요.',
          ifStillDifficult: 'LinkedIn이나 업계 미디어에서 영감을 얻으세요.'
        },
        placeholder: '예: 현재 회사의 ○○○ 팀장님을 롤모델로 삼고 있습니다. 팀장님은 데이터 분석가로 시작해 5년 만에 마케팅 전략팀 리더가 되셨고, 데이터 기반 의사결정 문화를 확립하신 점이 인상적입니다.',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 중기 목표 달성을 위한 네트워킹 계획은?',
        hint: '업계 내 관계 구축 전략',
        guide: {
          description: '답변 가이드: 업계 내 관계 구축 전략',
          diagnosis: '즉석자가진단: "어떻게 사람들을 만날 건가요?"에 답변 가능한가?',
          helpQuestions: [
            '어떤 모임이나 커뮤니티에 참여할 것인가?',
            '어떤 컨퍼런스나 세미나에 참석할 것인가?',
            '온라인 네트워킹 계획은?'
          ],
          ifDifficult: '업계 주요 행사와 커뮤니티를 조사해보세요.',
          ifStillDifficult: '분기별로 1-2개씩 네트워킹 목표를 세우세요.'
        },
        placeholder: '예: 연 2회 이상 마케팅 컨퍼런스에 참석하고, LinkedIn에서 업계 전문가들과 주간 1회 이상 교류하며, 사내외 데이터 마케팅 스터디를 분기별로 조직하여 네트워크를 확장하겠습니다.',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. Q1.5.1(5년 후 전문가상)을 구체적으로 설명한다면?',
        hint: '하루 일과와 주요 업무',
        guide: {
          description: '답변 가이드: 5년 후의 구체적인 하루',
          diagnosis: '즉석자가진단: "그날 하루를 설명해보세요"에 답변 가능한가?',
          helpQuestions: [
            '아침에 출근해서 뭘 하나요?',
            '주요 회의와 업무는?',
            '어떤 의사결정을 내리나요?'
          ],
          ifDifficult: '롤모델의 하루를 상상해보세요.',
          ifStillDifficult: '시간대별로 나누어 구체적으로 그려보세요.'
        },
        placeholder: '예: 오전에는 팀 데이터 리뷰 회의를 주도하고, 오후에는 신규 캠페인 전략을 수립하며, 주니어 멤버 2명과 1:1 멘토링을 진행하고, 저녁에는 업계 최신 트렌드를 학습하는 일과를 상상합니다.',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 개인 브랜드 구축을 위한 콘텐츠 계획은?',
        hint: '지속적인 콘텐츠 생산 전략',
        guide: {
          description: '답변 가이드: 지속적인 콘텐츠 생산 전략',
          diagnosis: '즉석자가진단: "첫 콘텐츠는 뭘 만들 건가요?"에 답변 가능한가?',
          helpQuestions: [
            '어떤 주제로 콘텐츠를 만들 것인가?',
            '어떤 채널을 활용할 것인가?',
            '얼마나 자주 발행할 것인가?'
          ],
          ifDifficult: '관심 있는 주제 3가지부터 선정하세요.',
          ifStillDifficult: '월 1-2회 블로그 포스팅부터 시작하세요.'
        },
        placeholder: '예: 월 2회 블로그에 "데이터로 읽는 마케팅 인사이트" 시리즈를 연재하고, LinkedIn에 주간 1회 업계 트렌드 분석을 공유하며, 분기별로 Medium에 심화 케이스 스터디를 발행하겠습니다.',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. Q1.6.1(가치 창출)을 위한 혁신 아이디어는?',
        hint: '업무 개선이나 새로운 시도',
        guide: {
          description: '답변 가이드: 구체적인 혁신 아이디어',
          diagnosis: '즉석자가진단: "그게 실현 가능한가요?"에 답변 가능한가?',
          helpQuestions: [
            '현재 프로세스의 문제점은?',
            '어떤 개선안을 제시할 것인가?',
            '예상되는 효과는?'
          ],
          ifDifficult: '작은 개선부터 시작하세요.',
          ifStillDifficult: '다른 회사의 모범 사례를 참고하세요.'
        },
        placeholder: '예: 현재 수작업으로 진행되는 주간 리포트 작성을 Python 자동화로 개선하여 팀 업무 시간을 주당 5시간 절약하고, 이를 전사 차원으로 확대하여 생산성을 향상시키겠습니다.',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 회사와 함께 성장하기 위한 장기 학습 계획은?',
        hint: '5년 이상의 지속적 성장 계획',
        guide: {
          description: '답변 가이드: 5년 이상의 지속적 성장 계획',
          diagnosis: '즉석자가진단: "10년 후에는요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '지속적으로 배울 분야는?',
            '장기 자격증이나 학위 계획은?',
            '글로벌 역량은 어떻게 키울 것인가?'
          ],
          ifDifficult: '연차별로 1-2개씩 목표를 세우세요.',
          ifStillDifficult: '회사의 미래 사업 방향을 고려하세요.'
        },
        placeholder: '예: 입사 후 5년간 데이터 분석 석사 학위를 취득하고, AI/ML 관련 전문 자격증 3개 이상을 취득하며, 영어 비즈니스 커뮤니케이션 능력을 OPIc AL 수준으로 향상시켜 글로벌 프로젝트에 참여할 수 있도록 준비하겠습니다.',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 직무 이해에서 역량 진단으로',
      hint: 'STEP 1의 필요 역량이 STEP 2의 보유 역량과 어떻게 연결되나요?',
      placeholder: '예: 앞서 파악한 핵심 역량들을 기준으로 현재 저의 역량 수준을 진단한 결과...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_2', 'q1_1_3', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 역량 진단에서 단기 목표로',
      hint: 'STEP 2의 부족한 역량을 STEP 3에서 어떻게 보완할 것인가요?',
      placeholder: '예: 진단한 부족한 역량들을 보완하기 위해 입사 후 1년간 다음과 같은 목표를 설정했습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_2', 'q1_2_3', 'q1_3_1']
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 단기 목표에서 중기 목표로',
      hint: 'STEP 3의 1년차 목표가 STEP 4의 3-5년 목표로 어떻게 발전하나요?',
      placeholder: '예: 1년차에 쌓은 기초 위에 3-5년차에는 다음과 같은 전문성을 갖춘 인재로 성장하겠습니다...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_3_3', 'q1_4_1']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 중기 목표에서 장기 비전으로',
      hint: 'STEP 4의 중기 전문성이 STEP 5의 장기 비전으로 어떻게 확장되나요?',
      placeholder: '예: 3-5년차에 쌓은 전문성을 바탕으로 5년 후에는 다음과 같은 전문가로 성장하겠습니다...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_3', 'q1_5_1']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 개인 성장에서 회사 기여로',
      hint: 'STEP 5의 개인 성장이 STEP 6의 회사 기여로 어떻게 이어지나요?',
      placeholder: '예: 이러한 저의 성장은 단순히 개인의 발전이 아닌, 회사의 성장에 실질적으로 기여하는 과정이 될 것입니다...',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_1', 'q1_5_2', 'q1_6_1']
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleStepSelection = (stepId) => {
    setSelectedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('evaluation');
      }
    } else if (currentPhase === 'evaluation') {
      const sortedSteps = [...selectedSteps].sort((a, b) => a - b);
      setSelectedSteps(sortedSteps);
      setCurrentPhase('round2');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('round3');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setFinalText(generateAspirationLetter());
        setCurrentPhase('completed');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'round1' && currentStep === 0) {
      setShowIntro(true);
    }
  };

  const generateAspirationLetter = () => {
    const parts = [];
    
    if (answers.q1_1_1) parts.push(answers.q1_1_1);
    if (answers.q1_1_2) parts.push(answers.q1_1_2);
    if (answers.q1_1_3) parts.push('\n' + answers.q1_1_3);
    if (answers.connect_1_2) parts.push('\n' + answers.connect_1_2);
    if (answers.q1_2_1) parts.push('\n' + answers.q1_2_1);
    if (answers.q1_2_2) parts.push(answers.q1_2_2);
    if (answers.q1_2_3) parts.push(answers.q1_2_3);
    if (answers.connect_2_3) parts.push('\n' + answers.connect_2_3);
    if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
    if (answers.q1_3_2) parts.push(answers.q1_3_2);
    if (answers.connect_3_4) parts.push('\n' + answers.connect_3_4);
    if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1);
    if (answers.q1_4_2) parts.push(answers.q1_4_2);
    if (answers.connect_4_5) parts.push('\n' + answers.connect_4_5);
    if (answers.q1_5_1) parts.push('\n' + answers.q1_5_1);
    if (answers.q1_5_2) parts.push(answers.q1_5_2);
    if (answers.connect_5_6) parts.push('\n' + answers.connect_5_6);
    if (answers.q1_6_1) parts.push('\n' + answers.q1_6_1);
    if (answers.q1_6_2) parts.push(answers.q1_6_2);
    if (answers.q1_6_3) parts.push(answers.q1_6_3);
    
    return parts.join('\n\n');
  };

  const downloadFinalText = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>입사후포부</title>
<style>
body { font-family: '맑은 고딕', 'Malgun Gothic', sans-serif; line-height: 1.8; padding: 40px; }
p { margin-bottom: 1em; }
</style>
</head>
<body>
${finalText.split('\n\n').map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('\n')}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_입사후포부.doc`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getRawAnswersText = () => {
    return `📋 원본 답변 모음\n\n[기본 정보]\n직무: ${basicInfo.job || '-'}\n회사: ${basicInfo.company || '-'}\n\n[STEP 1: 직무 이해]\nQ1.1.1: ${answers.q1_1_1 || '-'}\nQ1.1.2: ${answers.q1_1_2 || '-'}\nQ1.1.3: ${answers.q1_1_3 || '-'}\n\n[STEP 2: 역량 진단]\nQ1.2.1: ${answers.q1_2_1 || '-'}\nQ1.2.2: ${answers.q1_2_2 || '-'}\nQ1.2.3: ${answers.q1_2_3 || '-'}\n\n[STEP 3: 단기 목표]\nQ1.3.1: ${answers.q1_3_1 || '-'}\nQ1.3.2: ${answers.q1_3_2 || '-'}\nQ1.3.3: ${answers.q1_3_3 || '-'}\n\n[STEP 4: 중기 목표]\nQ1.4.1: ${answers.q1_4_1 || '-'}\nQ1.4.2: ${answers.q1_4_2 || '-'}\nQ1.4.3: ${answers.q1_4_3 || '-'}\n\n[STEP 5: 장기 비전]\nQ1.5.1: ${answers.q1_5_1 || '-'}\nQ1.5.2: ${answers.q1_5_2 || '-'}\nQ1.5.3: ${answers.q1_5_3 || '-'}\n\n[STEP 6: 회사 기여]\nQ1.6.1: ${answers.q1_6_1 || '-'}\nQ1.6.2: ${answers.q1_6_2 || '-'}\nQ1.6.3: ${answers.q1_6_3 || '-'}\n\n[3라운드 연결]\n1→2: ${answers.connect_1_2 || '-'}\n2→3: ${answers.connect_2_3 || '-'}\n3→4: ${answers.connect_3_4 || '-'}\n4→5: ${answers.connect_4_5 || '-'}\n5→6: ${answers.connect_5_6 || '-'}`;
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') {
      return selectedSteps.length >= 1;
    }
    if (currentStep === 0 && currentPhase === 'round1') {
      return basicInfo.job && basicInfo.company;
    }
    return true;
  };

  const progress = currentPhase === 'round1'
    ? ((currentStep + 1) / round1Steps.length) * 33
    : currentPhase === 'round2'
    ? 33 + ((currentStep + 1) / selectedSteps.length) * 33
    : 66 + ((currentStep + 1) / round3Questions.length) * 34;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">비공개 페이지</h1>
            <p className="text-gray-600">CareerEngineer의 입사후포부 작성 워크북</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호를 입력하세요</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="비밀번호 입력"
                autoFocus
              />
            </div>
            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                비밀번호가 올바르지 않습니다.
              </div>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              접속하기
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              질문에 답하며 완성하는<br />입사후포부 워크북
            </h1>
            <p className="text-center text-gray-600 mb-8">CareerEngineer의 3라운드 체계적 작성 시스템</p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3라운드 작성 시스템</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 기본 입사후포부 수립</h3>
                  <p className="text-sm text-gray-700">6개 STEP 핵심 질문에 답변 (전체 구조 파악)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 보강</h3>
                  <p className="text-sm text-gray-700">부족한 STEP 선택 → 심화 질문으로 구체화 (1개 이상)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">STEP 간 연결 질문으로 자연스러운 흐름 만들기</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>진정성:</strong> 3초 자가진단 통과한 내용만</li>
                <li><strong>구체성:</strong> 숫자와 사실로 표현</li>
                <li><strong>현실성:</strong> 달성 가능한 목표 설정</li>
                <li><strong>연결성:</strong> 단계 간 논리적 흐름</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">💡 3초 자가진단이란?</p>
                <p className="text-sm text-gray-700">
                  누군가 "정말이에요?"라고 물었을 때 <strong>3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지</strong> 확인하는 것입니다.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던 내용은 사라집니다. 내용 작성 후 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드 하여 작성한 내용을 보관하세요
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">
                  © 2025 CareerEngineer All Rights Reserved.
                </p>
                <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                  이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold text-lg"
            >
              1라운드 시작하기 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'evaluation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              1라운드 완료! 🎉
            </h2>
            <p className="text-center text-gray-600 mb-8">
              부족하다고 느끼는 STEP을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>

            <div className="space-y-4 mb-8">
              {round1Steps.slice(1).map(step => {
                const stepId = step.id;
                const isSelected = selectedSteps.includes(stepId);
                
                return (
                  <div 
                    key={stepId}
                    className={`border-2 rounded-lg p-5 transition-all ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                          <strong>내 답변:</strong> {answers[step.questions[0].id]?.substring(0, 100) || '(답변 없음)'}
                          {answers[step.questions[0].id]?.length > 100 && '...'}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStepSelection(stepId)}
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isSelected 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isSelected ? '✓ 선택됨' : '심화 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💡 선택 기준:</strong> 답변이 부족하거나 더 구체화가 필요한 STEP을 자유롭게 선택하세요. (1개 이상)
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                2라운드 시작하기 ({selectedSteps.length}개 선택됨)
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                입사후포부 완성! 🎉
              </h2>
              <p className="text-gray-600">
                아래 내용을 확인하고 자유롭게 수정하세요
              </p>
            </div>

            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">
                    반드시 다운로드하세요!
                  </p>
                  <p className="text-sm text-red-800 leading-relaxed">
                    지금까지 작성한 모든 내용은 브라우저에만 임시 저장되어 있습니다. 
                    페이지를 새로고침하거나 닫으면 <strong>모든 내용이 즉시 삭제</strong>됩니다.
                    <br />
                    <strong>내용 수정 후 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  완성된 입사후포부 (수정 가능)
                </h3>
                <button
                  onClick={() => setShowRawAnswers(!showRawAnswers)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  {showRawAnswers ? '원본 답변 숨기기' : '원본 답변 보기'}
                </button>
              </div>
              
              <textarea
                value={finalText}
                onChange={(e) => setFinalText(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-serif leading-relaxed"
              />
            </div>

            {showRawAnswers && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">📋 원본 답변 참고</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {getRawAnswersText()}
                </pre>
              </div>
            )}

            <button
              onClick={downloadFinalText}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg mb-4"
            >
              <Download className="w-6 h-6" />
              워드 파일로 다운로드 (.doc)
            </button>

            {downloadSuccess && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4">
                <p className="text-green-800 font-semibold">
                  ✅ 다운로드 완료!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_입사후포부.doc" 파일을 Microsoft Word로 열어주세요.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전으로
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-800 text-center">
                © 2025 CareerEngineer All Rights Reserved.
              </p>
              <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = currentPhase === 'round1' 
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { 
        title: `${round1Steps[selectedSteps[currentStep]].title} - 심화`,
        questions: round2Questions[selectedSteps[currentStep]]
      }
    : {
        title: '3라운드: 연결 및 완성',
        questions: [round3Questions[currentStep]]
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CareerEngineer 입사후포부 작성 워크북
          </h1>
          <p className="text-gray-600">
            체계적인 3라운드 시스템으로 완성하는 입사후포부
          </p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드'} - {currentStepData.title}
              </span>
              <span>전체 진행률: {Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: progress + '%' }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.subtitle && (
            <p className="text-gray-600 mb-6">{currentStepData.subtitle}</p>
          )}

          {currentStep === 0 && currentPhase === 'round1' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 직무
                </label>
                <input
                  type="text"
                  value={basicInfo.job}
                  onChange={(e) => handleBasicInfoChange('job', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 데이터 분석가, 마케터, 기획자 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 회사명
                </label>
                <input
                  type="text"
                  value={basicInfo.company}
                  onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자, 네이버, 카카오 등"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentStepData.questions.map((q) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">
                      {q.label}
                    </label>
                    {q.guide && (
                      <button
                        onClick={() => toggleGuide(q.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <HelpCircle className="w-4 h-4" />
                        {showGuide[q.id] ? '가이드 숨기기' : '가이드 보기'}
                      </button>
                    )}
                  </div>
                  
                  {q.hint && (
                    <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>
                  )}
                  
                  {q.referenceQuestions && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-3">
                      <p className="text-sm font-semibold text-indigo-900 mb-2">📚 참고: 이전 답변</p>
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const refQuestion = [...round1Steps.flatMap(s => s.questions || [])].find(q => q?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          return (
                            <div key={refId} className="bg-white p-3 rounded text-sm">
                              <p className="font-semibold text-gray-700 mb-1">{refQuestion.label}</p>
                              <p className="text-gray-600 italic">{answers[refId]?.substring(0, 150)}{answers[refId]?.length > 150 ? '...' : ''}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                      </div>
                      
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq, i) => (
                              <li key={i}>• {hq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {q.guide.ifDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💭 답변하기 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>
                        </div>
                      )}
                      
                      {q.guide.ifStillDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💡 구체화 도움 질문으로도 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifStillDifficult}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    rows={q.rows || 3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={q.placeholder}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={goToPrevStep}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              이전
            </button>
            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerAspirationWorkbook;