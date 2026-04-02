import { useState } from 'react';
import Modal from 'react-modal';
import { 
  Play, 
  X, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp, 
  Award, 
  HeadphonesIcon
} from 'lucide-react';

// Set the app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const WhyChoose = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Privacy & Security First',
      description: 'HIPAA-compliant solutions with end-to-end encryption and robust security protocols.'
    },
    {
      icon: Clock,
      title: 'Real-Time Visibility',
      description: 'Instant equipment location and status updates across your entire healthcare facility.'
    },
    {
      icon: Users,
      title: 'Easy Integration',
      description: 'Seamless integration with existing hospital management systems and workflows.'
    },
    {
      icon: TrendingUp,
      title: 'Improved Efficiency',
      description: 'Reduce equipment search time by up to 80% and optimize utilization rates.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Trusted by 500+ healthcare facilities worldwide with measurable ROI.'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and customer success team availability.'
    }
  ];

  const stats = [
    { number: '80%', label: 'Reduction in Equipment Search Time' },
    { number: '95%', label: 'User Satisfaction Rate' },
    { number: '40%', label: 'Improvement in Equipment Utilization' },
    { number: '99.9%', label: 'System Uptime Guarantee' }
  ];

  return (
    <section className="section-padding bg-background-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Choose 
              <span className="text-insite-blue"> InSite Health System?</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our comprehensive equipment visibility platform is designed specifically for 
              healthcare environments, ensuring reliability, security, and ease of use that 
              medical professionals can trust.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-insite-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-insite-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="btn-primary inline-flex items-center justify-center"
              >
                Get Started Today
              </a>
              <a
                href="#demo"
                className="btn-outline inline-flex items-center justify-center"
              >
                Schedule Demo
              </a>
            </div>
          </div>

          {/* Right Side - Video Section */}
          <div className="relative">
            {/* Video Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden shadow-strong group cursor-pointer">
              <img
                src="/assets/images/video-bg.jpg"
                alt="InSite Health System Overview Video"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to gradient if image fails
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              {/* Fallback gradient */}
              <div 
                className="w-full h-80 bg-gradient-to-br from-insite-blue to-insite-cyan hidden"
                style={{ display: 'none' }}
              ></div>

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-insite-blue/40 group-hover:bg-insite-blue/50 transition-colors duration-300">
                <div className="flex items-center justify-center h-full">
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110"
                    aria-label="Play video"
                  >
                    <Play className="text-insite-blue ml-1" size={32} fill="currentColor" />
                  </button>
                </div>
              </div>

              {/* Video Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-insite-blue px-4 py-2 rounded-full text-sm font-semibold">
                2:30 Overview
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft text-center">
                  <div className="text-2xl md:text-3xl font-bold text-insite-blue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-medium p-8 lg:p-12">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-4xl text-insite-cyan mb-6">"</div>
              <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6">
                InSite Health System has transformed how we manage our medical equipment. 
                The real-time visibility and predictive analytics have significantly improved 
                our operational efficiency and patient care quality.
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img
                  src="/assets/images/testimonial-author.jpg"
                  alt="Dr. Amanda Clarke"
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to initials
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-16 h-16 bg-insite-blue text-white rounded-full items-center justify-center text-xl font-bold hidden">
                  AC
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Dr. Amanda Clarke</div>
                  <div className="text-gray-600">Chief Operations Officer</div>
                  <div className="text-insite-blue text-sm">Metro General Hospital</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoOpen}
        onRequestClose={() => setIsVideoOpen(false)}
        contentLabel="InSite Health System Overview Video"
        className="fixed inset-4 md:inset-8 lg:inset-16 bg-black rounded-2xl overflow-hidden outline-none"
        overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      >
        <div className="relative h-full flex flex-col">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 bg-black/20">
            <h3 className="text-white font-semibold">InSite Health System Overview</h3>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
          </div>

          {/* Video Container */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-4xl max-h-[600px]">
              {/* Replace with actual video when available */}
              <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Video Content Coming Soon</p>
                  <p className="text-gray-400">
                    InSite Health System Overview - Real-time Equipment Visibility Demo
                  </p>
                </div>
              </div>
              {/* Uncomment when video is available:
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="InSite Health System Overview"
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
              */}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default WhyChoose;