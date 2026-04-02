import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const faqData = [
    {
      question: "How does InSite Health System track medical equipment?",
      answer: "InSite uses advanced IoT sensors and RFID technology to provide real-time location tracking of medical equipment throughout your facility. Our sensors are designed specifically for healthcare environments and integrate seamlessly with existing hospital infrastructure without disrupting daily operations."
    },
    {
      question: "Is the system HIPAA compliant and secure?",
      answer: "Yes, InSite Health System is fully HIPAA compliant with end-to-end encryption, secure data transmission, and comprehensive audit trails. We maintain SOC 2 Type II certification and implement industry-leading security measures to protect sensitive healthcare data."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation varies based on facility size and complexity, but typically takes 2-4 weeks for most hospitals. Our process includes site assessment, sensor installation, staff training, and system integration. We work around your schedule to minimize disruption to patient care."
    },
    {
      question: "Can InSite integrate with our existing hospital management system?",
      answer: "Absolutely. InSite is designed to integrate with major hospital management systems including Epic, Cerner, Meditech, and others. Our API-first approach ensures seamless data flow between systems and maintains your existing workflows."
    },
    {
      question: "What types of medical equipment can be tracked?",
      answer: "InSite can track virtually any medical equipment including wheelchairs, IV pumps, ventilators, patient monitors, beds, surgical instruments, and mobile diagnostic equipment. Our flexible sensor technology adapts to different equipment types and sizes."
    },
    {
      question: "How much does InSite Health System cost?",
      answer: "Pricing is customized based on your facility size, number of assets, and specific requirements. We offer flexible subscription models with no upfront hardware costs. Contact us for a personalized quote and ROI analysis based on your needs."
    },
    {
      question: "What kind of support and training do you provide?",
      answer: "We provide comprehensive 24/7 technical support, initial staff training, ongoing education programs, and dedicated customer success management. Our support team includes healthcare technology specialists who understand hospital operations."
    },
    {
      question: "Can the system help with regulatory compliance and reporting?",
      answer: "Yes, InSite automatically generates compliance reports for Joint Commission, CMS, and other regulatory requirements. The system maintains detailed audit trails, equipment utilization reports, and maintenance scheduling to support your compliance efforts."
    },
    {
      question: "What happens if equipment leaves the designated area?",
      answer: "InSite provides real-time alerts when equipment moves outside designated zones or leaves the facility. You can set custom alert rules, notification preferences, and automated workflows to ensure critical equipment stays where it's needed."
    },
    {
      question: "How does InSite improve patient care and operational efficiency?",
      answer: "By reducing equipment search time by up to 80%, InSite allows staff to focus more on patient care. The system also optimizes equipment utilization, reduces equipment loss, improves maintenance scheduling, and provides data-driven insights for better resource allocation."
    }
  ];

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="section-padding bg-background-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-insite-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="text-insite-blue" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about InSite Health System's equipment 
            visibility solutions and implementation process.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  aria-expanded={openItems.has(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 bg-insite-blue/10 rounded-full flex items-center justify-center">
                    {openItems.has(index) ? (
                      <ChevronUp className="text-insite-blue" size={20} />
                    ) : (
                      <ChevronDown className="text-insite-blue" size={20} />
                    )}
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.has(index)
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-insite-blue to-insite-cyan rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our healthcare technology experts are here to help. Get personalized 
                answers and learn how InSite can benefit your specific facility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-insite-blue bg-white hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  Contact Our Team
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
      </div>
    </section>
  );
};

export default FAQ;