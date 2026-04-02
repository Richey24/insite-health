import { 
  Building2, 
  Activity, 
  Users, 
  Award,
  TrendingUp,
  Shield
} from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      icon: Building2,
      number: '500+',
      label: 'Healthcare Facilities',
      description: 'Hospitals and clinics trust our solutions',
      color: 'text-insite-blue'
    },
    {
      icon: Activity,
      number: '50k+',
      label: 'Equipment Tracked',
      description: 'Medical devices monitored in real-time',
      color: 'text-insite-cyan'
    },
    {
      icon: Users,
      number: '25k+',
      label: 'Healthcare Professionals',
      description: 'Medical staff using our platform daily',
      color: 'text-insite-orange'
    },
    {
      icon: Award,
      number: '99.9%',
      label: 'System Uptime',
      description: 'Reliable performance you can count on',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      number: '80%',
      label: 'Time Saved',
      description: 'Reduction in equipment search time',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      number: '100%',
      label: 'HIPAA Compliant',
      description: 'Full compliance with healthcare regulations',
      color: 'text-red-500'
    }
  ];

  return (
    <section className="section-padding bg-insite-blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border border-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute top-1/4 right-0 w-48 h-48 border border-white rounded-full translate-x-24"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 border border-white rounded-full translate-y-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-white rounded-full"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Healthcare Leaders Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our platform delivers measurable results and has earned the trust of 
            healthcare professionals across the globe.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div
                key={index}
                className="text-center group"
              >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <IconComponent className="text-white" size={32} />
                </div>

                {/* Number */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-insite-cyan">
                    {stat.number}
                  </span>
                </div>

                {/* Label & Description */}
                <h3 className="text-xl font-semibold mb-2">
                  {stat.label}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-insite-cyan/20 rounded-2xl flex items-center justify-center">
              <Award className="text-insite-cyan" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Industry Recognition</h3>
            <p className="text-blue-100 text-sm">
              Winner of Healthcare Innovation Award 2023
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-insite-orange/20 rounded-2xl flex items-center justify-center">
              <Shield className="text-insite-orange" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Security Certified</h3>
            <p className="text-blue-100 text-sm">
              SOC 2 Type II and HIPAA compliant platform
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-400/20 rounded-2xl flex items-center justify-center">
              <TrendingUp className="text-green-400" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Proven ROI</h3>
            <p className="text-blue-100 text-sm">
              Average 300% return on investment within 12 months
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Discover how InSite Health System can transform your healthcare facility's 
              equipment management and improve patient care outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-insite-blue bg-white hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-insite-blue rounded-lg transition-all duration-300"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;