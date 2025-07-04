import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
