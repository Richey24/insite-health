import { Clock, MapPin, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  const [featuresRef, isVisible] = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      id: 1,
      icon: Clock,
      title: t('homepage.howCanWeHelp'),
      description: t('homepage.howCanWeHelpDesc'),
      buttonText: t('homepage.explorePrograms'),
      buttonLink: '#services',
      delay: '0ms'
    },
    {
      id: 2,
      icon: MapPin,
      title: t('homepage.ourAddress'),
      description: t('homepage.address'),
      hasMap: true,
      delay: '200ms'
    },
    {
      id: 3,
      icon: FileText,
      title: t('homepage.stopSearching'),
      subtitle: t('homepage.startDelivering'),
      description: t('homepage.stopSearchingDesc'),
      buttonText: t('homepage.explorePrograms'),
      buttonLink: '#services',
      delay: '400ms'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div
                key={feature.id}
                className={`bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 p-6 card-hover ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{
                  animationDelay: isVisible ? feature.delay : '0ms'
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-insite-blue to-insite-cyan rounded-full flex items-center justify-center shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  
                  {feature.subtitle && (
                    <h4 className="text-xl font-bold text-insite-blue mb-4">
                      {feature.subtitle}
                    </h4>
                  )}

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Map for address feature */}
                  {feature.hasMap && (
                    <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                      <iframe
                        src="https://maps.google.com/maps?q=7710+Hazard+Center+Dr,+San+Diego,+CA+92108&t=m&z=15&output=embed&iwloc=near"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="InSite Health Systems Location"
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Action Button */}
                  {feature.buttonText && (
                    <a
                      href={feature.buttonLink}
                      className="inline-flex items-center justify-center space-x-2 text-insite-blue hover:text-white bg-transparent hover:bg-insite-blue border-2 border-insite-blue font-semibold py-3 px-6 rounded-lg transition-all duration-300 group"
                    >
                      <span>{feature.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pilot CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-insite-blue/5 border border-insite-blue/15 rounded-2xl px-8 py-6">
          <div>
            <p className="text-base font-semibold text-gray-900">
              Ready to see InSite in your facility?
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Set up a pilot in under a week — no long-term commitment required.
            </p>
          </div>
          <Link
            to="/pilot-setup"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-insite-blue text-white font-semibold text-sm rounded-lg hover:bg-insite-blue/90 transition-colors shadow-md hover:shadow-lg"
          >
            {t('common.startYourPilot')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;