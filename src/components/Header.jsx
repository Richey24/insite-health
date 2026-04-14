import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: t('nav.home'), href: '/' },
    {
      name: t('nav.about'),
      href: '#',
      submenu: [
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.team'), href: '/team' },
      ]
    },
    {
      name: t('nav.services'),
      href: '/services',
      submenu: [
        { name: t('nav.services'), href: '/services' },
        { name: 'Asset Tracking', href: '/services/asset-tracking' },
        { name: 'Mobile Security', href: '/services/mobile-security' },
        { name: 'Capital Planning', href: '/services/capital-planning' },
        { name: 'Site Monitoring', href: '/services/site-monitoring' },
      ]
    },
    {
      name: t('nav.blog'),
      href: '/blog',
      submenu: [
        { name: t('nav.blog'), href: '/blog' },
      ]
    },
    { name: t('nav.contact'), href: '/contact' }
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-insite-blue text-white py-2">
        <div className="container-custom">
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+(99)125696889788" className="text-sm hover:text-insite-cyan transition-colors">
                +(99) 125 696 889 788
              </a>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-insite-cyan transition-colors">{t('header.helpDesk')}</a>
              <a href="#" className="hover:text-insite-cyan transition-colors">{t('header.emergency')}</a>
              <Link to="/contact" className="hover:text-insite-cyan transition-colors">{t('nav.contact')}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}>
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src="/assets/images/logo.png" 
                  alt="InSite Health System" 
                  className="h-12 md:h-14 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <button
                      className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                        location.pathname === item.href 
                          ? 'text-insite-blue' 
                          : 'text-gray-700 hover:text-insite-blue'
                      }`}
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                        location.pathname === item.href 
                          ? 'text-insite-blue' 
                          : 'text-gray-700 hover:text-insite-blue'
                      }`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.submenu && (
                    <div 
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-200 ${
                        openDropdown === index 
                          ? 'opacity-100 visible transform translate-y-0' 
                          : 'opacity-0 invisible transform -translate-y-2'
                      }`}
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          subItem.href.startsWith('/') ? (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-insite-blue hover:text-white transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ) : (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-insite-blue hover:text-white transition-colors duration-200"
                            >
                              {subItem.name}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button & User Menu & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              {/* User Menu for authenticated users */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-insite-blue transition-colors"
                  >
                    <img 
                      src={user?.avatar || "/assets/images/team-1.jpg"} 
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm">{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/blog/manage"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        {t('nav.manageBlog')}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  {/* Only show login when already authenticated or remove entirely */}
                </div>
              )}
              
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              <a
                href="#"
                className="hidden md:inline-flex btn-primary text-sm"
              >
                {t('header.bookingNow')}
              </a>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-insite-blue focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden fixed inset-0 top-[120px] z-50 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="px-4 py-6 overflow-y-auto h-full">
            {navigation.map((item, index) => (
              <div key={item.name} className="mb-4">
                {item.submenu ? (
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-insite-blue py-2"
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`block font-medium py-2 transition-colors duration-200 ${
                      location.pathname === item.href 
                        ? 'text-insite-blue' 
                        : 'text-gray-700 hover:text-insite-blue'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Mobile Dropdown */}
                {item.submenu && (
                  <div className={`mt-2 ml-4 space-y-2 transition-all duration-200 ${
                    openDropdown === index ? 'block' : 'hidden'
                  }`}>
                    {item.submenu.map((subItem) => (
                      subItem.href.startsWith('/') ? (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-sm text-gray-600 hover:text-insite-blue py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ) : (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-sm text-gray-600 hover:text-insite-blue py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA Button & Auth */}
            <div className="mt-8 space-y-4">
              {isAuthenticated ? (
                <div>
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={user?.avatar || "/assets/images/team-1.jpg"} 
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <Link
                    to="/blog/manage"
                    className="block w-full text-center py-3 border border-insite-blue text-insite-blue rounded-lg hover:bg-insite-blue hover:text-white transition-colors mb-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.manageBlog')}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors mb-3"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {/* No public login access */}
                </div>
              )}
              
              {/* Mobile Language Switcher */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <LanguageSwitcher variant="inline" />
              </div>
              
              <a
                href="#"
                className="btn-primary w-full text-center block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.bookingNow')}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>
    </>
  );
};

export default Header;