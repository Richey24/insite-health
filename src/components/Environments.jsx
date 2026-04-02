import { ArrowRight, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Environments = () => {
  const [environmentsRef, isVisible] = useScrollAnimation({ threshold: 0.2 });

  const environments = [
    'Acute Care Hospitals',
    'Emergency & Trauma Facilities', 
    'Specialty Hospitals',
    'Post‑Acute & Extended Care',
    'Outpatient & Ambulatory Care',
    'Diagnostic & Imaging Centers',
    'Government & Institutional Healthcare',
    'Multi‑Building Healthcare Campuses',
    'Mobile & Field Healthcare',
    'Private Healthcare Networks'
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div 
          ref={environmentsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Environments List */}
          <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-insite-blue/5 to-insite-cyan/5 rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Healthcare Environments We Serve
              </h2>
              
              <ul className="space-y-4 mb-8">
                {environments.map((environment, index) => (
                  <li 
                    key={index}
                    className={`flex items-center space-x-3 ${
                      isVisible ? 'animate-fadeInUp' : 'opacity-0'
                    }`}
                    style={{
                      animationDelay: isVisible ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    <CheckCircle className="w-5 h-5 text-insite-blue flex-shrink-0" />
                    <span className="text-gray-700 hover:text-insite-blue transition-colors duration-200 cursor-pointer">
                      {environment}
                    </span>
                  </li>
                ))}
              </ul>
              
              <a
                href="#"
                className="inline-flex items-center space-x-2 text-insite-blue hover:text-insite-orange font-semibold transition-colors duration-200 group"
              >
                <span>Discover more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="space-y-6">
              <div>
                <h3 className="text-insite-blue font-semibold text-lg mb-2">
                  Learn more
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  We are professional team, over 25 years of experience passionate about our work
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  At InSite Health Systems, we understand that every healthcare environment has unique 
                  operational challenges. Our real-time equipment visibility solutions are designed 
                  to adapt to the specific needs of your facility, whether you're running a large 
                  academic medical center or a specialized outpatient clinic.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Our team brings decades of combined experience in healthcare operations, 
                  technology implementation, and equipment management. We've worked with facilities 
                  of all sizes to improve operational efficiency and reduce the time staff spend 
                  searching for critical equipment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-insite-blue rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">HIPAA Compliant</h4>
                      <p className="text-sm text-gray-600">Secure & Private</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-insite-orange rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                      <p className="text-sm text-gray-600">Always Available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 btn-primary group"
                >
                  <span>Discover more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Environments;