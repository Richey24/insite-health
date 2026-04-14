import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Wifi,
  BarChart3,
  Shield,
  Clock,
  TrendingDown,
  CheckCircle,
  ArrowRight,
  Zap,
  Database,
  Eye,
  RefreshCw
} from 'lucide-react';
import TestimonialSlider from '../../components/TestimonialSlider';

const AssetTracking = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Reduce Equipment Search Time by 75%',
      description:
        'Staff spend an average of 45 minutes per shift searching for misplaced equipment. Our real-time location data eliminates that waste instantly.',
    },
    {
      icon: TrendingDown,
      title: 'Cut Equipment Loss & Theft',
      description:
        'Zone-level alerts and exit notifications immediately flag unauthorized equipment movement, dramatically reducing shrinkage across your facility.',
    },
    {
      icon: BarChart3,
      title: 'Optimize Utilization Rates',
      description:
        'Understand exactly how often each asset is used, when, and by which department—so you buy only what you need and redeploy what you have.',
    },
    {
      icon: Shield,
      title: 'HIPAA-Compliant by Design',
      description:
        'All location data is encrypted in transit and at rest. Role-based access controls ensure only authorized personnel can view sensitive asset locations.',
    },
  ];

  const techStack = [
    {
      icon: Wifi,
      name: 'BLE Beacons',
      description: 'Bluetooth Low Energy tags deliver continuous real-time location updates with a multi-year battery life.',
    },
    {
      icon: MapPin,
      name: 'RFID Infrastructure',
      description: 'Passive RFID readers installed at key chokepoints provide room-level accuracy without per-tag power requirements.',
    },
    {
      icon: Zap,
      name: 'UWB Precision',
      description: 'Ultra-wideband sensors deliver centimeter-level accuracy for high-value surgical and diagnostic equipment.',
    },
    {
      icon: Database,
      name: 'Wi-Fi Integration',
      description: 'Leverage your existing Wi-Fi infrastructure for approximate zone-level location with zero additional hardware.',
    },
    {
      icon: Eye,
      name: 'Live Dashboard',
      description: 'A single-pane-of-glass view of every tracked asset across all floors, wings, and campuses in real time.',
    },
    {
      icon: RefreshCw,
      name: 'EHR / CMMS Integration',
      description: 'Out-of-the-box connectors to Epic, Oracle Health, ServiceNow, and leading CMMS platforms.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Site Assessment',
      description:
        'Our engineers perform a wireless site survey and asset census to determine optimal tag technology, reader placement, and gateway density.',
    },
    {
      number: '02',
      title: 'Controlled Pilot',
      description:
        'We deploy on 20–40 assets across one unit or floor so you can validate ROI before committing to a full rollout.',
    },
    {
      number: '03',
      title: 'Full Deployment',
      description:
        'Phased facility-wide rollout with minimal disruption to clinical operations. Average time-to-live is under 8 weeks.',
    },
    {
      number: '04',
      title: 'Ongoing Optimization',
      description:
        'Quarterly utilization reviews, firmware updates, and continuous support from our dedicated healthcare operations team.',
    },
  ];

  const stats = [
    { value: '75%', label: 'Reduction in search time' },
    { value: '30%', label: 'Fewer equipment purchases' },
    { value: '18mo', label: 'Typical payback period' },
    { value: '500+', label: 'Healthcare facilities served' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Clarence Wesley',
      role: 'CEO-Founder, MediCare Plus',
      rating: 5,
      image: 'assets/images/testi1.png',
      testimonial:
        'InSite\'s asset tracking transformed our operations. Equipment search time dropped 74% in the first month and our staff morale improved noticeably.',
    },
    {
      id: 2,
      name: 'Bennett Harper',
      role: 'Operations Director, Regional Medical',
      rating: 5,
      image: 'assets/images/testi2.png',
      testimonial:
        'We eliminated over $400k in unnecessary equipment purchases in year one by understanding true utilization rates across our two campuses.',
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
              <span className="text-insite-cyan">Asset Tracking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Intelligent, Low-Impact<br />Asset Tracking
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Real-time equipment visibility that eliminates search time, reduces loss, and
              gives your clinical teams back the minutes that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-insite-orange hover:bg-insite-orange/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                Request a Free Pilot
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

      {/* Stats Bar */}
      <div className="bg-insite-cyan">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-white/90 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Why It Matters
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Business Case for Real-Time Visibility
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hospital staff lose 45 minutes per shift searching for misplaced equipment. At scale,
              that becomes millions of dollars in lost productivity—and avoidable patient care delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex gap-6 p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-insite-blue/20"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-insite-blue to-insite-blue/80 rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Technology Stack
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              The Right Technology for Every Facility
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-insite-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-insite-blue transition-colors duration-300">
                    <Icon className="h-6 w-6 text-insite-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Getting Started
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              From Pilot to Full Deployment
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

      {/* Feature List */}
      <section className="py-20 bg-insite-blue">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
                Platform Features
              </h2>
              <h3 className="text-4xl font-bold text-white mb-6">
                Everything You Need in One Platform
              </h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                InSite's asset tracking platform combines hardware, software, and professional
                services into a complete solution built specifically for healthcare environments.
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
                'Room-level location accuracy',
                'Automated utilization reports',
                'Predictive maintenance alerts',
                'Multi-campus support',
                'Mobile app for iOS & Android',
                'Custom zone & alert rules',
                'Capital planning dashboards',
                'API & EHR integrations',
                'Role-based access control',
                'HIPAA-compliant data storage',
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
            Ready to Eliminate Equipment Search Time?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500+ healthcare facilities using InSite to reclaim lost productivity and
            make smarter capital decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-insite-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Request Free Pilot
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

export default AssetTracking;
