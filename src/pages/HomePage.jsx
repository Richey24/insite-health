import Hero from '../components/Hero'
import Features from '../components/Features'
import Solutions from '../components/Solutions'
import Environments from '../components/Environments'
import AboutTabs from '../components/AboutTabs'
import Team from '../components/Team'
import WhyChoose from '../components/WhyChoose'
import Statistics from '../components/StatisticsSimple'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'
import Contact from '../components/Contact'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Features />
      <Solutions />
      <Environments />
      <AboutTabs />
      {/* <Team /> */}
      <WhyChoose />
      <Statistics />
      <FAQ />
      <Blog />
      <Contact />
    </main>
  )
}

export default HomePage