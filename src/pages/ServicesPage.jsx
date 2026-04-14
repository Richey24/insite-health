import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Smartphone, 
  TrendingUp, 
  Monitor,
  CheckCircle,
  Clipboard,
  Star,
  Users,
  Share2,
  ExternalLink,
  Play
} from 'lucide-react';
import TestimonialSlider from '../components/TestimonialSlider';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Intelligent, Low-Impact Asset Tracking",
      description: "Real‑Time Equipment Visibility",
      features: ["Drive Business Process", "Eliminate Repeat Entry"],
      icon: Brain,
      link: "/services/asset-tracking"
    },
    {
      id: 2,
      title: "Mobile-First Secure Environment",
      description: "We provide all kind service management services",
      features: ["Drive Business Process", "Eliminate Repeat Entry"],
      icon: Smartphone,
      link: "/services/mobile-security"
    },
    {
      id: 3,
      title: "Better Capital Planning Visibility",
      description: "Reduced search time and improved asset utilization and loss prevention insights",
      features: ["Drive Business Process", "Eliminate Repeat Entry"],
      icon: TrendingUp,
      link: "/services/capital-planning"
    },
    {
      id: 4,
      title: "Site Monitoring and Reliability",
      description: "We provide InSite Locate service support",
      features: ["Drive Business Process", "Eliminate Repeat Entry"],
      icon: Monitor,
      link: "/services/site-monitoring"
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Nicolas Poran",
      role: "Delivery Manager",
      image: "assets/images/team-1.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 2,
      name: "Froster Collings",
      role: "CEO-Founder",
      image: "assets/images/team-2.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 3,
      name: "Kerry Anderson",
      role: "24/7 Support Lead",
      image: "assets/images/team-3.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    },
    {
      id: 4,
      name: "Richard Smith",
      role: "Technical Founder",
      image: "assets/images/team-4.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#"
      }
    }
  ];

  const workingProcess = [
    {
      step: "01",
      title: "Apply Online",
      description: "Complete our streamlined online application process to get started with InSite Health Systems."
    },
    {
      step: "02",
      title: "Submit Documents",
      description: "Upload required documentation securely through our HIPAA-compliant portal system."
    },
    {
      step: "03",
      title: "System Integration",
      description: "Our team integrates your existing systems with our advanced healthcare technology platform."
    },
    {
      step: "04",
      title: "Go Live Support",
      description: "Launch your new system with full support and training from our dedicated team."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Clarence Wesley",
      role: "CEO-Founder, MediCare Plus",
      rating: 5,
      image: "assets/images/testi1.png",
      testimonial: "InSite Health Systems transformed our healthcare operations. The real-time asset tracking has improved our efficiency by 40% and reduced equipment loss significantly."
    },
    {
      id: 2,
      name: "Bennett Harper",
      role: "Operations Director, Regional Medical",
      rating: 5,
      image: "assets/images/testi2.png",
      testimonial: "The mobile-first approach and secure environment provided by InSite has revolutionized how our staff accesses and manages patient information."
    },
    {
      id: 3,
      name: "Nicolas Poran",
      role: "IT Manager, City Hospital",
      rating: 5,
      image: "assets/images/testi3.png",
      testimonial: "Capital planning visibility has never been this clear. We can now make informed decisions about equipment investments with real data insights."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Section */}
      <div className="bg-gradient-to-r from-insite-blue to-insite-blue/90 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h1>
            <div className="flex items-center justify-center space-x-2 text-white/90">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-insite-cyan">Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Our Services
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why People Trust InSite Health Systems
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare technology solutions designed to streamline operations, 
              improve patient care, and enhance your organization's efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-insite-blue/20"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-insite-blue to-insite-blue/90 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-insite-blue transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={service.link}
                    className="inline-flex items-center text-insite-blue font-semibold hover:text-insite-blue/80 transition-colors group"
                  >
                    Learn More
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Team Members
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Expert Team
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-insite-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      <a 
                        href={member.social.facebook}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-insite-blue hover:bg-insite-blue hover:text-white transition-colors"
                      >
                        <Users className="h-4 w-4" />
                      </a>
                      <a 
                        href={member.social.twitter}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-insite-blue hover:bg-insite-blue hover:text-white transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </a>
                      <a 
                        href={member.social.instagram}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-insite-blue hover:bg-insite-blue hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <a 
                        href={member.social.youtube}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-insite-blue hover:bg-insite-blue hover:text-white transition-colors"
                      >
                        <Play className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-insite-blue font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Company Process
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Working Process
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workingProcess.map((process, index) => (
              <div 
                key={index}
                className="group text-center relative"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-insite-blue to-insite-blue/90 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Clipboard className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-insite-cyan rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {process.step}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-insite-blue transition-colors">
                  {process.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
                
                {/* Connect line for larger screens */}
                {index < workingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 w-2 h-2 bg-insite-blue rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Client Testimonials
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              What Our Clients Say
            </h3>
          </div>

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-insite-blue to-insite-blue/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare organizations that trust InSite Health Systems 
            for their technology and operational needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-insite-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Get Started Today
            </Link>
            <Link 
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-insite-blue transition-colors inline-flex items-center justify-center"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;