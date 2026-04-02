import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
    'Product Demo',
    'Consultation',
    'Implementation Planning',
    'Technical Support',
    'Partnership Discussion',
    'Other'
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  return (
    <section id="contact" className="section-padding bg-background-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get in Touch with InSite Health System
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to transform your healthcare facility's equipment management? 
            Contact our experts to schedule a demo or learn more about our solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-insite-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-insite-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">
                      123 Healthcare Technology Blvd<br />
                      Suite 500<br />
                      Medical District, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-insite-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-insite-cyan" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">
                      Sales: (555) 123-4567<br />
                      Support: (555) 123-4568
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-insite-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-insite-orange" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">
                      sales@insitehealth.com<br />
                      support@insitehealth.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM PST<br />
                      24/7 Emergency Support Available
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-insite-blue">&lt;1hr</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-insite-cyan">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
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
                  Schedule Appointment
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                    activeTab === 'contact'
                      ? 'bg-insite-blue text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  General Contact
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Appointment Form */}
                {activeTab === 'appointment' && (
                  <form onSubmit={appointmentForm.handleSubmit(onSubmitAppointment)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input
                          {...appointmentForm.register('name')}
                          className="form-input"
                          placeholder="Enter your full name"
                        />
                        {appointmentForm.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Email Address *</label>
                        <input
                          {...appointmentForm.register('email')}
                          type="email"
                          className="form-input"
                          placeholder="Enter your email"
                        />
                        {appointmentForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Phone Number *</label>
                        <input
                          {...appointmentForm.register('phone')}
                          type="tel"
                          className="form-input"
                          placeholder="Enter your phone number"
                        />
                        {appointmentForm.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {appointmentForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Organization</label>
                        <input
                          {...appointmentForm.register('organization')}
                          className="form-input"
                          placeholder="Hospital or organization name"
                        />
                      </div>

                      <div>
                        <label className="form-label">Appointment Type *</label>
                        <select {...appointmentForm.register('appointmentType')} className="form-input">
                          <option value="">Select appointment type</option>
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
                        <label className="form-label">Preferred Date *</label>
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
                      <label className="form-label">Preferred Time *</label>
                      <select {...appointmentForm.register('preferredTime')} className="form-input">
                        <option value="">Select preferred time</option>
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
                      <label className="form-label">Additional Information</label>
                      <textarea
                        {...appointmentForm.register('message')}
                        rows={4}
                        className="form-input"
                        placeholder="Tell us about your specific needs or questions"
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
                          Schedule Appointment
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
                        <label className="form-label">Full Name *</label>
                        <input
                          {...contactForm.register('name')}
                          className="form-input"
                          placeholder="Enter your full name"
                        />
                        {contactForm.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Email Address *</label>
                        <input
                          {...contactForm.register('email')}
                          type="email"
                          className="form-input"
                          placeholder="Enter your email"
                        />
                        {contactForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Subject *</label>
                      <input
                        {...contactForm.register('subject')}
                        className="form-input"
                        placeholder="Enter message subject"
                      />
                      {contactForm.formState.errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactForm.formState.errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Message *</label>
                      <textarea
                        {...contactForm.register('message')}
                        rows={6}
                        className="form-input"
                        placeholder="Enter your message"
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
                          Send Message
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
                      Thank you! Your {activeTab === 'appointment' ? 'appointment request' : 'message'} has been sent successfully. 
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="text-red-600" size={20} />
                    <p className="text-red-700">
                      Sorry, there was an error sending your message. Please try again or contact us directly.
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