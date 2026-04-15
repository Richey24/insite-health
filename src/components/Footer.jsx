import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { newsletterSchema } from '../utils/formValidation';
import { submitNewsletter } from '../utils/api';

const Footer = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(newsletterSchema)
  });

  const onSubmitNewsletter = async (data) => {
    try {
      setSubmitStatus('loading');
      await submitNewsletter(data);
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const footerSections = {
    solutions: {
      title: 'Solutions',
      links: [
        { name: 'For Nurses', href: '#' },
        { name: 'For Facilities Management', href: '#' },
        { name: 'For Executives', href: '#' },
        { name: 'Equipment Tracking', href: '#' },
        { name: 'Real-time Visibility', href: '#' },
        { name: 'Analytics Dashboard', href: '#' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Case Studies', href: '#' },
        { name: 'White Papers', href: '#' },
        { name: 'Blog', href: '/blog', internal: true },
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Integration Guides', href: '#' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Support', href: '/contact', internal: true },
        { name: 'System Status', href: '#' },
        { name: 'Training', href: '#' },
        { name: 'Implementation', href: '#' },
        { name: 'Community Forum', href: '#' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', internal: true },
        { name: 'Our Team', href: '/team', internal: true },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Investors', href: '#' }
      ]
    }
  };

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'HIPAA Compliance', href: '#' },
    { name: 'Security', href: '#' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-insite-blue">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Connected with Healthcare Innovation
              </h3>
              <p className="text-blue-100 text-lg">
                Get the latest updates on healthcare technology trends, product announcements, 
                and industry insights delivered to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmitNewsletter)} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-transparent rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="px-8 py-3 bg-insite-orange hover:bg-insite-orange/90 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {submitStatus === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-300">
                    <CheckCircle size={16} />
                    <span className="text-sm">Successfully subscribed! Check your email for confirmation.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-300">
                    <AlertCircle size={16} />
                    <span className="text-sm">Error subscribing. Please try again.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">
                InSite Health System
              </h3>
              <p className="text-gray-300 mt-2">
                Real-time Equipment Visibility for Modern Hospitals
              </p>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-6">
              Transforming healthcare operations through intelligent equipment tracking 
              and visibility solutions. Trusted by 500+ healthcare facilities worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="text-insite-cyan flex-shrink-0" size={18} />
                <span className="text-gray-300">
                  2287 Dunlop St. San Diego, CA 92111
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-insite-cyan flex-shrink-0" size={18} />
                <a href="tel:+18583663838" className="text-gray-300 hover:text-insite-cyan transition-colors">(858) 366-3838</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-insite-cyan flex-shrink-0" size={18} />
                <a href="mailto:info@insitehealthsystems.com" className="text-gray-300 hover:text-insite-cyan transition-colors">info@insitehealthsystems.com</a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-lg font-semibold text-white mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-insite-cyan transition-colors duration-200 flex items-center gap-2 group"
                      >
                        {link.name}
                        <ExternalLink 
                          size={14} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                        />
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-insite-cyan transition-colors duration-200 flex items-center gap-2 group"
                      >
                        {link.name}
                        <ExternalLink 
                          size={14} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                        />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications and Awards */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              Certifications & Compliance
            </h4>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                'HIPAA Compliant',
                'SOC 2 Type II',
                'ISO 27001',
                'Healthcare Innovation Award 2023'
              ].map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <CheckCircle className="text-insite-cyan" size={24} />
                  </div>
                  <span className="text-sm text-gray-400">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} InSite Health System. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-insite-cyan transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-insite-blue hover:bg-insite-cyan text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Back to top"
      >
        <ArrowRight className="transform -rotate-90 mx-auto" size={20} />
      </button>
    </footer>
  );
};

export default Footer;