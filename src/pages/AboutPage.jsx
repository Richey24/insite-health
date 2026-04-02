import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, FileText, Users, CheckCircle, Award } from 'lucide-react';
import Modal from 'react-modal';

// Set app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const AboutPage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const processSteps = [
    {
      number: "01",
      title: "Apply Online",
      description: "Lorem ipsum dolor sit amet, ca adipisicing elit sed",
      icon: FileText
    },
    {
      number: "02", 
      title: "Submit Documents",
      description: "Lorem ipsum dolor sit amet, ca adipisicing elit sed",
      icon: FileText
    },
    {
      number: "03",
      title: "Checking File", 
      description: "Lorem ipsum dolor sit amet, ca adipisicing elit sed",
      icon: FileText
    },
    {
      number: "04",
      title: "Complete Check",
      description: "Lorem ipsum dolor sit amet, ca adipisicing elit sed",
      icon: CheckCircle
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Nicolas Poran",
      position: "Chief Medical Officer",
      image: "/assets/images/team-1.jpg",
      social: {
        facebook: "#",
        twitter: "#", 
        vimeo: "#",
        linkedin: "#"
      }
    },
    {
      name: "Dr. Sarah Johnson",
      position: "Head of Operations",
      image: "/assets/images/team-4.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        vimeo: "#", 
        linkedin: "#"
      }
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      image: "/assets/images/team-3.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        vimeo: "#",
        linkedin: "#"
      }
    },
    {
      name: "Emily Rodriguez",
      position: "VP of Customer Success",
      image: "/assets/images/team-2.jpg",
      social: {
        facebook: "#",
        twitter: "#",
        vimeo: "#",
        linkedin: "#"
      }
    }
  ];

  const testimonials = [
    {
      name: "Dr. Clarence Wesley",
      position: "CEO-Founder",
      image: "/assets/images/testi1.png",
      rating: 5,
      comment: "InSite Health System has revolutionized our equipment management. The real-time visibility has improved our operational efficiency significantly."
    },
    {
      name: "Bennett Harper",
      position: "24/7 Support Manager", 
      image: "/assets/images/testi2.png",
      rating: 5,
      comment: "The support team is exceptional. They understand healthcare workflows and provide solutions that actually work in real hospital environments."
    },
    {
      name: "Dr. Nicolas Poran",
      position: "Chief Medical Officer",
      image: "/assets/images/testi3.png", 
      rating: 5,
      comment: "Our staff can now focus more on patient care instead of searching for equipment. It's been a game-changer for our hospital operations."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-insite-blue mb-4">
              About
            </h1>
            <nav className="flex items-center justify-center space-x-2 text-sm sm:text-base text-gray-600">
              <Link to="/" className="hover:text-insite-blue transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900">About</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-insite-blue mb-4">
                  Why Choose Us
                </h2>
                <h3 className="text-xl sm:text-2xl text-gray-700 mb-6">
                  The Best Medical Health Solution
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  InSite Health System provides cutting-edge real-time equipment visibility solutions designed specifically for modern healthcare facilities. Our technology helps hospitals optimize their operations and improve patient care.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src="/assets/images/choose_thumb-i1.png" 
                      alt="Pleasant Experience"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Pleasant Experience
                    </h4>
                    <p className="text-gray-600">
                      Our user-friendly interface and intuitive design ensure that healthcare professionals can easily adopt and benefit from our technology without extensive training.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src="/assets/images/choose_thumb-i2.png" 
                      alt="World-Class Service"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      World-Class Service
                    </h4>
                    <p className="text-gray-600">
                      Our dedicated support team provides 24/7 assistance and works closely with healthcare facilities to ensure successful implementation and ongoing satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/assets/images/choose.jpg"
                  alt="Healthcare Technology"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-insite-blue/20 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="group flex items-center justify-center w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm"
                  >
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-insite-blue mb-4">
              COMPANY PROCESS
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
              Our Working Process
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative bg-white border-2 border-gray-100 rounded-lg p-6 sm:p-8 hover:border-insite-blue transition-all duration-300 hover:shadow-lg">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-insite-blue text-white text-sm font-bold rounded-full">
                        {step.number}
                      </span>
                    </div>
                    <div className="mt-4 mb-6">
                      <IconComponent className="w-12 h-12 text-insite-blue mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section Header */}
      <section className="section-padding bg-insite-blue">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Team Members
            </h2>
            <h3 className="text-xl sm:text-2xl text-insite-light-blue mb-6">
              We have quality complete expert<br />reviews in our company
            </h3>
            <p className="text-lg text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Our diverse team combines decades of healthcare experience with cutting-edge technology expertise to deliver solutions that truly understand your operational needs.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6 text-center">
                    <h5 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h5>
                    <span className="text-insite-blue font-medium">
                      {member.position}
                    </span>
                    
                    <div className="flex justify-center space-x-3 mt-4">
                      <a 
                        href={member.social.facebook}
                        className="w-8 h-8 bg-gray-100 hover:bg-insite-blue text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <span className="text-sm">f</span>
                      </a>
                      <a 
                        href={member.social.twitter}
                        className="w-8 h-8 bg-gray-100 hover:bg-insite-blue text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <span className="text-sm">𝕏</span>
                      </a>
                      <a 
                        href={member.social.vimeo}
                        className="w-8 h-8 bg-gray-100 hover:bg-insite-blue text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <span className="text-sm">V</span>
                      </a>
                      <a 
                        href={member.social.linkedin}
                        className="w-8 h-8 bg-gray-100 hover:bg-insite-blue text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <span className="text-sm">in</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center px-8 py-3 bg-insite-orange hover:bg-insite-orange/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Discover more →
            </a>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="section-padding bg-gradient-to-br from-insite-blue to-insite-blue/90">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-2 text-white">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                APP DOWNLOAD
              </h2>
              <h3 className="text-xl sm:text-2xl mb-8">
                We're Trusted by 1500+<br />Worldwide Clients
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-black hover:bg-black/80 text-white rounded-lg transition-all duration-300"
                >
                  <Play className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-black hover:bg-black/80 text-white rounded-lg transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group relative inline-flex items-center justify-center w-24 h-24 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-insite-blue mb-4">
              TESTIMONIAL
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
              Our Best Clients
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h6 className="text-xl font-semibold text-gray-900 mb-1">
                    {testimonial.name}
                  </h6>
                  <span className="text-insite-blue text-sm font-medium">
                    - {testimonial.position}
                  </span>
                  
                  <div className="flex justify-center mt-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-center italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onRequestClose={() => setIsVideoModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]">
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1"
              title="About InSite Health System"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AboutPage