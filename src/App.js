import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, HelpCircle, Eye, Edit3 } from 'lucide-react';

const CareerAspirationWorkbook = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');

  const [basicInfo, setBasicInfo] = useState({
    industry: '',
    job: '',
    company: ''
  });

  const [answers, setAnswers] = useState({});

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 직무와 회사를 입력하세요' },
    {
      id: 1,
      title: 'Q1: 이 직무에서 진짜 중요한 것',
      subtitle: 'JD 키워드 직접 인용 · 핵심 업무의 본질 · 연계 팀 파악',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1-1. 이 직무의 핵심 업무 3가지와 그 본질은 무엇인가요?',
          hint: '채용공고(JD)에 나온 키워드를 직접 인용하세요 — 단순 나열이 아닌 "왜 이 업무가 중요한가"까지',
          guide: {
            description: '[핵심 포인트] JD의 "주요업무" 항목에 나온 단어를 그대로 가져오되, 그 업무의 본질이 무엇인지까지 써야 합니다. "보고서 작성"이 아닌 "데이터를 근거로 의사결정을 지원하는 것"처럼요.',
            diagnosis: '즉석자가진단: 각 업무 뒤에 "이 업무를 왜 하나요?"라고 물었을 때 3초 안에 즉답 가능한가?',
            helpQuestions: [
              'JD의 주요업무 중 가장 많은 비중을 차지할 것 같은 업무는?',
              '이 직무가 없으면 조직에서 어떤 문제가 생기나요?',
              '이 직무의 최종 산출물(output)은 무엇인가요?'
            ],
            ifDifficult: '지금 바로 JD를 열어두고 작성하세요. "주요업무" 항목의 첫 3개를 기준으로 시작하세요.',
            ifStillDifficult: '현직자 인터뷰 영상이나 블로그에서 "이 직무의 하루 일과"를 찾아보세요. 반복적으로 언급되는 업무가 핵심입니다.'
          },
          placeholder: '예(생산기술 기준): ① 공정 개선 — 불량률·사이클타임 데이터를 분석하여 생산성을 높이는 것이 본질 ② 설비 관리 — 장비 가동률을 유지하여 생산 계획을 지키는 것 ③ 품질 검증 — 신제품 양산 전 공정 안정성을 확인하여 클레임을 예방하는 것',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1-2. 이 직무에서 성과를 내는 사람들이 공통적으로 갖춘 역량은 무엇인가요?',
          hint: '시니어 채용공고 + 현직자 인터뷰 기반 — 상상이 아닌 리서치의 결과여야 합니다',
          guide: {
            description: '[리서치가 필요한 이유] 이 답변이 Q2 역량 진단의 기준이 됩니다. 내 보유 역량이 충분한지, 무엇이 부족한지를 판단하려면 먼저 "잘하는 사람들이 갖춘 것"을 알아야 합니다.',
            diagnosis: '즉석자가진단: "시니어는 어떤 일을 하고, 그러려면 무엇이 필요한가?"에 구체적으로 답할 수 있는가?',
            helpQuestions: [
              '지원 직무명 + "시니어" 채용공고를 검색해보세요 — 요구 역량 항목에 무엇이 있나요?',
              '현직자 인터뷰에서 "이 일을 잘하려면 뭐가 중요해요?"라는 답변은?',
              '기술적 역량과 소프트 스킬 각각 1~2가지씩 구분해보세요'
            ],
            ifDifficult: '시니어 JD와 신입 JD를 비교하면 추가된 항목이 보입니다. 그것이 성장하면서 쌓아야 할 역량입니다.',
            ifStillDifficult: '지금 당장 시니어 채용공고 하나만 찾아서 "우대사항"을 읽어보세요. 30분이면 충분합니다.'
          },
          placeholder: '예(생산기술 기준): [기술 역량] 공정 분석 능력(SPC·FMEA 활용), 설비 트러블슈팅 역량, 도면·공차 해독 능력 / [소프트 스킬] 데이터 기반 문제해결 사고, 유관부서(품질·설비·개발팀)와의 협업 커뮤니케이션 / [리서치 출처: ○○사 생산기술 시니어 채용공고 + ○○ 현직자 인터뷰]',
          rows: 4
        },
        {
          id: 'q1_1_3',
          label: 'Q1-3. 이 직무가 협업하는 연계 팀/직무는 무엇이고, 그 협업에서 이 직무는 어떤 역할을 하나요?',
          hint: '연계 팀의 직무를 이해하는 것이 업무 범위 확장의 출발점 — JD의 "유관부서" 키워드 확인',
          guide: {
            description: '[중요한 이유] 이 직무를 깊이 아는 사람은 자기 직무만 아는 것이 아니라 연계 팀의 니즈도 압니다. "팀 차원의 기여"를 쓸 때 구체성이 생기는 이유입니다. 연계 팀을 모르면 "협업하겠습니다"는 공허한 말이 됩니다.',
            diagnosis: '즉석자가진단: "품질팀(또는 연계팀)이 이 직무에 원하는 것이 무엇인가요?"에 답할 수 있는가?',
            helpQuestions: [
              '이 직무의 산출물을 누가 받아서 사용하나요?',
              '이 직무가 없으면 어떤 팀이 가장 먼저 타격을 받나요?',
              'JD의 "협업", "유관부서", "공유" 관련 내용을 확인해보세요'
            ],
            ifDifficult: 'JD에서 "협업", "유관부서", "공유" 등의 키워드를 찾아보세요. 어떤 팀과 무엇을 주고받는지가 드러납니다.',
            ifStillDifficult: '현직자 인터뷰에서 "하루 중 가장 많이 소통하는 팀이 어딘가요?"라는 답변을 찾아보세요.'
          },
          placeholder: '예(생산기술 기준): [연계팀] ① 품질팀 — 불량 분석 데이터 공유, 공정 개선 결과 검증 협의 ② 설비팀 — 설비 이상 발생 시 원인 공동 분석 ③ 개발팀 — 신제품 시생산(MP) 단계에서 공정 적합성 검토 / [이 직무의 역할] 각 팀의 요구사항을 공정 데이터로 연결하고, 현장과 사무실 사이의 기술적 다리 역할',
          rows: 4
        }
      ]
    },
    {
      id: 2,
      title: 'Q2: 지금 나는 어디에 있는가',
      subtitle: '보유 역량 · 부족한 역량 · 이미 시작한 노력 — 솔직하고 구체적인 자기 평가',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q2-1. 이 직무에서 즉시 활용 가능한 보유 역량은 무엇인가요?',
          hint: '증거(프로젝트·자격증·경험)가 있는 역량만 쓰세요 — Q1-2의 "성과자 역량"을 기준으로 점검',
          guide: {
            description: '[기준] Q1-2에서 파악한 "성과를 내는 사람들의 역량"을 기준으로 내가 이미 갖춘 것을 점검합니다. "잘한다"가 아니라 "이 경험으로 증명할 수 있다"는 역량만 쓰세요.',
            diagnosis: '즉석자가진단: "그 역량을 증명할 수 있는 경험이 하나 있나요?"라는 질문에 3초 안에 즉답 가능한가?',
            helpQuestions: [
              '지금 당장 이 직무 업무를 도울 수 있는 것은 무엇인가요?',
              '어떤 수준인가요? (기초/중급/활용 가능 등)',
              '그 역량을 확인할 수 있는 경험이나 결과물이 있나요?'
            ],
            ifDifficult: '학교 수업, 프로젝트, 동아리, 자격증, 개인 공부 모두 포함합니다. 작아도 괜찮습니다.',
            ifStillDifficult: '"수업에서 ○○을 했고", "프로젝트에서 ○○을 담당해서", "자격증 ○○으로 기초를 갖췄다"처럼 경험과 연결해서 쓰세요.'
          },
          placeholder: '예(생산기술 기준): ① 도면 해독 — 캡스톤 프로젝트에서 3D 도면 작성 경험, GD&T 기초 수준 ② 데이터 분석 — Excel 피벗테이블 활용 가능, 통계 기초 수업 이수 ③ 공정 이해 — 생산관리 수업 A+, 스마트팩토리 견학 2회 / 즉시 활용 가능 여부: ①②는 보조 역할로 기여 가능, ③은 이해 수준',
          rows: 4
        },
        {
          id: 'q1_2_2',
          label: 'Q2-2. Q1에서 파악한 필요 역량 중 부족한 것은 무엇인가요?',
          hint: '솔직하게 — 부족한 정도(미경험/이론 수준/기초)까지 구체적으로 명시',
          guide: {
            description: '[핵심] 부족한 역량을 솔직하게 인정하는 것이 오히려 신뢰를 만듭니다. 어느 정도 수준인지까지 구체적으로 써야 Q3에서 준비 계획을 세울 수 있습니다.',
            diagnosis: '즉석자가진단: "그 역량을 지금 당장 업무에 적용할 수 있나요?"에 솔직하게 답할 수 있는가?',
            helpQuestions: [
              'Q1-2에서 쓴 "성과자 역량" 목록을 다시 보세요 — 내가 없는 것은?',
              '신입에게 요구되는 것 중 아직 갖추지 못한 것은?',
              '"당장 업무에 쓰면 팀에 민폐가 될 것 같다"는 역량이 있나요?'
            ],
            ifDifficult: '부족한 역량이 없다면 JD를 다시 읽어보세요. 경험 없이 갖출 수 있는 역량은 거의 없습니다.',
            ifStillDifficult: '"이 역량이 필요한 상황을 맞닥뜨리면 어떻게 될까?"라고 상상해보세요. 버벅거릴 것 같은 것이 부족한 역량입니다.'
          },
          placeholder: '예(생산기술 기준): ① 설비 트러블슈팅 — 미경험, 실제 장비를 다뤄본 적 없음 ② FMEA 작성 — 개념은 알지만 실제로 작성해본 경험 없음 ③ SPC 데이터 해석 — 이론은 배웠지만 실무 데이터로 활용해본 적 없음 / 수준 평가: ①은 완전 미경험, ②③은 이론 수준',
          rows: 3
        },
        {
          id: 'q1_2_3',
          label: 'Q2-3. 이미 시작한 역량 개발 노력이 있나요?',
          hint: '"앞으로 하겠다"가 아닌 "이미 하고 있다" — 현재 진행 중인 것만, 아직 없다면 솔직하게',
          guide: {
            description: '[지원동기와 다른 점] 지원동기의 역량 준비는 "왜 이 역량을 준비했는가"의 목적을 설명합니다. 여기서는 이미 시작한 것의 진행 상황을 있는 그대로 기술하면 됩니다. 아직 시작하지 않은 것은 Q3에서 계획으로 씁니다.',
            diagnosis: '즉석자가진단: "지금 당장 증명할 수 있는 학습 활동이 있나요?"에 즉답 가능한가?',
            helpQuestions: [
              '최근 3개월 내에 시작한 학습 활동은?',
              '강의 수강, 자격증 준비, 개인 프로젝트, 스터디 참여 등',
              '아직 아무것도 시작하지 않았다면 솔직하게 "준비 시작 전"이라고 쓰세요'
            ],
            ifDifficult: '작은 것이라도 괜찮습니다. 유튜브 강의 1개를 봤어도 "시청 중"이라고 쓰세요.',
            ifStillDifficult: '아무것도 없다면 솔직하게 인정하고, 그 에너지를 Q3 준비 계획을 세우는 데 쓰세요.'
          },
          placeholder: '예: ① FMEA — 관련 교재 구매 후 1~3장 학습 완료 (현재 진행 중) ② SPC — 코세라 "통계적 공정 관리" 강의 수강 중 (40% 완료) ③ 현장 감각 — 학교 실습실에서 CNC 기초 조작 경험 (올해 3월 완료)',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'Q3: 무엇을 어떻게 준비하고 어떻게 확장할 것인가',
      subtitle: '역량 확보 계획 (방법+시기+측정기준) · 단기 범위 확장 서사',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q3-1. 부족한 역량별로 구체적인 확보 방법과 시기를 작성하세요.',
          hint: '"열심히 하겠습니다"는 계획이 아닙니다 — 역량마다 방법+시기+측정기준이 하나의 세트',
          guide: {
            description: '[가장 중요한 질문] "○○ 역량이 부족하기 때문에 ○○ 방법으로 ○개월 안에 준비하겠다"는 구조가 되어야 합니다. JD에 나온 키워드를 직접 연결해서 쓰세요. "열심히 배우겠다"는 이 질문의 답이 아닙니다.',
            diagnosis: '즉석자가진단: "다음 달에는 어떤 것을 할 건가요?"에 즉답 가능한가?',
            helpQuestions: [
              'Q2-2에서 쓴 부족한 역량 목록을 가져오세요',
              '각 역량을 어떤 방법으로 채울 수 있나요? (강의·자격증·OJT·멘토링·프로젝트)',
              '입사 전에 할 것 vs 입사 후에 채울 것을 구분하세요'
            ],
            ifDifficult: '역량 한 개씩만 집중해서 쓰세요. "FMEA → ○○ 교재 완독 (2개월) → 실무 워크시트 작성 가능 수준"처럼요.',
            ifStillDifficult: '"역량명 / 현재 수준 / 준비 방법 / 완료 시기 / 확인 방법" 다섯 칸을 채운다고 생각하고 써보세요.'
          },
          placeholder: '예(생산기술 기준):\n[FMEA 작성 역량] 현재: 개념만 앎 → 방법: ○○ 교재 완독 + 가상 공정 시뮬레이션 3회 → 시기: 입사 전 2개월 → 확인: 스스로 FMEA 양식 작성 가능 여부\n[SPC 실무 해석] 현재: 이론 수준 → 방법: 공개 데이터셋으로 관리도 직접 작성 → 시기: 입사 후 3개월 → 확인: 이상 원인 분류 가능 수준\n[설비 트러블슈팅] 현재: 미경험 → 방법: 입사 후 OJT + 선배 동행 → 시기: 6개월 → 확인: 일상 점검 독립 수행',
          rows: 6
        },
        {
          id: 'q1_3_2',
          label: 'Q3-2. 역량이 갖춰지면 어떻게 업무 범위를 확장해나갈 것인가요?',
          hint: '개인 숙달 → 파트 기여 → 팀 기여 — JD 키워드를 작은 단위에서 큰 단위로 연결',
          guide: {
            description: '[확장의 의미] "더 많은 일을 하겠다"가 아닙니다. 내가 맡은 업무에서 쌓은 데이터·노하우·분석 결과가 파트와 팀 전체에 어떤 가치를 줄 수 있는지입니다. JD 키워드를 그대로 써서 "이 역량을 이 범위에서 이렇게 활용하겠다"는 흐름을 만드세요.',
            diagnosis: '즉석자가진단: "당신의 일이 팀 전체에 어떤 영향을 미치나요?"라고 물으면 구체적으로 답할 수 있는가?',
            helpQuestions: [
              '내 담당 업무의 결과물을 파트의 누가 활용하게 될까요?',
              'Q1-3에서 파악한 연계 팀이 내 업무 결과를 어떻게 활용할 수 있나요?',
              'JD에서 "표준화", "가이드 작성", "교육" 관련 내용이 있었나요?'
            ],
            ifDifficult: 'JD 키워드 하나를 골라 "처음엔 내 담당 업무에서 → 나중엔 팀 전체에서" 흐름만 그려보세요.',
            ifStillDifficult: '"내가 이 업무를 잘 하면, 파트의 어떤 문제가 해결되나요?"를 생각해보세요.'
          },
          placeholder: '예(생산기술 기준): [개인] 담당 공정 1개 불량 원인 데이터 분석 후 개선안 제안 / [파트] 분석 방법론을 파트 표준 양식으로 공유 → 팀원들도 동일하게 적용 가능 / [팀] 품질팀이 원하는 형식으로 불량 데이터 정기 공유 / [연결] JD 키워드 "공정 개선" → 개인 공정 → 파트 내 유사 공정 3개 → 라인 전체로 확장',
          rows: 4
        },
        {
          id: 'q1_3_3',
          label: 'Q3-3. 역량이 갖춰졌다는 것을 어떻게 측정할 것이고, 1년 후 어떤 수준이 될 것인가요?',
          hint: '"잘한다는 느낌"이 아닌 객관적 기준 + "1년 후 독립적으로 수행할 수 있는 업무"',
          guide: {
            description: '[두 가지를 함께] 역량 달성 여부를 확인하는 기준과, 1년 후 "어떤 업무를 수행하는 사람이 되어 있을 것인가"를 함께 씁니다. 면접관이 "1년 후에 어떤 수준이 될 것 같나요?"라고 물었을 때 바로 나오는 답변이어야 합니다.',
            diagnosis: '즉석자가진단: "1년 후 어떤 업무를 독립적으로 수행할 수 있나요?"에 즉답 가능한가?',
            helpQuestions: [
              '이 역량이 필요한 업무를 혼자 수행할 수 있는가?',
              '수치로 표현할 수 있는 것은? (오류율, 소요시간, 처리 건수 등)',
              '3개월 / 6개월 / 1년 후 "할 수 있게 되는 것"을 구분하세요'
            ],
            ifDifficult: '"독립 수행 가능 여부"도 충분한 기준입니다. "선배 없이도 ○○을 완료할 수 있다"처럼요.',
            ifStillDifficult: '"입사 후 1년 경과 후 팀장이 나에게 맡길 수 있는 일은 무엇인가?"를 상상해보세요.'
          },
          placeholder: '예:\n[측정 기준] FMEA: 신규 공정 시나리오를 혼자 작성 후 팀장 리뷰 통과 / 공정 개선: 불량률 데이터 분석 후 개선안 1건 독립 제안 가능\n[1년 후 수행 가능 업무]\n3개월: 공정 표준서 파악 완료 + FMEA 양식 선배 검토 하에 작성\n6개월: 불량 데이터 1차 분석 독립 수행 + 품질팀 협의 참여\n1년: 담당 공정 불량률 감소 과제 독립 제안 + 파트 내 분석 방법론 공유',
          rows: 5
        }
      ]
    },
    {
      id: 4,
      title: 'Q4: 성장하면 어디로 — 다음 단계와 큰 그림',
      subtitle: '다음 역할의 요건·준비 경로 · 조직 기여 · 회사 방향성 연결',
      questions: [
        {
          id: 'q1_q4_1',
          label: 'Q4-1. 이 직무에서 성장하면 구체적으로 어떤 다음 역할이 열리고, 그 단계를 위해 무엇을 준비할 것인가요?',
          hint: '시니어 채용공고 리서치 기반 — 막연한 "전문가"가 아닌 실제 역할 + 진입하기 위한 준비 경로',
          guide: {
            description: '[리서치가 필요한 이유] 이 직무에서 3~5년 경력자가 실제로 하는 일을 알아야 현실적인 목표가 됩니다. 단순히 "성장하겠다"가 아니라, 그 다음 단계에 진입하기 위해 지금부터 어떤 준비를 해야 하는지까지 연결되어야 합니다.',
            diagnosis: '즉석자가진단: "이 직무 4년차는 어떤 일을 하나요? 그 수준이 되려면 지금 무엇을 해야 하나요?"에 즉답 가능한가?',
            helpQuestions: [
              '이 직무 시니어 채용공고의 "주요업무"와 "자격요건"을 읽어보세요',
              '주니어와 시니어의 역할 차이는 무엇인가요?',
              '그 다음 단계로 가기 위해 2~3년차에 어떤 경험이 필요한가요?'
            ],
            ifDifficult: '지금 당장 [직무명 + 시니어 OR 경력] 채용공고를 하나 찾아보세요. 거기 나온 역할이 내 다음 목표입니다.',
            ifStillDifficult: '"신입에게 없고 시니어에게 있는 것"이 바로 다음 단계에서 쌓아야 할 역량입니다.'
          },
          placeholder: '예(생산기술 기준): [다음 역할 — 리서치 결과]\n시니어 JD 기준: ① 공정 라인 전체 관리 책임 ② 신제품 MP 총괄 참여 ③ 원가 절감 과제 프로젝트 리드 ④ 후임 교육 및 표준서 수립 책임\n[그 단계를 위한 준비 경로]\n2년차: 라인 밸런싱 과제 보조 참여 자원 + PLC 기초 외부 교육\n3년차: 원가 절감 과제 1건 독립 기획·실행 경험 쌓기\n자격증: 생산관리기사 입사 후 2년차 내 취득',
          rows: 5
        },
        {
          id: 'q1_q4_2',
          label: 'Q4-2. 팀을 넘어 조직 전체에 어떻게 기여하고 싶으며, 그 기여가 이 회사의 방향성과 어떻게 연결되나요?',
          hint: '장기 큰 그림 + 회사 IR·뉴스룸 리서치 기반 — 리서치 없이는 쓸 수 없는 내용',
          guide: {
            description: '[마지막 설득] 나의 성장 경로가 이 회사의 방향성과 맞닿는 지점을 구체적으로 보여줍니다. "이 회사에서 성장하는 것이 왜 의미 있는가"의 답입니다. 리서치 없이 쓴 일반론은 면접관이 바로 알아챕니다.',
            diagnosis: '즉석자가진단: "다른 회사가 아닌 이 회사에서 이 성장 경로가 왜 의미 있는가요?"에 답할 수 있는가?',
            helpQuestions: [
              '이 회사가 추진 중인 중장기 사업 방향은 무엇인가요? (IR자료·뉴스룸 확인)',
              '그 방향과 내 성장 경로가 겹치는 지점은?',
              '이 직무의 최고 전문가가 된다면 회사의 어떤 의사결정에 영향을 줄 수 있나요?'
            ],
            ifDifficult: '회사 홈페이지 > 투자자 정보(IR) 또는 뉴스룸에서 최근 중장기 전략 자료를 찾아보세요.',
            ifStillDifficult: '"이 회사가 ○○ 방향으로 나아가는데, 내가 ○○ 역량을 갖추면 그 과정에서 이렇게 기여할 수 있다"는 구조로 씁니다.'
          },
          placeholder: '예: [조직 전체 기여] 공정 데이터 분석·자동화 전문가로서 스마트팩토리 전환 과제 주도, 신공장 공정 표준 수립, 협력사 기술 지원으로 공급망 전체 품질 강화 기여\n[회사 방향성 연결] 귀사 IR 자료 기준 "스마트 제조 전환 가속" 전략과, 내가 중기적으로 쌓아갈 데이터 기반 공정 분석·자동화 역량이 직접 연결됩니다. 이 회사에서 성장하는 것이 귀사의 미래 공장 구현에 실질적인 기여가 될 것이라 생각합니다.',
          rows: 5
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q1 심화-1. 지금 당장 JD를 열어두고 — 핵심 업무 키워드를 3~5개 뽑아 각각의 본질을 한 문장으로 정의하세요.',
        hint: 'JD 키워드를 그대로 인용 + "이 업무의 존재 이유"를 풀어쓰는 연습',
        guide: {
          description: '단어를 복붙하는 것이 아니라, 그 단어가 담고 있는 의미를 풀어쓰는 것입니다. "공정 개선"이 아니라 "생산 비용 구조를 바꿔 제품 경쟁력을 높이는 것"처럼요. 이 연습이 되면 면접에서 "이 직무에서 가장 중요한 것이 뭔가요?"에 막히지 않습니다.',
          diagnosis: '즉석자가진단: "이 업무의 존재 이유가 무엇인가요?"라고 물으면 3초 안에 즉답 가능한가?',
          helpQuestions: [
            '지금 JD의 주요업무 항목을 열어두고 핵심 단어를 표시하세요',
            '각 업무 옆에 "이 업무가 없으면 회사에서 어떤 문제가 생기나?" 한 줄씩 씁니다',
            '면접관이 "이 직무에서 가장 중요한 것이 뭐예요?"라고 물으면?'
          ],
          ifDifficult: 'JD의 단어를 그대로 쓰되, 각 단어 옆에 "(왜냐하면 ___)" 한 문장만 추가해보세요.',
          ifStillDifficult: '현직자 유튜브에서 "이 직무의 가장 중요한 역량이 뭔가요?"라는 질문에 대한 답변을 찾아보세요.'
        },
        placeholder: '예(생산기술 기준):\nJD 키워드 → 본질 정의\n"공정 개선" → 불량·원가·사이클타임 데이터를 분석해 생산 경쟁력을 높이는 것\n"설비 관리" → 장비 가동률을 유지해 납기 약속을 지키는 것\n"품질 문제 대응" → 문제를 재발 없이 원인에서 차단하는 것\n"표준화 문서 작성" → 현장 노하우를 조직 자산으로 만드는 것',
        rows: 5
      },
      {
        id: 'q2_1_2',
        label: 'Q1 심화-2. 이 직무에서 "절대 하기 싫은 일"과 "가장 하고 싶은 일"을 비교해보세요.',
        hint: '싫은 것을 먼저 찾으면 정말 원하는 것이 선명해집니다 — 지원동기와도 연결되는 내용',
        guide: {
          description: '하고 싶은 것보다 하기 싫은 것이 더 솔직하게 나옵니다. 이 대비에서 "이 직무를 선택한 나만의 이유"가 드러납니다.',
          diagnosis: '즉석자가진단: 두 가지를 대비했을 때 "이래서 이 직무를 선택했다"는 이유가 보이나요?',
          helpQuestions: [
            '이 직무에서 단순 반복만 하게 된다면 어떤 기분일까요?',
            '이 직무의 어떤 순간에 가장 보람을 느낄 것 같은가요?',
            '다른 직무와 비교했을 때 이 직무만이 줄 수 있는 것은?'
          ],
          ifDifficult: '이 직무에서 성공한 사람의 하루를 상상해보세요. 그 하루 중 어떤 장면이 가장 하고 싶나요?',
          ifStillDifficult: '"계속 하다 보면 지칠 것 같은 것"과 "계속해도 안 지칠 것 같은 것"을 나눠보세요.'
        },
        placeholder: '예: [절대 하기 싫은 것] 문제 원인을 찾지 못한 채 임시방편으로만 해결하는 것, 데이터 없이 직관으로만 판단하는 환경\n[가장 하고 싶은 것] 불량 데이터를 파고들어 진짜 원인을 찾아내고 재발을 막는 것, 공정을 구조적으로 바꿔서 팀 전체의 업무 부담을 줄이는 것\n→ 이 직무를 선택한 이유: 문제를 데이터로 구조적으로 해결하는 것에 가장 몰입할 수 있기 때문',
        rows: 5
      },
      {
        id: 'q2_1_3',
        label: 'Q1 심화-3. 연계 팀(품질·설비·개발 등)의 JD를 하나 찾아보고, 그 팀이 이 직무에 원하는 것을 써보세요.',
        hint: '상대방의 언어를 알아야 진짜 협업이 됩니다 — 연계 팀 JD 리서치 후 작성',
        guide: {
          description: '진짜 협업 역량은 "내가 무엇을 잘한다"가 아니라 "상대방이 무엇을 필요로 하는지 알고 그것을 준다"에서 나옵니다. 연계 팀 JD를 읽으면 "그 팀이 이 직무에 원하는 것"이 보입니다.',
          diagnosis: '즉석자가진단: "품질팀(또는 연계팀)이 이 직무에 가장 원하는 것이 무엇인가요?"에 리서치 기반으로 답할 수 있는가?',
          helpQuestions: [
            '연계 팀 JD의 "주요업무" 항목을 읽어보세요',
            '그 팀이 업무를 잘 하려면 이 직무에서 무엇을 받아야 하나요?',
            '"우리 팀이 잘 되려면 당신 팀에서 ○○을 해줘야 한다"는 것은?'
          ],
          ifDifficult: '연계 팀 JD를 찾아서 "이 팀은 어떤 결과물을 만들어내는 팀인가?"를 먼저 파악하세요.',
          ifStillDifficult: '연계 팀 현직자 인터뷰를 하나 찾아보세요. "다른 팀과 협업할 때 가장 중요한 것"에 대한 답이 있을 수 있습니다.'
        },
        placeholder: '예: [품질팀이 이 직무에 원하는 것]\n① 정확하고 빠른 불량 원인 분류 데이터\n② 공정 개선 후 효과 수치 (불량률 변화)\n③ 신제품 MP 전 공정 FMEA 결과 공유\n[내가 준비할 것] 내 분석 양식을 품질팀 보고 형식에 맞추고, 월간 공유 루틴을 만들겠습니다',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2 심화-1. 보유 역량의 "실제 수준"을 STAR 구조로 하나씩 증명해보세요.',
        hint: '언제, 어디서, 무엇을 했고, 어떤 결과 — 수치가 있다면 반드시 포함',
        guide: {
          description: '역량이 있다고 말하는 것과 증명하는 것은 다릅니다. 각 역량마다 "어떤 상황에서, 어떻게 사용했고, 어떤 결과를 냈는가"를 써야 면접에서도 사용할 수 있는 답변이 됩니다.',
          diagnosis: '즉석자가진단: "그 역량을 입사 첫날 바로 사용하면 어떤 결과가 나올 것 같나요?"에 솔직하게 답할 수 있는가?',
          helpQuestions: [
            '가장 자신 있는 역량 하나를 골라 STAR로 써보세요',
            '그 결과에 숫자가 있나요?',
            '"보조 가능 / 독립 가능 / 지도 가능" 중 어느 수준인가요?'
          ],
          ifDifficult: '가장 자신 있는 것 하나만 STAR로 쓰고, 나머지는 수준(기초/중급)만 명시하세요.',
          ifStillDifficult: '아직 증명할 경험이 없다면 솔직하게 "이론 수준"이라고 쓰는 것이 더 낫습니다.'
        },
        placeholder: '예: [SPC 역량] 수준: 이론 중급 / S: 품질경영 수업 팀 프로젝트에서 데이터 분석 담당 / T: 불량 데이터로 관리도 작성 과제 / A: Excel로 X-bar 관리도 작성, 이상 포인트 3개 식별 / R: 교수님 평가 "실무 적용 가능 수준의 분석" / 현재 수준: 교과서 데이터 → 실무 데이터 적용은 추가 연습 필요',
        rows: 5
      },
      {
        id: 'q2_2_2',
        label: 'Q2 심화-2. 부족한 역량을 "단기에 채울 수 있는 것"과 "시간이 걸리는 것"으로 분류하세요.',
        hint: '입사 전에 채울 것 vs 입사 후 OJT로 채울 것을 구분하면 계획이 현실적이 됩니다',
        guide: {
          description: '모든 역량을 입사 전에 채울 수 없습니다. 짧은 시간에 채울 수 있는 것과 실무 경험이 필요한 것을 구분하면 Q3 계획이 현실적으로 됩니다.',
          diagnosis: '즉석자가진단: "입사 전까지 확실히 준비할 수 있는 역량은 몇 가지인가요?"에 즉답 가능한가?',
          helpQuestions: [
            '지식·개념 수준: 혼자 공부로 단기간에 가능',
            '경험·실습 필요: 실무나 OJT를 통해서만 가능',
            '자격증·인증: 시험 준비 기간이 필요'
          ],
          ifDifficult: '각 역량 옆에 "공부로 가능 / OJT 필요 / 자격 필요" 중 하나를 표시해보세요.',
          ifStillDifficult: '"이 역량을 유튜브와 교재로 익힐 수 있나요, 아니면 현장에서만 배울 수 있나요?"로 구분하세요.'
        },
        placeholder: '예:\n[입사 전 채울 수 있는 것 — 공부로 가능]\nFMEA 개념·양식 작성 → 교재 + 유튜브 강의 (2개월)\nSPC 기본 해석 → 공개 데이터셋 실습 (1개월)\n\n[입사 후 OJT로 채울 것 — 실무 경험 필요]\n설비 트러블슈팅 → 현장 실측 경험 필수\n공정 개선 실전 → 실제 생산 데이터 분석 경험 필요\n\n[자격증] 생산관리기사 → 입사 1~2년차 목표',
        rows: 5
      },
      {
        id: 'q2_2_3',
        label: 'Q2 심화-3. 현재 나의 준비 상태를 솔직하게 평가해보세요. 갖춘 것과 부족한 것은?',
        hint: '자만도, 과소평가도 아닌 객관적 평가 — 부족한 부분을 인정하는 것이 오히려 진정성을 높입니다',
        guide: {
          description: '솔직한 자기 평가는 입사후포부에서 진정성의 증거입니다. 모든 역량을 다 갖췄다고 쓰는 것보다, 갖춘 것과 부족한 것을 명확히 구분하고 부족한 부분의 보완 계획을 함께 제시하는 것이 더 설득력 있습니다.',
          diagnosis: '즉석자가진단: "부족한 역량을 어떻게 채울 건가요?"라고 물으면 구체적 계획을 즉답할 수 있는가?',
          helpQuestions: [
            '증거가 있는 역량만 "갖췄다"고 쓰세요 (프로젝트, 자격증, 실습 경험 등)',
            '부족한 역량은 구체적으로 어떻게 보완할 계획인가요?',
            '이미 보완을 시작한 것이 있나요?'
          ],
          ifDifficult: '자만하지도, 과소평가하지도 말고 객관적으로 평가하세요.',
          ifStillDifficult: '"열심히 배우겠습니다"는 보완 계획이 아닙니다. 구체적인 방법과 기간이 있어야 합니다.'
        },
        placeholder: '예: [준비 상태 평가]\n✅ 갖춘 것: SPC 기초, FMEA 개념 이해, 도면 해독 기초, 데이터 분석 Excel 활용\n⚠️ 기초 수준: Python 데이터 분석 (기초 문법은 알지만 실무 적용은 부족)\n❌ 부족한 것: 실제 설비 조작 경험, FMEA 실제 작성 경험\n\n[보완 계획]\nFMEA: 입사 전 2개월 교재 완독 + 가상 공정 3회 작성 실습\n설비: 입사 후 OJT에서 적극 참여하고 선배 동행 요청',
        rows: 5
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q3 심화-1. 부족한 역량 하나를 골라 "역량명/현재수준/준비방법/완료시기/확인기준" 5칸을 채워보세요.',
        hint: '가장 중요한 역량 하나로 연습하면 나머지도 같은 방식으로 쓸 수 있습니다',
        guide: {
          description: 'Q3의 핵심 훈련입니다. 이 다섯 칸을 채울 수 있으면 면접에서 "어떻게 준비했나요?"에 막히지 않습니다.',
          diagnosis: '즉석자가진단: "그 방법으로 준비하면 ○월에는 어떤 수준이 되나요?"에 즉답 가능한가?',
          helpQuestions: [
            '가장 입사 후 빨리 필요할 것 같은 역량을 고르세요',
            '현재 수준을 솔직하게 쓰세요 (미경험/이론/기초/중급)',
            '완료 시기는 입사 전? 3개월? 6개월?'
          ],
          ifDifficult: '"이 역량 없이 첫 주 업무를 하면 어떻게 될까?"를 상상하고, 가장 곤란한 것부터 써보세요.',
          ifStillDifficult: '준비 방법이 없다면 지금 당장 검색해서 "어떻게 배울 수 있는지"를 찾아보세요.'
        },
        placeholder: '예: [역량명] FMEA 작성\n[현재 수준] 개념 인지 / 실제 작성 경험 없음\n[준비 방법] ①FMEA 교재 1권 완독 ②공정 가상 시나리오 3개에 직접 양식 작성 ③유튜브 FMEA 실무 강의 시청\n[완료 시기] 입사 전 2개월\n[확인 기준] 교재에 없는 새로운 공정 시나리오를 받았을 때 혼자 FMEA 양식 작성 완료 가능',
        rows: 5
      },
      {
        id: 'q2_3_2',
        label: 'Q3 심화-2. 지금까지 한 활동을 모두 나열하고, 각각 "왜 했는지"를 한 줄씩 써보세요.',
        hint: '"그냥 했다"거나 "스펙 때문에"는 답이 안 됩니다 — 이 직무와 어떻게 연결되는지가 핵심',
        guide: {
          description: '활동마다 진짜 이유를 찾는 과정이 핵심입니다. 목적이 없는 활동 나열은 스펙 나열과 같습니다. "~하기 위해 ~을 했다" 구조가 되어야 합니다.',
          diagnosis: '즉석자가진단: 각 활동의 이유가 이 직무에서 필요한 역량과 연결되나요?',
          helpQuestions: [
            '활동을 시작하게 된 계기가 무엇이었나요? (강요였나요, 자발적이었나요?)',
            '그 활동을 하면서 기대한 것은 무엇이었나요?',
            '이유가 없는 활동은 과감하게 입사후포부에서 빼세요'
          ],
          ifDifficult: '"~하기 위해 ~을 했다" 문장 구조로 각 활동을 다시 써보세요.',
          ifStillDifficult: '이유 없는 활동은 빼도 됩니다. 이유 있는 활동 2~3개가 훨씬 강합니다.'
        },
        placeholder: '예: ① 생산관리 수업 A+ → 공정의 전체 흐름을 이해하고 싶어서\n② 스마트팩토리 견학 2회 → 실제 현장이 어떻게 돌아가는지 보고 싶어서\n③ SPC 강의 수강 → FMEA와 함께 공정 품질 분석의 핵심이라고 판단해서\n④ 캡스톤 도면 작업 → 도면 해독이 생산기술의 기본이라고 느껴서\n\n이유 없는 활동 (삭제): 토익 — 직무와 직접 연관 없음',
        rows: 5
      },
      {
        id: 'q2_3_3',
        label: 'Q3 심화-3. 1년 로드맵을 "할 수 있게 되는 것" 단위로 다시 써보세요.',
        hint: '"○○을 공부하겠다"가 아닌 "○○을 할 수 있게 된다" — 결과 중심으로',
        guide: {
          description: '"공부하겠다"와 "할 수 있게 된다"는 다릅니다. 면접관이 보고 싶은 것은 "어떤 업무를 수행하는 사람이 될 것인가"입니다.',
          diagnosis: '즉석자가진단: 6개월 후 나의 수행 가능 업무 목록을 즉석에서 나열할 수 있는가?',
          helpQuestions: [
            '3개월 후: "할 수 있게 될 것"은?',
            '6개월 후: "독립적으로 수행할 수 있는 것"은?',
            '1년 후: "팀에 기여할 수 있는 것"은?'
          ],
          ifDifficult: 'Q3-3의 답변을 다시 보고, 각 항목을 "○○을 할 수 있다"는 문장으로 바꿔 쓰세요.',
          ifStillDifficult: '"입사 후 1년 경과 후 팀장이 나에게 맡길 수 있는 일은 무엇인가?"를 상상해보세요.'
        },
        placeholder: '예:\n[3개월 후 할 수 있는 것]\n공정 표준서 읽고 이해하기 / FMEA 양식 작성 (선배 검토 하에) / 일상 설비 점검표 독립 수행\n[6개월 후 할 수 있는 것]\n불량 데이터 분석 보고서 1차 작성 / 품질팀 미팅 내용 요약·공유\n[1년 후 할 수 있는 것]\n소규모 공정 개선 과제 독립 제안 / 담당 공정 불량률 추이 보고 독립 수행 / 파트 내 분석 방법론 공유',
        rows: 5
      },
      {
        id: 'q2_3_4',
        label: 'Q3 심화-4. JD 키워드 하나를 골라 "개인→파트→팀→회사" 단위로 확장하는 시나리오를 써보세요.',
        hint: '같은 키워드가 범위에 따라 어떻게 달라지는지 — 직무 이해의 깊이를 보여주는 연습',
        guide: {
          description: '이 연습이 잘 되면 "작은 것에서 큰 것으로" 확장하는 서사가 자연스럽게 나옵니다. 면접에서 "10년 후에는?"이라는 질문에도 자신 있게 답할 수 있습니다.',
          diagnosis: '즉석자가진단: 이 키워드로 "개인 수준의 기여"와 "회사 수준의 기여"를 구분해서 설명할 수 있는가?',
          helpQuestions: [
            'JD에서 가장 핵심적인 키워드 하나를 고르세요',
            '그 키워드를 나 혼자 적용하면? → 파트에 적용하면? → 회사 전체에 영향을 주면?',
            '"이 역량이 회사 전체에 퍼지면 어떤 가치가 생기나요?"'
          ],
          ifDifficult: '"공정 개선" 하나만 골라서 개인·파트·팀·회사 칸을 채워보세요.',
          ifStillDifficult: '각 단계에서 "이 수준의 기여를 하려면 어떤 역량이 추가로 필요한가?"를 함께 쓰세요.'
        },
        placeholder: '예: 키워드 — "데이터 기반 공정 개선"\n[개인] 담당 공정 1개 불량률 데이터 분석 → 원인 제거 → 5% 감소\n[파트] 분석 방법론을 파트 내 표준 양식으로 공유 → 다른 팀원도 적용\n[팀] 팀 전체 라인 불량 데이터 통합 분석 → 라인 밸런싱 개선 제안\n[회사] 공장 전체 스마트팩토리 데이터 수집 체계 구축에 기여',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q4 심화-1. 이 직무 5년차 현직자 인터뷰나 시니어 JD를 찾아 — "지금의 나"와 "다음 단계 나" 사이의 갭을 써보세요.',
        hint: '갭이 명확해야 준비 계획이 구체적이 됩니다 — 리서치 결과를 그대로 쓰세요',
        guide: {
          description: '다음 단계를 상상으로 쓰면 공허합니다. 실제로 그 단계에 있는 사람의 이야기나 시니어 JD를 기반으로 "지금과 그때의 차이"를 구체적으로 파악해야 준비 계획이 나옵니다.',
          diagnosis: '즉석자가진단: "지금의 나"와 "4년차 나" 사이에 어떤 구체적인 차이가 있는지 설명할 수 있는가?',
          helpQuestions: [
            '시니어 JD 우대사항에 "신입 JD에는 없는 것"이 있나요?',
            '현직자 인터뷰에서 "3년이 지나자 달라진 것"이 있었나요?',
            '그 갭을 채우려면 어떤 경험이 필요한가?'
          ],
          ifDifficult: '시니어 JD와 신입 JD를 나란히 놓고 "추가된 항목"을 표시해보세요.',
          ifStillDifficult: '현직자 인터뷰에서 "1년차와 4년차의 가장 큰 차이"를 검색해보세요.'
        },
        placeholder: '예: [리서치 기반 갭 분석]\n시니어 JD에 있고 신입 JD에 없는 것:\n① 공정 라인 전체 관리 및 최적화 주도\n② 후임 지도 및 작업 표준서 수립 책임\n③ 원가 절감 과제 독립 기획·실행\n④ 신제품 MP 총괄 참여\n\n갭을 채우기 위해 필요한 경험:\n① 라인 전체 데이터를 보는 기회 자원\n② 원가 과제 보조 참여 → 독립 기획 순서로\n③ MP 참여 기회가 생기면 적극 지원',
        rows: 5
      },
      {
        id: 'q2_4_2',
        label: 'Q4 심화-2. Q1~Q3에서 나온 역량 준비와 성장 경로가 어떻게 하나의 흐름으로 연결되는지 써보세요.',
        hint: '"직무 이해 → 역량 갭 → 확보 계획 → 범위 확장 → 다음 단계 → 큰 그림"이 하나의 인과 흐름인지 점검',
        guide: {
          description: 'Q1~Q3이 따로 놀면 입사후포부가 아닌 목표 나열이 됩니다. 이 흐름이 자연스럽게 연결될 때, 면접관이 "이 사람은 정말 이 직무를 깊이 이해하고 있구나"라고 느낍니다.',
          diagnosis: '즉석자가진단: "Q3에서 준비한 것이 Q4 다음 단계로 어떻게 이어지나요?"에 막힘없이 설명할 수 있는가?',
          helpQuestions: [
            'Q3에서 준비한 역량이 Q4 다음 단계에서 어디에 쓰이나요?',
            '끊기는 지점이 있다면 어떤 추가 준비가 필요한가?',
            '전체 흐름을 한 문단으로 요약할 수 있나요?'
          ],
          ifDifficult: 'Q1, Q2, Q3, Q4 답변을 나란히 놓고 "화살표로 연결하면 자연스러운가?"를 확인하세요.',
          ifStillDifficult: '각 단계 끝에 "이것을 완성하면 → 다음에 이것이 가능해진다"는 한 문장을 추가해보세요.'
        },
        placeholder: '예: [흐름 점검]\nQ1: 생산기술의 본질은 공정 데이터로 불량률·원가를 구조적으로 개선하는 것\n↓\nQ2: 현재 SPC·FMEA 이론 수준 + 설비 경험 부재\n↓\nQ3: 입사 전 FMEA 실습 + 입사 후 3개월 SPC 실무, 파트 분석 방법론 공유로 범위 확장\n↓\nQ4: 라인 전체 관리 경험 + PLC 기초 → 스마트팩토리 전환 과제 기여\n\n[끊기는 지점] Q3→Q4 사이: 라인 전체를 보는 경험이 추가로 필요 → 2년차 TF 참여 자원',
        rows: 5
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_q1',
      label: '연결 질문 1: 직무 핵심 이해 + 나의 현재 — 오프닝 단락',
      hint: 'Q1에서 파악한 "이 직무의 핵심"과 Q2에서 진단한 "나의 현재 위치"를 하나의 단락으로 연결하세요. "이 직무의 핵심은 ○○이고, 나는 ○○을 갖췄지만 ○○이 부족하다"는 구조가 되어야 합니다. JD 키워드를 직접 인용하고, 단순한 자기소개가 아닌 이 직무를 이해한 사람으로서의 시작이어야 합니다.',
      placeholder: '예: 생산기술의 본질은 공정 데이터를 분석하여 불량률과 원가를 구조적으로 개선하는 것이라 이해합니다. 저는 현재 SPC 기초와 FMEA 개념을 갖추고 있으나, 실제 현장 데이터와 설비를 다루는 경험이 부족합니다. 이 갭을 정확히 인식한 상태에서, 구체적인 계획으로 준비해나가겠습니다.',
      rows: 5,
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_2_1', 'q1_2_2']
    },
    {
      id: 'connect_q2',
      label: '연결 질문 2: 역량 갭 → 확보 계획 → 범위 확장 — 준비+단기 기여 단락',
      hint: '"○○ 역량이 부족하기 때문에 ○○을 ○○ 방법으로 ○개월 안에 준비하겠다"는 구조가 핵심입니다. JD 키워드를 연결해서 쓰고, 역량이 갖춰지면 어떻게 파트·팀으로 범위가 확장되는지까지 이어야 합니다.',
      placeholder: '예: 부족한 FMEA 역량을 보완하기 위해 입사 전 2개월간 교재 완독과 가상 공정 실습을 진행하겠습니다. SPC 실무 해석은 입사 후 3개월 내에 관리도 작성을 반복하여 이상 원인 분류를 혼자 판단할 수 있는 수준까지 끌어올리겠습니다. 이 역량이 갖춰지면, 담당 공정의 불량 원인 분석 결과를 파트 표준 양식으로 정리하여 공유함으로써 파트 전체의 데이터 관리 수준 향상에 기여하겠습니다.',
      rows: 5,
      referenceQuestions: ['q1_2_2', 'q1_3_1', 'q1_3_2', 'q1_3_3']
    },
    {
      id: 'connect_q3',
      label: '연결 질문 3: 단기 성과 → 중기 다음 단계 — 성장 단락',
      hint: '단기에서 쌓은 경험이 어떤 다음 역할로 이어지고, 그 단계에 진입하기 위해 무엇을 추가로 준비할지 연결하세요. 이 직무를 깊이 아는 사람만 쓸 수 있는 내용이어야 합니다.',
      placeholder: '예: 1~2년차에 담당 공정 개선 과제를 반복 수행하며 데이터 분석 역량이 쌓이면, 라인 전체 밸런싱 과제에 참여할 수 있는 수준이 됩니다. 이 단계로 나아가기 위해서는 개별 공정을 넘어 라인 전체를 보는 시야와 PLC 기초를 더해 설비-공정 연계 분석이 가능한 역량이 필요합니다. 이를 위해 2년차부터 라인 개선 TF 참여를 자원하고, 외부 PLC 교육을 이수할 계획입니다.',
      rows: 5,
      referenceQuestions: ['q1_3_2', 'q1_3_3', 'q1_q4_1']
    },
    {
      id: 'connect_q4',
      label: '연결 질문 4: 개인 성장 → 조직 기여 큰 그림 — 클로징 단락',
      hint: '나의 성장 경로가 단순히 개인의 발전이 아니라 이 회사의 성장 방향과 어떻게 연결되는지를 보여주세요. 리서치 없이는 쓸 수 없는 내용이어야 합니다. "열심히 하겠습니다"가 아닌 역량+성장+기여의 자연스러운 결론이어야 합니다.',
      placeholder: '예: 단기·중기에 쌓아온 공정 데이터 분석과 라인 관리 역량은 궁극적으로 귀사의 스마트팩토리 전환이라는 큰 방향과 연결됩니다. 디지털화된 공정 데이터를 분석하고 개선하는 엔지니어로 성장하는 것이 저 개인의 목표이자, 귀사의 생산 경쟁력을 높이는 과정에 실질적으로 기여하는 경로라 생각합니다. 이 성장 경로가 귀사에서 가능하기에, 귀사를 선택했습니다.',
      rows: 5,
      referenceQuestions: ['q1_q4_1', 'q1_q4_2']
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

    // Q1: 직무 핵심 이해 + 나의 현재
    if (answers.connect_q1) parts.push(answers.connect_q1);
    else {
      if (answers.q1_1_1) parts.push(answers.q1_1_1);
      if (answers.q1_2_1) parts.push(answers.q1_2_1);
      if (answers.q1_2_2) parts.push(answers.q1_2_2);
    }

    // Q2: 역량 갭 → 확보 계획 → 범위 확장
    if (answers.connect_q2) parts.push('\n' + answers.connect_q2);
    else {
      if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
      if (answers.q1_3_2) parts.push(answers.q1_3_2);
      if (answers.q1_3_3) parts.push(answers.q1_3_3);
    }

    // Q3: 단기 성과 → 중기 다음 단계
    if (answers.connect_q3) parts.push('\n' + answers.connect_q3);
    else {
      if (answers.q1_q4_1) parts.push('\n' + answers.q1_q4_1);
    }

    // Q4: 개인 성장 → 조직 기여 큰 그림
    if (answers.connect_q4) parts.push('\n' + answers.connect_q4);
    else {
      if (answers.q1_q4_2) parts.push('\n' + answers.q1_q4_2);
    }

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
    return `📋 원본 답변 모음\n\n[기본 정보]\n산업: ${basicInfo.industry || '-'}\n직무: ${basicInfo.job || '-'}\n회사: ${basicInfo.company || '-'}\n\n[Q1: 직무 핵심 이해]\nQ1-1 핵심 업무·본질: ${answers.q1_1_1 || '-'}\nQ1-2 성과자 역량: ${answers.q1_1_2 || '-'}\nQ1-3 연계 팀·역할: ${answers.q1_1_3 || '-'}\n\n[Q2: 현재 역량 진단]\nQ2-1 보유 역량: ${answers.q1_2_1 || '-'}\nQ2-2 부족한 역량: ${answers.q1_2_2 || '-'}\nQ2-3 이미 시작한 노력: ${answers.q1_2_3 || '-'}\n\n[Q3: 역량 확보 및 범위 확장 계획]\nQ3-1 역량별 확보 방법+시기: ${answers.q1_3_1 || '-'}\nQ3-2 업무 범위 확장: ${answers.q1_3_2 || '-'}\nQ3-3 측정 기준+1년 후 수준: ${answers.q1_3_3 || '-'}\n\n[Q4: 다음 단계와 큰 그림]\nQ4-1 다음 역할+준비 경로: ${answers.q1_q4_1 || '-'}\nQ4-2 조직 기여+회사 방향 연결: ${answers.q1_q4_2 || '-'}\n\n[3라운드 연결 질문]\n연결Q1 (직무핵심+현재): ${answers.connect_q1 || '-'}\n연결Q2 (역량갭→확보→확장): ${answers.connect_q2 || '-'}\n연결Q3 (단기→중기다음단계): ${answers.connect_q3 || '-'}\n연결Q4 (개인성장→조직기여): ${answers.connect_q4 || '-'}`;
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') {
      return selectedSteps.length >= 1;
    }
    if (currentStep === 0 && currentPhase === 'round1') {
      return basicInfo.industry && basicInfo.job && basicInfo.company;
    }
    return true;
  };

  const progress = currentPhase === 'round1'
    ? ((currentStep + 1) / round1Steps.length) * 33
    : currentPhase === 'round2'
    ? 33 + ((currentStep + 1) / selectedSteps.length) * 33
    : 66 + ((currentStep + 1) / round3Questions.length) * 34;

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
                  <p className="text-sm text-gray-700">4개 Q 핵심 질문에 답변 — 직무 핵심 이해 · 역량 진단 · 확보 계획+범위 확장 · 다음 단계+큰 그림</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 보강</h3>
                  <p className="text-sm text-gray-700">부족한 Q 선택 → 심화 질문으로 구체화 (JD 키워드 연결·역량 증명·확장 시나리오)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">4개 연결 질문(직무핵심+현재 / 역량확보+범위확장 / 다음단계 / 큰그림+회사기여)으로 하나의 인과 흐름으로 완성</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>JD 직결:</strong> 직무 공고 키워드를 직접 인용한 내용만</li>
                <li><strong>구체성:</strong> 역량마다 방법·시기·측정기준 세트로 표현</li>
                <li><strong>검증 가능성:</strong> 증거가 있는 역량만, 막연한 선언 금지</li>
                <li><strong>연결성:</strong> 직무 이해 → 역량 진단 → 확보 계획 → 범위 확장 → 다음 단계 → 큰 그림이 하나의 인과 흐름으로 이어져야 합니다</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">💡 직무를 많이 알수록 더 잘 쓸 수 있습니다</p>
                <p className="text-sm text-gray-700">
                  JD를 여러 번 읽고, 시니어 채용공고를 검색하고, 현직자 인터뷰를 찾아볼수록 각 질문의 답변이 구체적이 됩니다. 막힌다면 리서치가 부족하다는 신호입니다.
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
                  © 2026 CareerEngineer All Rights Reserved.
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
            <p className="text-center text-gray-600 mb-4">
              답변이 얕거나 더 구체화가 필요한 질문을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 text-sm text-amber-900 rounded">
              <p className="font-semibold mb-1">💡 선택 기준</p>
              <p>답변을 다시 읽었을 때 면접관이 <strong>"더 구체적으로 말해줄 수 있어요?"</strong>라고 물을 것 같은 Q를 선택하세요.</p>
              <p className="mt-1 text-amber-700">특히 JD 키워드 연결이 부족하거나, 역량 확보 계획에 방법·시기·측정기준이 없는 Q를 우선 선택하세요.</p>
            </div>

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
                <strong>💡 선택 기준:</strong> 답변이 부족하거나 더 구체화가 필요한 Q를 자유롭게 선택하세요. (1개 이상)
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
              © 2026 CareerEngineer All Rights Reserved.
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

              {/* 첫 문장 가이드 */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded">
                <p className="text-sm font-bold text-amber-900 mb-2">💡 첫 문장 — 전체 주제문</p>
                <p className="text-sm text-amber-800 mb-1">구조: <strong>[직무 핵심 정의]</strong>로 시작 → <strong>[나의 현재 위치]</strong> 솔직하게 → <strong>[갭 인식]</strong> 명확히 → <strong>[준비 의지]</strong> 자연스럽게</p>
                <p className="text-xs text-amber-700 mt-2 border-t border-amber-200 pt-2">⚠️ 피해야 할 표현: "저는 ~한 사람입니다"로 시작 / "열심히 배우겠습니다"로 끝 / JD 키워드가 하나도 없는 일반론</p>
              </div>

              {/* 전체 흐름 가이드 + 실제 답변 참조 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-purple-900 mb-3">📋 내 답변 활용 가이드 — 각 단락의 재료와 연결 방법</p>
                <p className="text-xs text-purple-700 mb-4">아래 답변들을 참고하여 위 텍스트를 수정하세요. 모든 답변을 쓸 필요는 없습니다. 각 단락에서 가장 구체적이고 선명한 것 하나씩 골라 연결하세요.</p>

                {/* Q1 */}
                <div className="bg-white border-l-4 border-purple-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-purple-700 mb-2">Q1 — 직무 핵심 + 나의 현재 (오프닝 단락)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q1이 있으면 우선 사용. 없으면 아래에서 선택</p>
                  {answers.connect_q1 && (
                    <div className="bg-purple-50 rounded p-2 mb-2">
                      <p className="text-xs text-purple-600 font-semibold">✅ 연결Q1 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q1.substring(0, 150)}{answers.connect_q1.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_1_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">핵심 업무·본질 (Q1-1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_1_1.substring(0, 100)}{answers.q1_1_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_2_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">보유 역량 (Q2-1) → 현재 위치로 연결</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_2_1.substring(0, 100)}{answers.q1_2_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-purple-600 mt-2 italic">연결 문장 예시: "이 직무의 본질을 이해한 상태에서, 현재 저의 위치를 솔직하게 진단해보면..."</p>
                </div>

                {/* Q2 */}
                <div className="bg-white border-l-4 border-pink-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-pink-700 mb-2">Q2 — 역량 갭 → 확보 계획 → 범위 확장 (준비+단기 기여 단락)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q2가 있으면 우선 사용. 없으면 아래에서 가장 구체적인 것 선택</p>
                  {answers.connect_q2 && (
                    <div className="bg-pink-50 rounded p-2 mb-2">
                      <p className="text-xs text-pink-600 font-semibold">✅ 연결Q2 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q2.substring(0, 150)}{answers.connect_q2.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_3_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">역량별 확보 계획 (Q3-1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_3_1.substring(0, 100)}{answers.q1_3_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_3_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">범위 확장 계획 (Q3-2)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_3_2.substring(0, 100)}{answers.q1_3_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-pink-600 mt-2 italic">연결 문장 예시: "부족한 ○○ 역량을 ○○ 방법으로 준비하고, 이 역량이 갖춰지면..."</p>
                </div>

                {/* Q3 */}
                <div className="bg-white border-l-4 border-purple-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-purple-700 mb-2">Q3 — 단기 성과 → 중기 다음 단계 (성장 단락)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q3가 있으면 우선 사용. 없으면 Q4-1 답변을 활용</p>
                  {answers.connect_q3 && (
                    <div className="bg-purple-50 rounded p-2 mb-2">
                      <p className="text-xs text-purple-600 font-semibold">✅ 연결Q3 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q3.substring(0, 150)}{answers.connect_q3.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_q4_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">다음 역할+준비 경로 (Q4-1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_q4_1.substring(0, 100)}{answers.q1_q4_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-purple-600 mt-2 italic">연결 문장 예시: "단기에 쌓은 경험이 쌓이면, 이러한 다음 단계로 나아갈 수 있습니다..."</p>
                </div>

                {/* Q4 */}
                <div className="bg-white border-l-4 border-pink-500 rounded p-3 mb-2">
                  <p className="text-xs font-bold text-pink-700 mb-2">Q4 — 개인 성장 → 조직 기여 큰 그림 (클로징 단락, "열심히 하겠다"가 아닌 인과의 결론)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q4가 있으면 우선 사용. 회사 방향성과 연결된 내용이어야 합니다</p>
                  {answers.connect_q4 && (
                    <div className="bg-pink-50 rounded p-2 mb-2">
                      <p className="text-xs text-pink-600 font-semibold">✅ 연결Q4 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q4.substring(0, 150)}{answers.connect_q4.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_q4_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">조직 기여+회사 방향 연결 (Q4-2)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_q4_2.substring(0, 100)}{answers.q1_q4_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-pink-600 mt-2 italic">연결 문장 예시: "이렇게 성장한 역량이 귀사의 [방향성]과 연결되어, 이런 방식으로 기여하겠습니다..."</p>
                </div>
              </div>

              {/* 수정 전 최종 확인 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-blue-900 mb-3">✅ 수정 전 최종 확인 — 통과 못 하면 해당 답변으로 돌아가세요</p>
                <div className="space-y-3">

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">① 첫 문장에 JD 키워드가 직접 인용되어 있는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-purple-600 font-semibold">Q1-1(핵심 업무·본질)</span>로 돌아가서 JD에서 단어를 가져오세요</p>
                    {answers.q1_1_1 && <p className="text-xs text-gray-600 mt-1 bg-gray-50 rounded p-1 italic">"{answers.q1_1_1.substring(0, 60)}{answers.q1_1_1.length > 60 ? '...' : ''}" — Q1-1</p>}
                  </div>

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">② Q1(직무핵심+현재) → Q2(역량확보+범위확장) → Q3(다음단계) → Q4(큰그림)이 인과관계로 이어지는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → 각 단락 사이에 연결 문장이 있는지 확인하세요. 위 내 답변 활용 가이드의 <span className="text-purple-600 font-semibold">연결 문장 예시</span>를 참고하세요</p>
                    {answers.connect_q1 && <p className="text-xs text-gray-600 mt-1 bg-purple-50 rounded p-1 italic">Q1: "{answers.connect_q1.substring(0, 50)}{answers.connect_q1.length > 50 ? '...' : ''}" — 3라운드 연결Q1</p>}
                    {answers.connect_q4 && <p className="text-xs text-gray-600 mt-1 bg-pink-50 rounded p-1 italic">Q4: "{answers.connect_q4.substring(0, 50)}{answers.connect_q4.length > 50 ? '...' : ''}" — 3라운드 연결Q4</p>}
                  </div>

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">③ 역량 확보 계획에 방법·시기·측정기준이 모두 있는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-pink-600 font-semibold">Q3-1(역량별 확보 계획)</span>로 돌아가서 세 가지를 채우세요</p>
                    {answers.q1_3_1 && <p className="text-xs text-gray-600 mt-1 bg-gray-50 rounded p-1 italic">"{answers.q1_3_1.substring(0, 60)}{answers.q1_3_1.length > 60 ? '...' : ''}" — Q3-1</p>}
                  </div>

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">④ 마지막 문장이 "열심히 하겠습니다"가 아닌 역량+성장+기여의 인과 결론인가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-pink-600 font-semibold">3라운드 연결Q4</span>를 다시 보거나, Q4-2(조직 기여+회사 방향)를 활용하세요</p>
                    {answers.connect_q4 && <p className="text-xs text-gray-600 mt-1 bg-pink-50 rounded p-1 italic">"{answers.connect_q4.substring(0, 60)}{answers.connect_q4.length > 60 ? '...' : ''}" — 3라운드 연결Q4</p>}
                  </div>

                </div>
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
                © 2026 CareerEngineer All Rights Reserved.
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
        title: '3라운드: 핵심 질문으로 완성',
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
            직무 핵심 이해 → 역량 진단 → 확보 계획+범위 확장 → 다음 단계+큰 그림
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
                  지원하고자 하는 산업
                </label>
                <input
                  type="text"
                  value={basicInfo.industry}
                  onChange={(e) => handleBasicInfoChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: IT, 금융, 제조, 유통 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 직무
                </label>
                <input
                  type="text"
                  value={basicInfo.job}
                  onChange={(e) => handleBasicInfoChange('job', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 생산기술, 공정개발, 품질관리, 데이터 분석 등"
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
                  placeholder="예: 삼성전자, LG화학, 현대자동차 등"
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
                    <div className={`border-l-4 p-4 mb-4 rounded-r-lg ${currentPhase === 'round3' ? 'bg-purple-50 border-purple-400' : 'bg-indigo-50 border-indigo-400'}`}>
                      <p className={`text-sm font-semibold mb-1 ${currentPhase === 'round3' ? 'text-purple-900' : 'text-indigo-900'}`}>
                        {currentPhase === 'round3' ? '📚 아래 답변들을 읽고, 하나의 흐름으로 연결해서 위 질문에 답하세요' : '📚 참고: 이전 답변'}
                      </p>
                      {currentPhase === 'round3' && (
                        <p className="text-xs text-purple-700 mb-3">모든 내용을 다 쓸 필요는 없습니다. 각 답변에서 가장 핵심적인 부분을 골라 자연스럽게 연결하세요.</p>
                      )}
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const allQuestions = round1Steps.flatMap(s => s.questions || []);
                          const refQuestion = allQuestions.find(q => q?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          const charLimit = currentPhase === 'round3' ? 300 : 150;
                          return (
                            <div key={refId} className={`rounded text-sm p-3 ${currentPhase === 'round3' ? 'bg-white border border-purple-100' : 'bg-white'}`}>
                              <p className={`font-semibold mb-1 text-xs ${currentPhase === 'round3' ? 'text-purple-700' : 'text-gray-700'}`}>
                                {refQuestion.label}
                              </p>
                              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {answers[refId]?.substring(0, charLimit)}{answers[refId]?.length > charLimit ? '...' : ''}
                              </p>
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
            © 2026 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerAspirationWorkbook;
