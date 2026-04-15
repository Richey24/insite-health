import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Stethoscope, Settings, TrendingUp, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { appointmentSchema, contactSchema } from '../utils/formValidation';
import { submitAppointment, submitContact } from '../utils/api';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formType, setFormType] = useState('appointment');
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);

  // Compute min date dynamically (today)
  const today = new Date().toISOString().split('T')[0];
  
  const {
    register: registerAppointment,
    handleSubmit: handleSubmitAppointment,
    reset: resetAppointment,
    formState: { errors: appointmentErrors, isSubmitting: isSubmittingAppointment }
  } = useForm({
    resolver: yupResolver(appointmentSchema)
  });

  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    reset: resetContact,
    formState: { errors: contactErrors, isSubmitting: isSubmittingContact }
  } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmitAppointment = async (data) => {
    try {
      setAppointmentStatus('loading');
      await submitAppointment(data);
      setAppointmentStatus('success');
      resetAppointment();
      setTimeout(() => setAppointmentStatus(null), 5000);
    } catch {
      setAppointmentStatus('error');
      setTimeout(() => setAppointmentStatus(null), 5000);
    }
  };

  const onSubmitContact = async (data) => {
    try {
      setContactStatus('loading');
      await submitContact(data);
      setContactStatus('success');
      resetContact();
      setTimeout(() => setContactStatus(null), 5000);
    } catch {
      setContactStatus('error');
      setTimeout(() => setContactStatus(null), 5000);
    }
  };

  const processSteps = [
    {
      number: "01",
      title: t('about.pilotStep1Title'),
      description: t('about.pilotStep1Desc'),
      icon: FileText
    },
    {
      number: "02", 
      title: t('about.pilotStep2Title'),
      description: t('about.pilotStep2Desc'),
      icon: Settings
    },
    {
      number: "03",
      title: t('about.pilotStep3Title'),
      description: t('about.pilotStep3Desc'),
      icon: Stethoscope
    },
    {
      number: "04",
      title: t('about.pilotStep4Title'),
      description: t('about.pilotStep4Desc'),
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
              {t('contact.pageTitle')}
            </h1>
            <nav className="flex items-center justify-center space-x-2 text-sm sm:text-base text-gray-600">
              <Link to="/" className="hover:text-insite-blue transition-colors">{t('contact.breadcrumbHome')}</Link>
              <span>/</span>
              <span className="text-gray-900">{t('contact.pageTitle')}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* InSite Health Systems Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-insite-blue mb-4">
              {t('contact.processTitle')}
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
              {t('contact.processSubtitle')}
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
              {t('contact.getInTouch')}
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
              {t('contact.freePilot')}
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
                        placeholder={t('contact.namePlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('name')}
                      />
                      {appointmentErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{appointmentErrors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('patientType')}
                      >
                        <option value="">{t('contact.selectPatient')}</option>
                        <option value="new">{t('contact.newPatient')}</option>
                        <option value="existing">{t('contact.existingPatient')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('email')}
                      />
                      {appointmentErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{appointmentErrors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder={t('contact.phonePlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('phone')}
                      />
                      {appointmentErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{appointmentErrors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        {...registerAppointment('appointmentType')}
                      >
                        <option value="">{t('contact.selectService')}</option>
                        <option value="Asset Tracking">{t('contact.services.assetTracking')}</option>
                        <option value="Site Monitoring">{t('contact.services.siteMonitoring')}</option>
                        <option value="Capital Planning">{t('contact.services.capitalPlanning')}</option>
                        <option value="Mobile Security">{t('contact.services.mobileSecurity')}</option>
                        <option value="Pilot Consultation">{t('contact.services.pilotConsultation')}</option>
                      </select>
                      {appointmentErrors.appointmentType && (
                        <p className="text-red-500 text-sm mt-1">{appointmentErrors.appointmentType.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                        min={today}
                        {...registerAppointment('preferredDate')}
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder={t('contact.commentPlaceholder')}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                      {...registerAppointment('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingAppointment || appointmentStatus === 'loading'}
                    className="w-full bg-insite-orange hover:bg-insite-orange/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingAppointment || appointmentStatus === 'loading'
                      ? t('contact.sending')
                      : t('contact.sendRequest')}
                  </button>
                  {appointmentStatus === 'success' && (
                    <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <p className="text-green-700 text-sm">{t('contact.successMsg')}</p>
                    </div>
                  )}
                  {appointmentStatus === 'error' && (
                    <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{t('contact.errorMsg')}</p>
                    </div>
                  )}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.infoPhone')}</h3>
              <p className="text-gray-600">
                (858) 366-3838
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-insite-blue/10 rounded-full mb-4">
                <Mail className="w-8 h-8 text-insite-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.infoEmail')}</h3>
              <p className="text-gray-600">
                info@insitehealthsystems.com
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-insite-blue/10 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-insite-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.infoAddress')}</h3>
              <p className="text-gray-600">
                2287 Dunlop St.<br />
                San Diego, CA 92111
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-insite-blue/10 rounded-full mb-4">
                <Clock className="w-8 h-8 text-insite-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.infoHours')}</h3>
              <p className="text-gray-600">
                {t('contact.contactDetails.businessHours')}<br />
                {t('contact.contactDetails.emergencySupport')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
