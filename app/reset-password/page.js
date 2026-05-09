'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function ResetPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('https://pathify-backend-production.up.railway.app/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message || 'حدث خطأ')
        return
      }

      setMessage('تم إعادة تعيين كلمة المرور بنجاح!')
      setTimeout(() => router.push('/login'), 2000)
    } catch (err) {
      setMessage('خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

   return (
  <Layout navbarType="login">
    <section className="reset-section">
      <div className="reset-container">
        <div className="reset-card">
          <h2>🔒 نسيت كلمة المرور؟</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="كلمة المرور الجديدة"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? '⏳ جاري التحديث...' : '🔄 إعادة التعيين'}
            </button>
          </form>
          
          {message && (
            <p className={`message ${message.includes('نجاح') ? 'success' : 'error'}`}>
              {message}
            </p>
          )}
          
          <Link href="/login" className="login-link">
            ← العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </section>
  </Layout>
)


  
}
