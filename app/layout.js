import './globals.css'

export const metadata = {
  title: 'Pathify',
  description: 'منصة تساعدك في اكتشاف المسار المهني المناسب',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  )
}