import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Solutions = () => {
  const [solutionsRef, isVisible] = useScrollAnimation({ threshold: 0.2 });

  const solutions = [
    {
      id: 1,
      image: '/assets/images/solution-thumb-01.jpg',
      title: 'For Nurses',
      features: [
        'Quickly find nearby equipment local',
        'Quickly view equipment last‑seen local', 
        'No extra documentation burden'
      ],
      delay: '0ms'
    },
    {
      id: 2,
      image: '/assets/images/solution-thumb-02.jpg',
      title: 'For Facilities & Operations',
      features: [
        'Identify idle or missing equipment',
        'Monitor equipment movement history',
        'Improve cleaning & use workflows'
      ],
      delay: '200ms'
    },
    {
      id: 3,
      image: '/assets/images/solution-thumb-03.jpg',
      title: 'For Executives',
      features: [
        'View equipment utilization trends',
        'Identify excessive inventory',
        'Make data‑driven capital decisions'
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
            Healthcare Solutions for Everyone
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive equipment tracking solutions are designed to serve the unique needs 
            of different healthcare professionals and departments.
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
                  <span>Discover more</span>
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
              Ready to Transform Your Healthcare Operations?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of healthcare facilities that have improved their equipment 
              visibility and operational efficiency with InSite Health Systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="btn-primary text-center"
              >
                Schedule a Demo
              </a>
              <a
                href="#"
                className="btn-outline text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;