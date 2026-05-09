"use client"

import Layout from '../components/Layout'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// هوك العدّاد المتحرك
const useCounter = (end, duration = 2000, startFrom = 0, shouldStart = false) => {
  const [count, setCount] = useState(startFrom)

  useEffect(() => {
    if (!shouldStart) return   // لا تبدأ إلا لما نقول لها ابدئي

    let start = startFrom
    const increment = (end - startFrom) / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration, startFrom, shouldStart])

  return count
}

export default function Home() {
  const statsRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)

  // نراقب دخول قسم الإحصائيات إلى الشاشة
  useEffect(() => {
    if (!statsRef.current) return

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true)   // فعّل العدادات
          }
        })
      },
      {
        threshold: 0.4, // لما حوالي 40% من القسم يبان
      }
    )

    observer.observe(statsRef.current)

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current)
      observer.disconnect()
    }
  }, [])

  // نمرر hasStarted للعدادات
  const usersCount = useCounter(10000, 2500, 0, hasStarted)
  const satisfactionCount = useCounter(95, 2000, 0, hasStarted)
  const pathsCount = useCounter(50, 1500, 0, hasStarted)

  return (
    <Layout navbarType="home">
      <section className="features-section">
        <h2>لماذا تختار Pathify؟</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>تقييم دقيق</h3>
            <p>اختبارات شخصية وعلمية مصممة خصيصاً لاكتشاف ميولك وقدراتك الحقيقية</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>تحليل متقدم</h3>
            <p>تحليل شامل لنتائجك ومقارنتها مع متطلبات سوق العمل الحالية والمستقبلية</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>تخطيط المسار</h3>
            <p>خطوات عملية ومحددة لتحقيق أهدافك المهنية من البداية حتى النجاح</p>
          </div>
        </div>
      </section>

      {/* قسم الإحصائيات المراقَب بالـ Observer */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-item">
            <h3 className="animated-number">+{usersCount.toLocaleString()}</h3>
            <p>مستخدم اكتشف مساره</p>
          </div>
          <div className="stat-item">
            <h3 className="animated-number">+{satisfactionCount}%</h3>
            <p>معدل رضا المستخدمين</p>
          </div>
          <div className="stat-item">
            <h3 className="animated-number">
              +{pathsCount}
            </h3>
            <p>مسار مهني مختلف</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>مستعد لاكتشاف مسارك؟</h2>
        <p>انضم لآلاف المستخدمين الذين وجدوا مسارهم المهني معنا</p>
        <Link href="/test" className="start-btn">
          ابدأ رحلتك الآن
        </Link>
      </section>
    </Layout>
  )
}
