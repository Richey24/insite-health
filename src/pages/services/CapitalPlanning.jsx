import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Calendar,
  BarChart2,
  FileText,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Clock,
  Layers,
  Target
} from 'lucide-react';
import TestimonialSlider from '../../components/TestimonialSlider';

const CapitalPlanning = () => {
  const painPoints = [
    {
      icon: AlertCircle,
      title: 'Decisions Made Without Data',
      description:
        'Capital committees approve multi-million-dollar equipment purchases based on gut feel and spreadsheet estimates—not real utilization evidence.',
    },
    {
      icon: Clock,
      title: 'Equipment Replaced Too Early',
      description:
        'Without lifecycle data, facilities replace serviceable equipment prematurely, wasting capital that could fund clinical priorities.',
    },
    {
      icon: Layers,
      title: 'Invisible Under-Utilization',
      description:
        'Duplicate equipment hidden in storage rooms and rarely-used devices tied up in wrong departments go undetected without visibility.',
    },
    {
      icon: DollarSign,
      title: 'Unplanned Emergency Purchases',
      description:
        'Reactive procurement driven by last-minute shortages always costs more than planned purchasing cycles.',
    },
  ];

  const capabilities = [
    {
      icon: BarChart2,
      name: 'Utilization Analytics',
      description:
        'See exactly how often every asset is used, idle, in maintenance, or hoarded—segmented by department, shift, and asset class.',
    },
    {
      icon: TrendingUp,
      name: 'Lifecycle Tracking',
      description:
        'Monitor asset age, maintenance history, downtime frequency, and cost-per-use to predict optimal replacement timing.',
    },
    {
      icon: PieChart,
      name: 'Capital Budget Modeling',
      description:
        'Model replacement scenarios and new purchase requests with real data. Present defensible ROI projections to your CFO.',
    },
    {
      icon: Calendar,
      name: '5-Year Forecast Planning',
      description:
        'Forecast equipment end-of-life schedules, maintenance cost trends, and capital need timelines up to 5 years in advance.',
    },
    {
      icon: FileText,
      name: 'Board-Ready Reporting',
      description:
        'Generate executive dashboards and committee-ready reports that translate operational data into financial language.',
    },
    {
      icon: Target,
      name: 'Purchase Justification Engine',
      description:
        'Automatically generate data-backed purchase justifications that align with your facility\'s capital approval workflow.',
    },
  ];

  const outcomes = [
    { value: '22%', label: 'Average reduction in capital spend', icon: DollarSign },
    { value: '3x', label: 'More accurate 5-year forecasts', icon: Target },
    { value: '40%', label: 'Fewer emergency purchases', icon: AlertCircle },
    { value: '85%', label: 'Faster capital approval cycles', icon: Clock },
  ];

  const steps = [
    {
      number: '01',
      title: 'Asset Census',
      description:
        'We start with a complete inventory of your equipment portfolio—make, model, age, condition, location, and maintenance history.',
    },
    {
      number: '02',
      title: 'Utilization Baseline',
      description:
        'Deploy tracking to measure actual usage across your facility and build a 90-day utilization baseline for every asset class.',
    },
    {
      number: '03',
      title: 'Capital Analysis',
      description:
        'Our team analyzes utilization data alongside maintenance costs and lifecycle benchmarks to identify over-investment and gaps.',
    },
    {
      number: '04',
      title: 'Planning Dashboard',
      description:
        'Deliver a live capital planning dashboard and a 5-year replacement schedule your finance and clinical teams can act on.',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Nicolas Poran',
      role: 'IT Manager, City Hospital',
      rating: 5,
      image: 'assets/images/testi3.png',
      testimonial:
        'Capital planning visibility has never been this clear. We can now make informed decisions about equipment investments with real data insights and stopped over $600k in unnecessary purchases.',
    },
    {
      id: 2,
      name: 'Clarence Wesley',
      role: 'CFO, MediCare Plus',
      rating: 5,
      image: 'assets/images/testi1.png',
      testimonial:
        'For the first time our capital committee had objective data to support every purchase request. We cut review cycle time in half and improved budget accuracy by 30%.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Hero */}
      <div className="bg-gradient-to-r from-insite-blue to-insite-blue/85 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-white/80 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-insite-cyan">Capital Planning</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Better Capital Planning<br />Visibility
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Replace guesswork with utilization evidence. Make smarter equipment investment
              decisions that reduce capital spend while improving clinical availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-insite-orange hover:bg-insite-orange/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                Get a Capital Assessment
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-white/70 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Stats */}
      <div className="bg-insite-cyan">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-white/90 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pain Points */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              The Challenge
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Capital Decisions Shouldn't Be Based on Guesswork
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most healthcare capital committees are flying blind. Without utilization data,
              every purchase decision is a financial risk.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex gap-6 p-8 bg-orange-50/50 rounded-xl border border-orange-100 hover:border-insite-blue/30 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-insite-orange" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Platform Capabilities
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              From Raw Data to Capital Confidence
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-insite-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-insite-blue transition-colors duration-300">
                    <Icon className="h-6 w-6 text-insite-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{cap.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature List */}
      <section className="py-20 bg-insite-blue">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
                What's Included
              </h2>
              <h3 className="text-4xl font-bold text-white mb-6">
                Every Tool Your Capital Team Needs
              </h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                InSite Capital Planning gives finance, operations, and clinical leadership
                a shared view of equipment performance and investment needs.
              </p>
              <Link
                to="/contact"
                className="bg-insite-orange hover:bg-insite-orange/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                Schedule a Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Real-time utilization dashboards',
                'Department-level cost allocation',
                'Lifecycle & age reporting',
                '5-year forecast modeling',
                'Purchase justification templates',
                'CFO & board report exports',
                'Maintenance cost trending',
                'Vendor comparison tools',
                'Budget vs. actual tracking',
                'ERP & CMMS integration',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-insite-cyan flex-shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Our Approach
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              Data-Driven Capital Planning in 4 Steps
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group text-center relative">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-insite-blue to-insite-blue/80 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-insite-blue transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 z-0">
                    <div className="absolute right-0 w-2 h-2 bg-insite-blue rounded-full transform translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Client Results
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">What Our Clients Say</h3>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-insite-blue to-insite-blue/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Make Your Next Capital Cycle Your Best One
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Stop guessing and start planning with real utilization evidence behind every
            capital decision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-insite-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Request a Capital Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-insite-blue transition-colors inline-flex items-center justify-center"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapitalPlanning;
