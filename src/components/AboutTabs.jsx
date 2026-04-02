import { useState } from 'react';
import { CheckCircle, Target, Users, Heart } from 'lucide-react';

const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    {
      id: 'mission',
      label: 'Our Mission',
      icon: Target,
      title: 'Transforming Healthcare Technology',
      content: [
        'InSite Health System is dedicated to revolutionizing hospital operations through intelligent, real-time equipment visibility solutions.',
        'We provide cutting-edge technology that helps healthcare providers locate, track, and optimize their medical equipment usage.',
        'Our mission is to enhance patient care by ensuring critical equipment is always available when and where it\'s needed most.'
      ],
      features: [
        'Real-time asset tracking and monitoring',
        'Seamless integration with existing hospital systems',
        'Privacy-first approach to sensitive healthcare data',
        'Scalable solutions for hospitals of all sizes'
      ]
    },
    {
      id: 'vision',
      label: 'Our Vision',
      icon: CheckCircle,
      title: 'The Future of Smart Healthcare',
      content: [
        'We envision a healthcare ecosystem where technology seamlessly supports medical professionals in delivering exceptional patient care.',
        'Our vision extends beyond simple tracking to creating intelligent systems that predict equipment needs and optimize hospital workflows.',
        'We strive to be the global leader in healthcare technology solutions that prioritize both efficiency and patient safety.'
      ],
      features: [
        'Predictive analytics for equipment management',
        'AI-powered optimization recommendations',
        'Global network of connected healthcare facilities',
        'Sustainable and environmentally conscious technology'
      ]
    },
    {
      id: 'values',
      label: 'Our Values',
      icon: Heart,
      title: 'Built on Trust and Innovation',
      content: [
        'Patient safety and care quality are at the heart of everything we do.',
        'We believe in transparency, reliability, and the power of technology to transform healthcare for the better.',
        'Our commitment to privacy and security ensures that sensitive healthcare data is always protected.'
      ],
      features: [
        'Patient-first approach to all solutions',
        'Uncompromising commitment to data security',
        'Continuous innovation and improvement',
        'Collaborative partnership with healthcare professionals'
      ]
    },
    {
      id: 'team',
      label: 'Our Team',
      icon: Users,
      title: 'Healthcare Technology Experts',
      content: [
        'Our diverse team combines deep healthcare expertise with cutting-edge technology skills.',
        'We include former healthcare professionals, software engineers, data scientists, and industry veterans.',
        'Together, we bring decades of experience in both healthcare operations and technology innovation.'
      ],
      features: [
        'Former nurses and hospital administrators',
        'Expert software engineers and developers',
        'Data scientists and AI specialists',
        'Healthcare industry thought leaders'
      ]
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="section-padding bg-background-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About InSite Health System
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn more about our mission, vision, values, and the dedicated team behind 
            our innovative healthcare technology solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-soft">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-insite-blue text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {currentTab && (
            <div className="bg-white rounded-2xl shadow-medium overflow-hidden">
              <div className="lg:flex">
                {/* Content Side */}
                <div className="lg:w-2/3 p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-insite-blue/10 rounded-xl flex items-center justify-center">
                      <currentTab.icon className="text-insite-blue" size={24} />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                      {currentTab.title}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-8">
                    {currentTab.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      Key Highlights:
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {currentTab.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-insite-cyan flex-shrink-0 mt-0.5" size={18} />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="lg:w-1/3 relative">
                  <div className="h-64 lg:h-full bg-gradient-to-br from-insite-blue to-insite-cyan relative">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full"></div>
                      <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-8 left-4 w-32 h-32 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-4 left-8 w-20 h-20 border-2 border-white rounded-full"></div>
                    </div>
                    
                    {/* Icon Display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <currentTab.icon className="text-white" size={40} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: '500+', label: 'Healthcare Facilities' },
            { number: '50k+', label: 'Equipment Tracked' },
            { number: '99.9%', label: 'System Uptime' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-insite-blue mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTabs;