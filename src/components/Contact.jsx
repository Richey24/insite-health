import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { appointmentSchema, contactSchema } from '../utils/formValidation';
import { submitAppointment, submitContact } from '../utils/api';

const Contact = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('appointment');
  const [submitStatus, setSubmitStatus] = useState(null);

  // Appointment form
  const appointmentForm = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      organization: '',
      appointmentType: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    }
  });

  // Contact form
  const contactForm = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmitAppointment = async (data) => {
    try {
      setSubmitStatus('loading');
      await submitAppointment(data);
      setSubmitStatus('success');
      appointmentForm.reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const onSubmitContact = async (data) => {
    try {
      setSubmitStatus('loading');
      await submitContact(data);
      setSubmitStatus('success');
      contactForm.reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const appointmentTypes = [
    t('contact.appointmentTypes.productDemo', 'Product Demo'),
    t('contact.appointmentTypes.consultation', 'Consultation'),
    t('contact.appointmentTypes.implementationPlanning', 'Implementation Planning'),
    t('contact.appointmentTypes.technicalSupport', 'Technical Support'),
    t('contact.appointmentTypes.partnershipDiscussion', 'Partnership Discussion'),
    t('contact.appointmentTypes.other', 'Other')
  ];

  const timeSlots = [
    t('contact.timeSlots.9am', '9:00 AM - 10:00 AM'),
    t('contact.timeSlots.10am', '10:00 AM - 11:00 AM'),
    t('contact.timeSlots.11am', '11:00 AM - 12:00 PM'),
    t('contact.timeSlots.1pm', '1:00 PM - 2:00 PM'),
    t('contact.timeSlots.2pm', '2:00 PM - 3:00 PM'),
    t('contact.timeSlots.3pm', '3:00 PM - 4:00 PM'),
    t('contact.timeSlots.4pm', '4:00 PM - 5:00 PM')
  ];

  return (
    <section id="contact" className="section-padding bg-background-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('contact.title', 'Get in Touch with InSite Health System')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle', 'Ready to transform your healthcare facility\'s equipment management? Contact our experts to schedule a demo or learn more about our solutions.')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {t('contact.contactInformation', 'Contact Information')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-insite-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-insite-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.address', 'Address')}</h4>
                    <p className="text-gray-600 whitespace-pre-line">
                      {t('contact.contactDetails.addressFull', '2287 Dunlop St.\nSan Diego, CA 92111')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-insite-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-insite-cyan" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.phone', 'Phone')}</h4>
                    <p className="text-gray-600">
                      {t('contact.contactDetails.salesPhone', 'Phone: (858) 366-3838')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-insite-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-insite-orange" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.email', 'Email')}</h4>
                    <p className="text-gray-600">
                      {t('contact.contactDetails.email', 'info@insitehealthsystems.com')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{t('contact.businessHours', 'Business Hours')}</h4>
                    <p className="text-gray-600">
                      {t('contact.contactDetails.businessHours', 'Monday - Friday: 8:00 AM - 6:00 PM PST')}<br />
                      {t('contact.contactDetails.emergencySupport', '24/7 Emergency Support Available')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-insite-blue">{t('contact.quickStats.responseTime', '<1hr')}</div>
                    <div className="text-sm text-gray-600">{t('contact.quickStats.responseTimeLabel', 'Response Time')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-insite-cyan">{t('contact.quickStats.support247', '24/7')}</div>
                    <div className="text-sm text-gray-600">{t('contact.quickStats.supportLabel', 'Support Available')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('appointment')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                    activeTab === 'appointment'
                      ? 'bg-insite-blue text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t('contact.scheduleAppointment', 'Schedule Appointment')}
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                    activeTab === 'contact'
                      ? 'bg-insite-blue text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t('contact.generalContact', 'General Contact')}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Appointment Form */}
                {activeTab === 'appointment' && (
                  <form onSubmit={appointmentForm.handleSubmit(onSubmitAppointment)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">{t('contact.fullName', 'Full Name')} {t('contact.required', '*')}</label>
                        <input
                          {...appointmentForm.register('name')}
                          className="form-input"
                          placeholder={t('contact.placeholders.fullName', 'Enter your full name')}
                        />
                        {appointmentForm.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">{t('contact.emailAddress', 'Email Address')} {t('contact.required', '*')}</label>
                        <input
                          {...appointmentForm.register('email')}
                          type="email"
                          className="form-input"
                          placeholder={t('contact.placeholders.email', 'Enter your email')}
                        />
                        {appointmentForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">{t('contact.phoneNumber')} {t('contact.required')}</label>
                        <input
                          {...appointmentForm.register('phone')}
                          type="tel"
                          className="form-input"
                          placeholder={t('contact.placeholders.phone')}
                        />
                        {appointmentForm.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">{t('contact.organization')}</label>
                        <input
                          {...appointmentForm.register('organization')}
                          className="form-input"
                          placeholder={t('contact.placeholders.organization')}
                        />
                      </div>

                      <div>
                        <label className="form-label">{t('contact.appointmentType')} {t('contact.required')}</label>
                        <select {...appointmentForm.register('appointmentType')} className="form-input">
                          <option value="">{t('contact.placeholders.appointmentType')}</option>
                          {appointmentTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {appointmentForm.formState.errors.appointmentType && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.appointmentType.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">{t('contact.preferredDate')} {t('contact.required')}</label>
                        <input
                          {...appointmentForm.register('preferredDate')}
                          type="date"
                          className="form-input"
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {appointmentForm.formState.errors.preferredDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.preferredDate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">{t('contact.preferredTime')} {t('contact.required')}</label>
                      <select {...appointmentForm.register('preferredTime')} className="form-input">
                        <option value="">{t('contact.placeholders.preferredTime')}</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {appointmentForm.formState.errors.preferredTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {appointmentForm.formState.errors.preferredTime.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">{t('contact.additionalInformation')}</label>
                      <textarea
                        {...appointmentForm.register('message')}
                        rows={4}
                        className="form-input"
                        placeholder={t('contact.placeholders.additionalInfo')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      {submitStatus === 'loading' ? (
                        <div className="spinner" />
                      ) : (
                        <>
                          <Send size={20} />
                          {t('contact.scheduleAppointmentBtn', 'Schedule Appointment')}
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Contact Form */}
                {activeTab === 'contact' && (
                  <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">{t('contact.fullName')} {t('contact.required')}</label>
                        <input
                          {...contactForm.register('name')}
                          className="form-input"
                          placeholder={t('contact.placeholders.fullName')}
                        />
                        {contactForm.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">{t('contact.emailAddress')} {t('contact.required')}</label>
                        <input
                          {...contactForm.register('email')}
                          type="email"
                          className="form-input"
                          placeholder={t('contact.placeholders.email')}
                        />
                        {contactForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">{t('contact.subject')} {t('contact.required')}</label>
                      <input
                        {...contactForm.register('subject')}
                        className="form-input"
                        placeholder={t('contact.placeholders.subject')}
                      />
                      {contactForm.formState.errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactForm.formState.errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">{t('contact.message')} {t('contact.required')}</label>
                      <textarea
                        {...contactForm.register('message')}
                        rows={6}
                        className="form-input"
                        placeholder={t('contact.placeholders.message')}
                      />
                      {contactForm.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactForm.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      {submitStatus === 'loading' ? (
                        <div className="spinner" />
                      ) : (
                        <>
                          <Send size={20} />
                          {t('contact.sendMessage', 'Send Message')}
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={20} />
                    <p className="text-green-700">
                      {t('contact.messages.success', 'Thank you! Your {type} has been sent successfully. We\'ll get back to you within 24 hours.', {
                        type: activeTab === 'appointment' 
                          ? t('contact.messages.appointmentSuccess', 'appointment request')
                          : t('contact.messages.messageSuccess', 'message')
                      })}
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="text-red-600" size={20} />
                    <p className="text-red-700">
                      {t('contact.messages.error', 'Sorry, there was an error sending your message. Please try again or contact us directly.')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;