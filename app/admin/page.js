'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'

export default function AdminPage() {
  const router = useRouter()

  const [currentUser] = useState(() => {
    if (typeof window === 'undefined') return null
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return null
    try {
      return JSON.parse(storedUser)
    } catch {
      return null
    }
  })

  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  // تحقق من الصلاحيات
  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('token')
    if (!token || !currentUser) {
      router.push('/login')
      return
    }
    if (currentUser.role !== 'admin') {
      router.push('/')
    }
  }, [router, currentUser])

  // جلب المستخدمين
  useEffect(() => {
    if (!currentUser) return
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) return

    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.message || 'تعذّر جلب المستخدمين')
          return
        }

        setUsers(data)
      } catch (err) {
        console.error(err)
        setError('تعذّر الاتصال بالخادم')
      }
    }

    fetchUsers()
  }, [currentUser])

  if (!currentUser) {
    return (
      <Layout navbarType="admin">
        <section className="admin-section">
          <div className="container">
            <p>جاري التحقق من صلاحيات الوصول...</p>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout navbarType="admin">
      <section className="admin-section">
        <div className="container">
          <h1>لوحة تحكم الأدمن</h1>

          <div className="admin-user-card">
            <h2>معلومات الحساب</h2>
            <p>
              <strong>الاسم:</strong> {currentUser.name}
            </p>
            <p>
              <strong>البريد الإلكتروني:</strong> {currentUser.email}
            </p>
            <p>
              <strong>الدور:</strong> {currentUser.role}
            </p>
          </div>

          <h2 style={{ marginTop: '2rem' }}>جميع المستخدمين</h2>

          {error && <p className="admin-error-text">{error}</p>}

          <p>عدد المستخدمين في النظام: {users.length}</p>

          {users.length === 0 ? (
            <p className="admin-empty-text">لا يوجد مستخدمون حتى الآن.</p>
          ) : (
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>الاسم</th>
                  <th>البريد</th>
                  <th>الدور</th>
                  <th>تاريخ الإنشاء</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={
                          'admin-role-badge ' +
                          (u.role === 'admin' ? 'admin' : 'user')
                        }
                      >
                        {u.role === 'admin' ? 'أدمن' : 'مستخدم'}
                      </span>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

         
        </div>
      </section>
    </Layout>
  )
}
