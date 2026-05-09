'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Test() {
  const router = useRouter()

  // حماية الصفحة: إعادة التوجيه إلى /login إذا ما في توكن
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
      }
    }
  }, [router])

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState('')

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5)

  const questions = [
    {
      question: 'أي من هذه المهام تستمتع بها أكثر؟',
      options: [
        { text: 'تحليل البيانات وإيجاد أنماط خفية', specialization: 'DataAnalysis' },
        { text: 'برمجة خوارزميات ذكية وتحسينها', specialization: 'AI' },
        { text: 'حماية الأنظمة من الاختراقات والتهديدات', specialization: 'Cybersecurity' },
        { text: 'تصميم واجهات مستخدم جميلة وسهلة الاستخدام', specialization: 'Frontend' },
        { text: 'بناء أنظمة وخوادم قوية ومستقرة', specialization: 'Backend' },
      ],
    },
    {
      question: 'ما نوع المشكلات التي تثير فضولك؟',
      options: [
        { text: 'مشكلات تحتاج تحليل إحصائي واستخلاص insights', specialization: 'DataAnalysis' },
        { text: 'مشكلات تحتاج تفكير إبداعي وخوارزميات معقدة', specialization: 'AI' },
        { text: 'مشكلات أمنية وايجاد ثغرات في الأنظمة', specialization: 'Cybersecurity' },
        { text: 'مشكلات تجربة المستخدم وتحسين الـ UI/UX', specialization: 'Frontend' },
        { text: 'مشكلات أداء الأنظمة وقابلية التوسع', specialization: 'Backend' },
      ],
    },
    {
      question: 'كيف تفضل العمل؟',
      options: [
        { text: 'العمل مع البيانات والأرقام والجداول', specialization: 'DataAnalysis' },
        { text: 'العمل على مشاريع بحثية وتطويرية', specialization: 'AI' },
        { text: 'اختبار الأنظمة وايجاد نقاط الضعف', specialization: 'Cybersecurity' },
        { text: 'التعامل مباشرة مع التصميم والألوان', specialization: 'Frontend' },
        { text: 'العمل على البنية التحتية والخوادم', specialization: 'Backend' },
      ],
    },
    {
      question: 'ما الأدوات التي تفضل استخدامها؟',
      options: [
        { text: 'أدوات التحليل مثل Excel, SQL, Python', specialization: 'DataAnalysis' },
        { text: 'مكتبات الذكاء الاصطناعي مثل TensorFlow', specialization: 'AI' },
        { text: 'أدوات الأمن مثل Wireshark, Metasploit', specialization: 'Cybersecurity' },
        { text: 'أدوات التصميم مثل Figma, Adobe XD', specialization: 'Frontend' },
        { text: 'أدوات الخوادم مثل Docker, AWS, Linux', specialization: 'Backend' },
      ],
    },
    {
      question: 'ما الهدف الذي تطمح لتحقيقه؟',
      options: [
        { text: 'تحويل البيانات إلى قرارات ذكية', specialization: 'DataAnalysis' },
        { text: 'بناء أنظمة ذكية تحاكي العقل البشري', specialization: 'AI' },
        { text: 'حماية المعلومات والبيانات الحساسة', specialization: 'Cybersecurity' },
        { text: 'خلق تجارب مستخدم لا تنسى', specialization: 'Frontend' },
        { text: 'بناء أنظمة تعمل بسلاسة لملايين المستخدمين', specialization: 'Backend' },
      ],
    },
  ]

  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    questions.map((q) => ({ ...q, options: shuffleArray(q.options) }))
  )

  const specializations = {
    DataAnalysis: {
      description:
        'شخصيتك التحليلية وحبك للأرقام تجعلك ممتازاً في مجال تحليل البيانات. ستكون مسؤولاً عن استخلاص insights قيّمة من البيانات لمساعدة الشركات في اتخاذ قرارات ذكية.',
      skills: ['Python', 'SQL', 'Excel', 'Tableau', 'الإحصاء', 'Power BI', 'R', 'تحليل البيانات', 'التصور البياني'],
      jobs: ['محلل بيانات', 'باحث تسويقي', 'محلل أعمال', 'أخصائي BI'],
      color: '#3B82F6',
      icon: '📈',
      message: 'البيانات كنز وأنت من سيكتشفه! 🔍',
    },
    AI: {
      description:
        'فضولك العلمي وحبك للتحديات المعقدة يؤهلك للتميز في الذكاء الاصطناعي. ستطور خوارزميات ذكية تحل مشاكل حقيقية وتغير العالم.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'خوارزميات ML', 'رياضيات', 'معالجة اللغة', 'رؤية حاسوبية', 'تعلم عميق'],
      jobs: ['مهندس تعلم آلي', 'باحث ذكاء اصطناعي', 'مطور روبوتات', 'أخصائي رؤية حاسوبية'],
      color: '#8B5CF6',
      icon: '🧠',
      message: 'المستقبل بين يديك، اصنعه بالذكاء! 🌟',
    },
    Cybersecurity: {
      description:
        'تفكيرك النقدي وحبك للتحديات الأمنية يجعلانك مثالياً في مجال الأمن السبراني. ستكون خط الدفاع الأول ضد الهجمات الإلكترونية.',
      skills: ['أمن الشبكات', 'اختبار الاختراق', 'تحقيق جنائي رقمي', 'تشفير', 'Linux', 'أمن التطبيقات', 'إدارة المخاطر', 'الوعي الأمني'],
      jobs: ['أخصائي أمن معلومات', 'هاكر أخلاقي', 'محقق جرائم إلكترونية', 'مدير أمن'],
      color: '#EF4444',
      icon: '🔒',
      message: 'أنت الحارس الذي ننتظره! 🚨',
    },
    Frontend: {
      description:
        'حسك الجمالي وحبك للتفاصيل يؤهلك للتميز في تطوير الواجهات. ستخلق تجارب مستخدم جميلة وسلسة تدهش المستخدمين.',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX Design', 'Responsive Design', 'Vue.js', 'TypeScript', 'أداء المتصفح'],
      jobs: ['مطور Frontend', 'مصمم واجهات', 'مطور React', 'أخصائي تجربة مستخدم'],
      color: '#10B981',
      icon: '💻',
      message: 'الإبداع يبدأ من واجهة! 🎭',
    },
    Backend: {
      description:
        'تفكيرك المنطقي وحبك للهندسة المعمارية يجعلانك ممتازاً في تطوير الأنظمة. ستبني البنية التحتية التي تدعم التطبيقات الضخمة.',
      skills: ['Node.js/Python', 'قواعد البيانات', 'APIs', 'Docker', 'AWS/Azure', 'Java', 'أنظمة التشغيل', 'هندسة البرمجيات'],
      jobs: ['مطور Backend', 'مهندس برمجيات', 'مهندس أنظمة', 'مطور قواعد بيانات'],
      color: '#F59E0B',
      icon: '⚙️',
      message: 'أنت من تبني الأساس المتين! 🏗️',
    },
  }

  const handleStartTest = () => {
    if (userName.trim()) setCurrentStep(1)
    else alert('الرجاء إدخال اسمك أولاً!')
  }

  const handleAnswer = (index) => {
    const newAnswers = [...answers]
    newAnswers[currentStep - 1] = index
    setAnswers(newAnswers)
    setCurrentStep(currentStep < questions.length ? currentStep + 1 : 6)
  }

  const handlePrevious = () => currentStep > 1 && setCurrentStep(currentStep - 1)
  const handleNext = () =>
    answers[currentStep - 1] !== undefined && currentStep < questions.length && setCurrentStep(currentStep + 1)

  const getSpecializationResult = () => {
    const scores = { DataAnalysis: 0, AI: 0, Cybersecurity: 0, Frontend: 0, Backend: 0 }
    answers.forEach((answerIndex, qIndex) => {
      const option = shuffledQuestions[qIndex]?.options[answerIndex]
      if (option?.specialization) scores[option.specialization] += 2
    })
    const maxScore = Math.max(...Object.values(scores))
    const resultKey = Object.keys(scores).find((k) => scores[k] === maxScore)
    return specializations[resultKey] || specializations.DataAnalysis
  }

  const restartTest = () => {
    setShuffledQuestions(questions.map((q) => ({ ...q, options: shuffleArray(q.options) })))
    setCurrentStep(0)
    setAnswers([])
    setUserName('')
  }

  if (currentStep === 0) {
    return (
      <Layout navbarType="test">
        <section className="test-hero">
          <div className="container">
            <h1>اختبار التخصص التقني 🚀</h1>
            <p>اكتشف أي تخصص تقني يناسب شخصيتك ومهاراتك</p>
            <div className="name-input">
              <label>ما اسمك؟</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="أدخل اسمك هنا..."
                className="name-field"
              />
            </div>
            <button className="start-test-btn" onClick={handleStartTest}>
              ابدأ الاختبار الآن 🚀
            </button>
          </div>
        </section>
      </Layout>
    )
  }

  if (currentStep >= 1 && currentStep <= questions.length) {
    const currentQuestion = shuffledQuestions[currentStep - 1]
    const currentAnswer = answers[currentStep - 1]
    return (
      <Layout navbarType="test">
        <section className="test-section">
          <div className="container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentStep / questions.length) * 100}%` }}></div>
            </div>
            <div className="question-counter">
              <span>
                سؤال {currentStep} من {questions.length}
              </span>
            </div>
            <div className="question-card">
              <h2>{currentQuestion.question}</h2>
              <div className="options-grid">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${currentAnswer === i ? 'selected' : ''}`}
                    onClick={() => handleAnswer(i)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div className="navigation-buttons">
                {currentStep > 1 && (
                  <button className="prev-btn" onClick={handlePrevious}>
                    ← السابق
                  </button>
                )}
                {currentAnswer !== undefined && currentStep < questions.length && (
                  <button className="next-btn" onClick={handleNext}>
                    التالي →
                  </button>
                )}
                {currentAnswer !== undefined && currentStep === questions.length && (
                  <button className="finish-btn" onClick={() => setCurrentStep(6)}>
                    إنهاء الاختبار 🎯
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  if (currentStep === 6) {
    const result = getSpecializationResult()
    return (
      <Layout navbarType="test">
        <section className="results-section">
          <div className="container">
            <div className="results-card">
              <h1>ياهلا {userName}!👋🏼</h1>
              <p className="special-message">{result.message}</p>
              <div className="specialization-result" style={{ borderColor: result.color }}>
                <div className="result-header">
                  <h2 style={{ color: result.color }}>{resultKeyToTitle(result)}</h2>
                </div>
                <p>{result.description}</p>
                <div className="skills-list">
                  <h3> المهارات المطلوبة:</h3>
                  <ul className="skills-ul">
                    {result.skills.map((s, i) => (
                      <li key={i} className="skill-item">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="jobs-list">
                  <h3> الوظائف المقترحة:</h3>
                  <ul>
                    {result.jobs.map((j, i) => (
                      <li key={i}>{j}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="results-actions">
                <button className="restart-btn" onClick={restartTest}>
                  إعادة الاختبار
                </button>
                <button
                  className="roadmap-btn"
                  onClick={() => {
                    const pathMap = {
                      DataAnalysis: 'data_analysis',
                      AI: 'ai',
                      Cybersecurity: 'cyber',
                      Frontend: 'frontend',
                      Backend: 'backend',
                    }
                    localStorage.setItem('testResultPath', pathMap[resultKeyToTitle(result, true)])
                    window.location.href = '/roadmap'
                  }}
                >
                  🗺️ شاهد خريطة الطريق
                </button>
                <Link href="/" className="home-btn">
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout navbarType="test">
      <section className="test-hero">
        <div className="container">
          <h1>حالة غير متوقعة... 🔄</h1>
          <button onClick={restartTest} className="start-test-btn">
            إعادة البدء
          </button>
        </div>
      </section>
    </Layout>
  )
}

function resultKeyToTitle(result, keyOnly = false) {
  if (result === undefined) return 'Data Analysis'
  if (result.skills?.includes('Python') && result.icon === '📈') return keyOnly ? 'DataAnalysis' : 'Data Analysis 📊'
  if (result.skills?.includes('TensorFlow')) return keyOnly ? 'AI' : 'AI 🤖'
  if (result.icon === '🔒') return keyOnly ? 'Cybersecurity' : 'Cybersecurity 🛡️'
  if (result.icon === '💻') return keyOnly ? 'Frontend' : 'Frontend 🎨'
  if (result.icon === '⚙️') return keyOnly ? 'Backend' : 'Backend ⚙️'
  return keyOnly ? 'DataAnalysis' : 'Data Analysis 📊'
}
