import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  // Temporary fallback data to prevent crashes
  const fallbackFaqData = [
    {
      question: "How does InSite Health System track medical equipment?",
      answer: "InSite uses advanced IoT sensors and RFID technology to provide real-time location tracking of medical equipment throughout your facility."
    },
    {
      question: "Is the system HIPAA compliant and secure?",
      answer: "Yes, InSite Health System is fully HIPAA compliant with end-to-end encryption, secure data transmission, and comprehensive audit trails."
    }
  ];

  const faqData = t('faq.questions', { returnObjects: true }) || fallbackFaqData;

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
            {t('faq.title', 'Frequently Asked Questions')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('faq.subtitle', "Get answers to common questions about InSite Health System's equipment visibility solutions and implementation process.")}
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
                {t('faq.stillHaveQuestions')}
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                {t('faq.stillHaveQuestionsDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-insite-blue bg-white hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  {t('faq.contactTeam')}
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-insite-blue rounded-lg transition-all duration-300"
                >
                  {t('faq.scheduleDemo')}
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