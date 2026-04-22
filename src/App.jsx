import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import AuthProvider from './contexts/AuthContext'
import { BlogContentProvider } from './contexts/BlogContentContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ServicesPage from './pages/ServicesPage'
import TeamPage from './pages/TeamPage'
import BlogPage from './pages/BlogPage'
import BlogSingle from './pages/BlogSingle'
import LoginPage from './pages/LoginPage'
import BlogManagement from './pages/BlogManagement'
import BlogEditor from './pages/BlogEditor'
import UserManagement from './pages/UserManagement'
import AssetTracking from './pages/services/AssetTracking'
import MobileSecurity from './pages/services/MobileSecurity'
import CapitalPlanning from './pages/services/CapitalPlanning'
import SiteMonitoring from './pages/services/SiteMonitoring'
import BlogCategory from './pages/BlogCategory'
import BlogTag from './pages/BlogTag'
import './i18n' // Initialize i18n

function App() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // Set document direction based on language
    const isRTL = i18n.language === 'ar'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
    
    // Listen for language changes
    const handleLanguageChange = (lng) => {
      const isRTL = lng === 'ar'
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
      document.documentElement.lang = lng
    }
    
    i18n.on('languageChanged', handleLanguageChange)
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])
  
  return (
    <AuthProvider>
      <BlogContentProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontFamily: 'inherit' },
            }}
            richColors
          />
          <div className="min-h-screen bg-white">
            <Routes>
            {/* Public Routes with Header/Footer */}
            <Route path="/" element={
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <AboutPage />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <ContactPage />
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Header />
                <ServicesPage />
                <Footer />
              </>
            } />
            <Route path="/team" element={
              <>
                <Header />
                <TeamPage />
                <Footer />
              </>
            } />
            <Route path="/blog" element={
              <>
                <Header />
                <BlogPage />
                <Footer />
              </>
            } />
            <Route path="/blog/category/:name" element={
              <>
                <Header />
                <BlogCategory />
                <Footer />
              </>
            } />
            <Route path="/blog/tag/:tag" element={
              <>
                <Header />
                <BlogTag />
                <Footer />
              </>
            } />
            <Route path="/blog/:slug" element={
              <>
                <Header />
                <BlogSingle />
                <Footer />
              </>
            } />
            <Route path="/services/asset-tracking" element={
              <>
                <Header />
                <AssetTracking />
                <Footer />
              </>
            } />
            <Route path="/services/mobile-security" element={
              <>
                <Header />
                <MobileSecurity />
                <Footer />
              </>
            } />
            <Route path="/services/capital-planning" element={
              <>
                <Header />
                <CapitalPlanning />
                <Footer />
              </>
            } />
            <Route path="/services/site-monitoring" element={
              <>
                <Header />
                <SiteMonitoring />
                <Footer />
              </>
            } />
            
            {/* Secret Admin Authentication Route */}
            <Route path="/admin/dashboard/login" element={<LoginPage />} />
            
            {/* Protected Blog Management Routes */}
            <Route path="/blog/manage" element={
              <ProtectedRoute requiredRole="author">
                <BlogManagement />
              </ProtectedRoute>
            } />
            <Route path="/blog/manage/new" element={
              <ProtectedRoute requiredRole="author">
                <BlogEditor />
              </ProtectedRoute>
            } />
            <Route path="/blog/manage/edit/:id" element={
              <ProtectedRoute requiredRole="author">
                <BlogEditor />
              </ProtectedRoute>
            } />
            <Route path="/blog/manage/users" element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
      </BlogContentProvider>
    </AuthProvider>
  )
}

export default App
