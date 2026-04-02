import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Stethoscope, Settings, TrendingUp, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema, contactSchema } from '../utils/formValidation';

const ContactPage = () => {
  const [formType, setFormType] = useState('appointment');
  
  const {
    register: registerAppointment,
    handleSubmit: handleSubmitAppointment,
    formState: { errors: appointmentErrors, isSubmitting: isSubmittingAppointment }
  } = useForm({
    resolver: yupResolver(appointmentSchema)
  });

  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: contactErrors, isSubmitting: isSubmittingContact }
  } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmitAppointment = async (data) => {
    console.log('Appointment form submitted:', data);
    // API call would go here
  };

  const onSubmitContact = async (data) => {
    console.log('Contact form submitted:', data);
    // API call would go here
  };

  const processSteps = [
    {
      number: "01",
      title: "Discover",
      description: "We begin with a focused conversation to understand: Your facility size and structure, Equipment categories to evaluate, Operational pain points, IT and compliance requirements",
      icon: FileText
    },
    {
      number: "02", 
      title: "Deploy",
      description: "We design a controlled pilot program: Select 20–40 assets, Identify one unit or floor, Install secure gateways, Configure role-based access, Provide brief staff orientation",
      icon: Settings
    },
    {
      number: "03",
      title: "Validate", 
      description: "During the pilot period: Real-time equipment visibility is active, Gateway and system health are monitored, Utilization data is collected, Workflow impact is measured",
      icon: Stethoscope
    },
    {
      number: "04",
      title: "Scale",
      description: "At pilot conclusion: Review utilization metrics, Evaluate search time reduction, Identify capital optimization opportunities, Determine next-phase rollout strategy",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-insite-blue mb-4">
              Contact
            </h1>
            <nav className="flex items-center justify-center space-x-2 text-sm sm:text-base text-gray-600">
              <Link to="/" className="hover:text-insite-blue transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900">Contact</span>
            </nav>
          </div>
        </div>
      </div>

      {/* InSite Health Systems Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-insite-blue mb-4">
              INSITE HEALTH SYSTEMS PROCESS
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
              Our Pilot Process
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative bg-white border-2 border-gray-100 rounded-lg p-6 sm:p-8 hover:border-insite-blue transition-all duration-300 hover:shadow-lg">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-insite-blue text-white text-sm font-bold rounded-full">
                        {step.number}
                      </span>
                    </div>
                    <div className="mt-4 mb-6">
                      <IconComponent className="w-12 h-12 text-insite-blue mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-insite-blue mb-4">
              GET IN TOUCH
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
              Get Free Pilot Consultation?
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12">
            {/* Contact Image */}
            <div className="lg:col-span-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/assets/images/choose.jpg"
                  alt="Healthcare consultation"
                  className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-insite-blue/20 to-transparent" />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <form onSubmit={handleSubmitAppointment(onSubmitAppointment)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Name*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('name')}
                      />
                      {appointmentErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{appointmentErrors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('patientType')}
                      >
                        <option value="">Select Patient*</option>
                        <option value="new">New Patient</option>
                        <option value="existing">Existing Patient</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email or Phone*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('email')}
                      />
                      {appointmentErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{appointmentErrors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('preferredDate')}
                      >
                        <option value="">Select Date*</option>
                        <option value="2026-04-25">25 April 2026</option>
                        <option value="2026-04-26">26 April 2026</option>
                        <option value="2026-04-27">27 April 2026</option>
                        <option value="2026-04-28">28 April 2026</option>
                        <option value="2026-04-29">29 April 2026</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('gender')}
                      >
                        <option value="">Select Gender*</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('department')}
                      >
                        <option value="">Select Department*</option>
                        <option value="diagnosis">Diagnosis</option>
                        <option value="neurology">Neurology</option>
                        <option value="pregnancy">Pregnancy</option>
                        <option value="cardiology">Cardiology</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Your Comment..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                      {...registerAppointment('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingAppointment}
                    className="w-full bg-insite-orange hover:bg-insite-orange/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingAppointment ? 'Sending...' : 'Send Request'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="container-custom">
          <div className="w-full h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=7710+Hazard+Center+Dr,+San+Diego,+CA+92108&t=m&z=15&output=embed&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="InSite Health Systems Location"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-insite-blue/10 rounded-full mb-4">
                <Phone className="w-8 h-8 text-insite-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">
                Sales: (555) 123-4567<br />
                Support: (555) 123-4568
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-insite-blue/10 rounded-full mb-4">
                <Mail className="w-8 h-8 text-insite-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                sales@insitehealth.com<br />
                support@insitehealth.com
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-insite-blue/10 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-insite-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">
                7710 Hazard Center Dr # E<br />
                California 92108 United States
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-insite-blue/10 rounded-full mb-4">
                <Clock className="w-8 h-8 text-insite-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 8:00 AM - 6:00 PM PST<br />
                24/7 Emergency Support Available
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage