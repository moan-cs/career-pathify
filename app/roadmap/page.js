'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'

export default function Roadmap({ resultPath }) {
  const router = useRouter()

  // حماية الصفحة بالتوكن
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
      }
    }
  }, [router])

  
  const getInitialPath = () => {
    if (typeof window !== 'undefined') {
      return resultPath || localStorage.getItem('testResultPath') || ''
    }
    return ''
  }

  const [selectedPath, setSelectedPath] = useState(getInitialPath)
  const [showAllPaths, setShowAllPaths] = useState(false)

  const paths = [
    { id: 'data_analysis', name: 'Data Analysis 📊', color: '#10B981' },
    { id: 'ai', name: 'Artificial Intelligence 🤖', color: '#8B5CF6' },
    { id: 'cyber', name: 'Cybersecurity 🛡️', color: '#EF4444' },
    { id: 'frontend', name: 'Frontend 🎨', color: '#3B82F6' },
    { id: 'backend', name: 'Backend ⚙️', color: '#F59E0B' },
  ]

  const dataAnalysisCourses = [
    { name: 'Learn Python  –  Full Course for Beginners', link: 'https://youtube.com/playlist?list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3&si=qfvGuE3eeV-YPf97', level: 'Beginner' },
    { name: 'Data Analysis with Python – Full Course for Beginners', link: 'https://youtu.be/wUSDVGivd-8?si=5PNKY7a5GEz6vr3l', level: 'Beginner' },
    { name: 'NumPy Tutorial – Python Data Analysis', link: 'https://youtu.be/r-uOLxNrNk8?si=Q-jVC46WlEP1dDiy', level: 'Intermediate' },
    { name: 'Pandas Tutorial – Data Analysis with Python', link: 'https://youtube.com/playlist?list=PLeo1K3hjS3uuASpe-1LjfG5f14Bnozjwy&si=OK7VU4d8hdIB22zP', level: 'Intermediate' },
    { name: 'Data Analysis Projects + Kaggle Tutorial', link: 'https://youtu.be/-jY1zPRBofg?si=2xzS_jNVzyX73Q3w', level: 'Intermediate' },
    { name: 'Data Visualization with Python (Matplotlib & Seaborn)', link: 'https://youtube.com/playlist?list=PL9n0l8rSshSnragNblKDBsT8Xu3otp3jA&si=JAxMHAnxxUb6eS_y', level: 'Advanced' },
    { name: 'Exploratory Data Analysis (EDA) with Python – عملي', link: 'https://youtu.be/Ed0P_CVjJcM?si=-wjNa1dqt6p3A4jx', level: 'Advanced' },
    { name: 'Data Analysis Full Project', link: 'https://youtube.com/playlist?list=PLeo1K3hjS3utcb9nKtanhcn8jd2E0Hp9b&si=v9J58mLvgwc2bbFe', level: 'Expert' },
  ]

  const aiCourses = [
    { name: 'Python for AI - Full Beginners Course', link: 'https://youtu.be/ygXn5nV5qFc?si=t3twD_TL4ypvP1J7', level: 'Beginner' },
    { name: 'Machine Learning Tutorial – from Scratch', link: 'https://youtube.com/playlist?list=PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s&si=kFy1T0b8hR7iX0_Z', level: 'Intermediate' },
    { name: 'Machine Learning Algorithms – عملي وشرح مفصل', link: 'https://youtube.com/playlist?list=PLtsZ69x5q-X9j44MdSX-NGuOhGXOY0aqH&si=CSOdovdsfBNKO-It', level: 'Intermediate' },
    { name: 'Deep Learning Full Course – Neural Networks & TensorFlow', link: 'https://youtube.com/playlist?list=PLeo1K3hjS3uu7CxAacxVndI4bE_o3BDtO&si=V4CN1oMu75V2RpN3', level: 'Advanced' },
    { name: 'Neural Networks & Backpropagation – عملي', link: 'https://youtu.be/hXvdPg_jtIc?si=KbqmoP6ZXXu0Ym0d', level: 'Advanced' },
    { name: 'AI + ML Projects', link: 'https://youtube.com/playlist?list=PLfFghEzKVmjvuSA67LszN1dZ-Dd_pkus6&si=DZYH_yfq9a5Rqui9', level: 'Expert' },
    { name: 'Natural Language Processing (NLP) Tutorial', link: 'https://youtube.com/playlist?list=PLtCBuHKmdxOefxJhd6u8KY9vTN8G5D5yG&si=HGRGTAvZgSylW-g7', level: 'Expert' },
  ]

  const cyberCourses = [
    { name: 'Cybersecurity – Full Course for Beginners', link: 'https://youtube.com/playlist?list=PL9ooVrP1hQOGPQVeapGsJCktzIO4DtI4_&si=jz4EaS7N2BsMH1Qf', level: 'Beginner' },
    { name: 'Linux for Security – أساسيات لينوكس للأمن', link: 'https://youtube.com/playlist?list=PLt7MnXUBn4g_NAael1IGBaPuzHSf6kcH8&si=qGJFc4-ksjMU-1me', level: 'Intermediate' },
    { name: 'Web Security – دورة أمن ويب', link: 'https://youtube.com/playlist?list=PLzA_9WOhI7VdNa5CbT8IbVFmaSIHIKubZ&si=KaFZEEXkJ_KNxd4G', level: 'Intermediate' },
    { name: 'PenTesting Basics – اختبار اختراق للمبتدئين', link: 'https://youtube.com/playlist?list=PLZeCRehnm9LODnv6f8UjpqEcCRftzXQIK&si=0fPI-b0FoDgQ5u_2', level: 'Advanced' },
    { name: 'Ethical Hacking / Bug Bounty – كورس عملي', link: 'https://youtu.be/qaNZKH5NohQ?si=7dJQANVMAuasbzUT', level: 'Advanced' },
    { name: 'Cybersecurity Projects – من الصفر للاحتراف', link: 'https://youtube.com/playlist?list=PLR0bgGon_WTK3G8Fa-FdJM2Pg76Uh7xBh&si=M9JBmQWwlzrIt5qc', level: 'Expert' },
  ]

  const frontendCourses = [
    { name: 'HTML & CSS Basics', link: 'https://youtu.be/Pwatx1n1Ws0?si=stsVmdCvYvz_MfKU', level: 'Beginner' },
    { name: 'JavaScript Basics', link: 'https://youtube.com/playlist?list=PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv&si=UOms0X16yqSwv_WX', level: 'Beginner' },
    { name: 'DOM Manipulation & Events', link: 'https://youtu.be/5fb2aPlgoys?si=K4BTj_vLAwASBoS_', level: 'Intermediate' },
    { name: 'ES6+ Features', link: 'https://youtu.be/nZ1DMMsyVyI?si=QmLHCM7Ol3rzbTZf', level: 'Intermediate' },
    { name: 'React Basics', link: 'https://youtu.be/fJSFus0pxZI?si=I9lNymhqO5Cpyy_4', level: 'Advanced' },
    { name: 'React Router & State Management', link: 'https://www.youtube.com/watch?v=Law7wfdg_ls', level: 'Advanced' },
    { name: 'Next.js for Production', link: 'https://www.youtube.com/watch?v=mTz0GXj8NN0', level: 'Expert' },
    { name: 'Advanced React Patterns', link: 'https://www.youtube.com/watch?v=FJDVKeh7RJI', level: 'Expert' },
  ]

  const backendCourses = [
    { name: 'Python Basics for Backend', link: 'https://www.youtube.com/watch?v=rfscVS0vtbw', level: 'Beginner' },
    { name: 'Introduction to Databases (SQL)', link: 'https://www.youtube.com/watch?v=yLc0Yp5QZlU&list=PL37D52B7714788190', level: 'Beginner' },
    { name: 'Node.js Basics', link: 'https://www.youtube.com/watch?v=Oe421EPjeBE', level: 'Intermediate' },
    { name: 'Express.js – Building APIs', link: 'https://www.youtube.com/watch?v=L72fhGm1tfE', level: 'Intermediate' },
    { name: 'Authentication & Authorization', link: 'https://youtu.be/A95rliroC8Q?si=_49AuLJkaZNsprsL', level: 'Advanced' },
    { name: 'REST API Design', link: 'https://www.youtube.com/watch?v=Q-BpqyOT3a8', level: 'Advanced' },
    { name: 'GraphQL APIs', link: 'https://www.youtube.com/watch?v=ed8SzALpx1Q', level: 'Expert' },
    { name: 'Deploying Backend Applications', link: 'https://www.youtube.com/watch?v=71wSzpLyW9k', level: 'Expert' },
  ]

  const coursesMap = {
    data_analysis: dataAnalysisCourses,
    ai: aiCourses,
    cyber: cyberCourses,
    frontend: frontendCourses,
    backend: backendCourses,
  }

  return (
    <Layout navbarType="roadmap">
      <div className="roadmap-container">
        <h1>Roadmap </h1>

        {selectedPath && (
          <section className="courses-section">
            <h2>{paths.find((p) => p.id === selectedPath)?.name}</h2>
            <div className="courses-grid">
              {coursesMap[selectedPath].map((course, index) => (
                <div key={index} className="course-card">
                  <h3>{course.name}</h3>
                  <p>Level: {course.level}</p>
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    ابدأ التعلم
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        <button className="toggle-paths-btn" onClick={() => setShowAllPaths(!showAllPaths)}>
          {showAllPaths ? 'إخفاء المسارات' : 'استكشاف باقي المسارات'}
        </button>

        {showAllPaths && (
          <section className="all-paths-grid">
            {paths.map((path) => (
              <div key={path.id} className="path-card" style={{ backgroundColor: path.color }}>
                <h3>{path.name}</h3>
                <button
                  onClick={() => {
                    setSelectedPath(path.id)
                    setShowAllPaths(false)
                  }}
                >
                  اذهب للمسار
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </Layout>
  )
}
