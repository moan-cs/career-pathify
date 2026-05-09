'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    //API إرسال طلب تسجيل الدخول إلى 
    try {
      const res = await fetch('https://pathify-backend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json() //  إلى كائن جافاسكريبت عاديJSON يحول رد السيرفير من  
  

      if (!res.ok) {
        setError(data.message || 'بيانات الدخول غير صحيحة')
        return
        //لو السيرفر قال إن الطلب فشل، 
        // اعرض للمستخدم رسالة خطأ (من السيرفر لو موجودة، وإلا رسالة عامة “بيانات الدخول غير صحيحة”)
        // ووقف باقي خطوات تسجيل الدخول.
      }

      // حفظ التوكن واليوزر في localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      // توجيه حسب الدور
      if (data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/test')
      }
    } catch (err) {
      console.error(err)
      setError('تعذّر الاتصال بالخادم')
    }
  }

  // الواجهة
  return (
    <Layout navbarType="login">
      {/* Login Form */}
      <section className="login-section">
        <div className="login-form">
          <h2>تسجيل الدخول</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">البريد الألكتروني:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">كلمة المرور:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}

            

            
        <Link href="/reset-password" className="forgot-password">
              نسيت كلمة المرور؟
              
            </Link>


            <button type="submit">دخول</button>

            <Link href="/signup" className="signup-btn">
              إنشاء حساب جديد
            </Link>

            
          </form>
        </div>
      </section>
    </Layout>
  )
}
