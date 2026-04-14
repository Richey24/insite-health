import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

const Solutions = () => {
  const { t } = useTranslation();
  const [solutionsRef, isVisible] = useScrollAnimation({ threshold: 0.2 });

  const solutions = [
    {
      id: 1,
      image: '/assets/images/solution-thumb-01.jpg',
      title: t('homepage.forNurses'),
      features: [
        t('homepage.forNursesFeature1'),
        t('homepage.forNursesFeature2'), 
        t('homepage.forNursesFeature3')
      ],
      delay: '0ms'
    },
    {
      id: 2,
      image: '/assets/images/solution-thumb-02.jpg',
      title: t('homepage.forFacilities'),
      features: [
        t('homepage.forFacilitiesFeature1'),
        t('homepage.forFacilitiesFeature2'),
        t('homepage.forFacilitiesFeature3')
      ],
      delay: '200ms'
    },
    {
      id: 3,
      image: '/assets/images/solution-thumb-03.jpg',
      title: t('homepage.forExecutives'),
      features: [
        t('homepage.forExecutivesFeature1'),
        t('homepage.forExecutivesFeature2'),
        t('homepage.forExecutivesFeature3')
      ],
      delay: '400ms'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('homepage.solutionsTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('homepage.solutionsDesc')}
          </p>
        </div>

        {/* Solutions Grid */}
        <div 
          ref={solutionsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className={`bg-white rounded-xl shadow-soft hover:shadow-strong transition-all duration-500 overflow-hidden group card-hover ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{
                animationDelay: isVisible ? solution.delay : '0ms'
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-insite-blue transition-colors duration-200">
                  {solution.title}
                </h3>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-insite-blue rounded-full mt-2" />
                      <span className="text-gray-600 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-insite-blue hover:text-insite-orange font-semibold transition-colors duration-200 group/btn"
                >
                  <span>{t('homepage.discoverMore')}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('homepage.readyToTransform')}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('homepage.readyToTransformDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="btn-primary text-center"
              >
                {t('homepage.scheduleDemo')}
              </a>
              <a
                href="#"
                className="btn-outline text-center"
              >
                {t('homepage.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;