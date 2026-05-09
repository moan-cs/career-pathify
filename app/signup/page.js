'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'user', // المستخدم العادي
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'حدث خطأ أثناء إنشاء الحساب')
        return
      }

      setSuccess('تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول')

      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (err) {
      console.error(err)
      setError('تعذّر الاتصال بالخادم')
    }
  }

  return (
    <Layout navbarType="signup">
      {/* Hero Section */}
      <section className="signup-hero">
        <h1>انضم إلينا!</h1>
        <p>أنشئ حسابك الجديد وابدأ رحلتك لاكتشاف مسارك المهني</p>
      </section>

      {/* Signup Form */}
      <section className="signup-section">
        <div className="signup-form">
          <h2>إنشاء حساب جديد</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">اسم المستخدم:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">كلمة المرور:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="password-hint">
                يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
              </p>
            </div>

            {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '8px' }}>{success}</p>}

            <button type="submit">إنشاء الحساب</button>

            <div className="login-link">
              <p>
                هل لديك حساب ؟ <Link href="/login">سجل الدخول</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}
