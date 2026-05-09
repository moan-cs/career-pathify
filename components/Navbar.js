'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar({ type = 'default' }) {
  const router = useRouter()

  // قراءة user مرّة واحدة من localStorage عند أول رندر في المتصفح
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          return JSON.parse(storedUser)
        } catch {
          return null
        }
      }
    }
    return null
  })

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    setCurrentUser(null)
    router.push('/login')
  }

  const renderLinks = (active) => (
    <>
      <Link href="/" className={`nav-link ${active === 'home' ? 'active' : ''}`}>الرئيسية</Link>
      <Link href="/about" className={`nav-link ${active === 'about' ? 'active' : ''}`}>عن الموقع</Link>

      {currentUser?.role === 'admin' && (
        <Link href="/admin" className="nav-link">لوحة التحكم</Link>
      )}

      {currentUser ? (
        <>
          <span className="nav-user">مرحبًا {currentUser.name}</span>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            تسجيل الخروج
          </button>
        </>
      ) : (
        <Link href="/signup" className="profile-icon">
          <span>👤</span>
        </Link>
      )}
    </>
  )

 return (
  <nav className="navbar">
    <div className="logo">
      <img src="/Pathify logo.png" alt="Pathify" className="logo-img" />
    </div>
    <div className="nav-right">
      {type === 'home' && renderLinks('home')}
      {type === 'about' && renderLinks('about')}
      {type === 'contact' && renderLinks('contact')}
      {type === 'login' && renderLinks('login')}
      {type === 'signup' && renderLinks('signup')}

      {type === 'admin' && (
        <>
          {currentUser?.role === 'admin' && (
            <Link href="/admin" className="nav-link active">
              لوحة التحكم
            </Link>
          )}
          {currentUser && (
            <>
              <span className="nav-user">مرحبًا، {currentUser.name}</span>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                تسجيل الخروج
              </button>
            </>
          )}
        </>
      )}

      {['home', 'about', 'contact', 'login', 'signup', 'admin'].includes(type) ||
        renderLinks('default')}
    </div>
  </nav>
)


}
