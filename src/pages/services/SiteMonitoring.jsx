import React from 'react';
import { Link } from 'react-router-dom';
import {
  Monitor,
  Activity,
  Bell,
  Server,
  Thermometer,
  Droplets,
  CheckCircle,
  ArrowRight,
  Zap,
  Clock,
  Shield,
  BarChart3
} from 'lucide-react';
import TestimonialSlider from '../../components/TestimonialSlider';

const SiteMonitoring = () => {
  const monitoringAreas = [
    {
      icon: Activity,
      title: 'Network Infrastructure',
      description:
        'Continuous monitoring of switches, routers, and access points. Automatic failover alerts ensure your clinical systems never go dark.',
    },
    {
      icon: Thermometer,
      title: 'Environmental Conditions',
      description:
        'Temperature, humidity, and air quality sensors protect medication storage, lab samples, and sensitive medical equipment from environmental damage.',
    },
    {
      icon: Server,
      title: 'Server & Application Health',
      description:
        'Real-time monitoring of EHR servers, imaging systems, and clinical applications with uptime SLA tracking and root-cause diagnostics.',
    },
    {
      icon: Droplets,
      title: 'Utility & Power Systems',
      description:
        'Monitor UPS status, generator readiness, and critical power circuits. Receive instant alerts before power failures impact patient care.',
    },
    {
      icon: Bell,
      title: 'Nurse Call & Patient Safety',
      description:
        'Integration with nurse call systems, duress alarms, and patient wander prevention to ensure full situational awareness.',
    },
    {
      icon: Zap,
      title: 'Medical Equipment Status',
      description:
        'Monitor device connectivity, battery levels, and operational status for life-critical equipment in ICU, OR, and emergency departments.',
    },
  ];

  const features = [
    '24/7 automated monitoring with no manual intervention',
    'Configurable alert thresholds for every sensor type',
    'Escalation workflows that route alerts to the right team',
    'Historical trending for compliance audit evidence',
    'Single dashboard across all campuses and buildings',
    'Integration with existing BMS and HVAC systems',
    'Mobile app push notifications for on-call staff',
    'Automated incident ticket creation in ITSM tools',
    'HIPAA-compliant data retention and audit logs',
    'Custom SLA reporting for executive dashboards',
  ];

  const steps = [
    {
      number: '01',
      title: 'Discovery & Scoping',
      description:
        'We map your physical infrastructure, identify critical monitoring points, and define alert thresholds based on clinical and operational requirements.',
    },
    {
      number: '02',
      title: 'Sensor Deployment',
      description:
        'Our certified technicians install and configure environmental sensors, network probes, and agent software with minimal disruption to operations.',
    },
    {
      number: '03',
      title: 'Alert Tuning',
      description:
        'We calibrate thresholds, escalation paths, and notification rules to eliminate alert fatigue while ensuring nothing critical is missed.',
    },
    {
      number: '04',
      title: 'Continuous Monitoring',
      description:
        '24/7 monitoring with monthly health reviews, threshold adjustments, and infrastructure expansion support as your facility grows.',
    },
  ];

  const stats = [
    { value: '99.95%', label: 'Average uptime achieved' },
    { value: '<30s', label: 'Alert response time' },
    { value: '60%', label: 'Fewer unplanned outages' },
    { value: '24/7', label: 'Active monitoring coverage' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Clarence Wesley',
      role: 'CEO-Founder, MediCare Plus',
      rating: 5,
      image: 'assets/images/testi1.png',
      testimonial:
        'InSite site monitoring caught a failing HVAC unit in our medication storage room at 2am. The alert reached our on-call team within seconds—we avoided a $200k medication loss.',
    },
    {
      id: 2,
      name: 'Bennett Harper',
      role: 'Operations Director, Regional Medical',
      rating: 5,
      image: 'assets/images/testi2.png',
      testimonial:
        'Before InSite, we found out about network outages when nurses called the help desk. Now we know about issues before clinical staff does—that\'s a completely different operational posture.',
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
              <span className="text-insite-cyan">Site Monitoring</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Site Monitoring &<br />Reliability
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Know what's happening across your entire facility—network, environment,
              power, and clinical systems—before problems impact patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-insite-orange hover:bg-insite-orange/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                Request a Site Assessment
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-white/90 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Monitor */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Coverage Areas
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Visibility Across Your Facility
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From environmental sensors in medication rooms to network probes on clinical
              systems, InSite monitors every critical element of your operational infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {monitoringAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-insite-blue/20 group"
                >
                  <div className="w-14 h-14 bg-insite-blue/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-insite-blue transition-colors duration-300">
                    <Icon className="h-7 w-7 text-insite-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="py-20 bg-insite-blue">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
                Platform Features
              </h2>
              <h3 className="text-4xl font-bold text-white mb-6">
                Proactive Monitoring That Keeps You Ahead of Failures
              </h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                InSite Site Monitoring gives your operations, IT, and facilities teams a
                single source of truth for the health of your entire physical and digital
                infrastructure.
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
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-insite-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alert Flow Visual */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Incident Response
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              From Detection to Resolution in Minutes
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                step: 'Detect',
                color: 'bg-blue-50 border-blue-200',
                iconColor: 'text-insite-blue',
                description: 'Sensors and probes detect an anomaly. InSite evaluates against configured thresholds and confirms an alert condition within 30 seconds.',
              },
              {
                icon: Bell,
                step: 'Notify',
                color: 'bg-orange-50 border-orange-200',
                iconColor: 'text-insite-orange',
                description: 'The right team member receives an alert via SMS, email, push notification, or automated phone call based on severity and escalation rules.',
              },
              {
                icon: Shield,
                step: 'Resolve',
                color: 'bg-green-50 border-green-200',
                iconColor: 'text-green-600',
                description: 'The incident is logged, remediation steps are documented, and root-cause analysis is appended for compliance and future prevention.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`rounded-xl p-8 border-2 ${item.color} text-center`}>
                  <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                    <Icon className={`h-8 w-8 ${item.iconColor}`} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{item.step}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deployment Steps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Getting Started
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              Full Coverage in 4 Phases
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
            Stop Finding Out About Problems After the Fact
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get complete site visibility and respond to issues before they reach your
            patients and clinical teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-insite-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Request a Site Assessment
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

export default SiteMonitoring;
