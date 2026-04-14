import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Lock,
  ShieldCheck,
  Fingerprint,
  Wifi,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Key,
  Eye,
  AlertTriangle,
  Globe
} from 'lucide-react';
import TestimonialSlider from '../../components/TestimonialSlider';

const MobileSecurity = () => {
  const challenges = [
    {
      icon: AlertTriangle,
      title: 'Unmanaged Personal Devices',
      description:
        'Clinicians use personal smartphones and tablets to access patient data, creating uncontrolled endpoints outside your security perimeter.',
    },
    {
      icon: Wifi,
      title: 'Insecure Wi-Fi Access',
      description:
        'Open guest networks and legacy Wi-Fi infrastructure expose sensitive EHR traffic to interception and man-in-the-middle attacks.',
    },
    {
      icon: Key,
      title: 'Shared Credentials',
      description:
        'Shared logins on workstations-on-wheels and shared tablets make individual accountability nearly impossible to enforce.',
    },
    {
      icon: Eye,
      title: 'Visibility Gaps',
      description:
        'No unified view of which devices are accessing which systems means threats can go undetected for days or weeks.',
    },
  ];

  const capabilities = [
    {
      icon: Fingerprint,
      name: 'Zero-Trust Authentication',
      description:
        'Every device, every user, every access request is verified—regardless of network location. MFA and biometric options included.',
    },
    {
      icon: ShieldCheck,
      name: 'Mobile Device Management',
      description:
        'Centrally manage, configure, and remotely wipe any enrolled device. Policy enforcement applies to both corporate-owned and BYOD endpoints.',
    },
    {
      icon: Lock,
      name: 'Encrypted Communications',
      description:
        'AES-256 encryption for all data in transit and at rest. Secure container apps isolate clinical data from personal app content.',
    },
    {
      icon: Globe,
      name: 'Network Access Control',
      description:
        'Segment clinical devices onto dedicated VLANs, enforce device compliance checks at connection, and block non-compliant endpoints automatically.',
    },
    {
      icon: RefreshCw,
      name: 'Automated Patch Management',
      description:
        'Continuously monitor device OS and app versions. Push critical security patches automatically during off-peak hours.',
    },
    {
      icon: Eye,
      name: 'Real-Time Threat Detection',
      description:
        'AI-driven anomaly detection flags unusual access patterns, data exfiltration attempts, and jailbroken or rooted devices instantly.',
    },
  ];

  const complianceItems = [
    'HIPAA Security Rule alignment',
    'HITECH Act compliance support',
    'SOC 2 Type II compatible',
    'ISO 27001 framework aligned',
    'NIST Cybersecurity Framework',
    'Joint Commission IT standards',
    'CMS Conditions of Participation',
    'State privacy law readiness',
  ];

  const steps = [
    {
      number: '01',
      title: 'Security Assessment',
      description:
        'We audit your current mobile environment—device inventory, network topology, existing policies—to identify gaps and risk areas.',
    },
    {
      number: '02',
      title: 'Policy Design',
      description:
        'Our team architects a mobile security policy tailored to your workflows, device mix, and compliance obligations.',
    },
    {
      number: '03',
      title: 'Phased Rollout',
      description:
        'Enroll devices department by department, minimizing clinical disruption while maintaining continuous visibility throughout.',
    },
    {
      number: '04',
      title: 'Monitor & Respond',
      description:
        '24/7 monitoring dashboard, automated alerts, and incident response playbooks keep your environment secure after go-live.',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Bennett Harper',
      role: 'Operations Director, Regional Medical',
      rating: 5,
      image: 'assets/images/testi2.png',
      testimonial:
        'InSite\'s mobile security solution gave us full visibility into every device touching our clinical systems. We passed our HIPAA audit with zero findings for the first time.',
    },
    {
      id: 2,
      name: 'Nicolas Poran',
      role: 'IT Manager, City Hospital',
      rating: 5,
      image: 'assets/images/testi3.png',
      testimonial:
        'Onboarding new staff devices went from a 45-minute manual process to under 5 minutes with InSite MDM. The ROI was immediate.',
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
              <span className="text-insite-cyan">Mobile Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Mobile-First Secure<br />Environment
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Protect every device, every user, and every data access point across your
              facility—without slowing down the care your teams deliver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-insite-orange hover:bg-insite-orange/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                Schedule a Security Review
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
            {[
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '<5min', label: 'Device onboarding' },
              { value: '100%', label: 'HIPAA alignment' },
              { value: '24/7', label: 'Threat monitoring' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-white/90 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              The Problem
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Healthcare Mobility Creates Unique Security Risks
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mobile devices are now integral to care delivery—but they also represent the
              fastest-growing attack surface in the modern healthcare facility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex gap-6 p-8 bg-red-50/50 rounded-xl border border-red-100 hover:border-insite-blue/30 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-red-500" />
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
              Our Solution
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              Comprehensive Mobile Security Platform
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

      {/* Compliance Strip */}
      <section className="py-20 bg-insite-blue">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
                Compliance Ready
              </h2>
              <h3 className="text-4xl font-bold text-white mb-6">
                Built for Healthcare Regulatory Requirements
              </h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Every feature in our mobile security platform is designed with healthcare
                compliance frameworks in mind—from HIPAA to HITECH to Joint Commission standards.
              </p>
              <Link
                to="/contact"
                className="bg-insite-orange hover:bg-insite-orange/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                Talk to a Compliance Expert
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {complianceItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-insite-cyan flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Steps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-insite-cyan mb-3 tracking-wide uppercase">
              Our Process
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
              Secure Your Environment in 4 Steps
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
            Ready to Secure Your Mobile Environment?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let our healthcare security experts assess your current posture and design a
            zero-trust strategy tailored to your facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-insite-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get a Free Assessment
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

export default MobileSecurity;
