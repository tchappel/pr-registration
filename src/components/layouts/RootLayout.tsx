import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function RootLayout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-bg-registration bg-pr-pattern">
      <Navbar />
      <main className="relative z-0 flex flex-1 items-center justify-center px-4 pb-24 md:px-8">
        <section
          aria-label="Registration"
          className="h-[640px] w-[min(720px,calc(100vw-32px))] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xs"
        >
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  )
}
