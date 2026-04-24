import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
  const { t } = useTranslation();
  const slides = [
    {
      id: 1,
      backgroundImage: '/assets/images/slider3.jpg',
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      description: t('hero.description'),
      tagline: t('hero.tagline'),
      ctaText: t('hero.ctaText'),
      ctaLink: '#contact'
    },
    // You can add more slides here in the future
  ];

  return (
    <section className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden bg-gray-900">
              <img
                src={slide.backgroundImage}
                alt="Healthcare Equipment Background"
                className="w-full h-full object-cover object-center scale-105"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #083791 0%, #4fc1f0 100%)';
                }}
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 hero-overlay" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-6xl text-center text-white">
                <div className="max-w-4xl mx-auto animate-fadeInUp">
                  {/* Main Title */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  
                  {/* Subtitle */}
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4 text-insite-light-blue">
                    {slide.subtitle}
                  </h2>
                  
                  {/* Description */}
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-3 sm:mb-4 text-gray-100">
                    {slide.description}
                  </h3>
                  
                  {/* Tagline */}
                  <p className="text-sm sm:text-base md:text-lg font-medium mb-6 sm:mb-8 text-insite-cyan">
                    {slide.tagline}
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={slide.ctaLink}
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-insite-orange hover:bg-insite-orange/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      {slide.ctaText}
                    </a>
                    <Link
                      to="/pilot-setup"
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-insite-blue rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {t('common.startYourPilot')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Hidden on mobile */}
      <div className="hidden md:block swiper-button-prev !text-white !text-2xl !font-bold hover:!text-insite-cyan transition-colors duration-200 !bg-black/20 !rounded-full !w-12 !h-12 !mt-[-24px] after:!text-base" />
      <div className="hidden md:block swiper-button-next !text-white !text-2xl !font-bold hover:!text-insite-cyan transition-colors duration-200 !bg-black/20 !rounded-full !w-12 !h-12 !mt-[-24px] after:!text-base" />
      
      {/* Custom Pagination */}
      <div className="swiper-pagination !bottom-4 sm:!bottom-8 [&>.swiper-pagination-bullet]:!bg-white/50 [&>.swiper-pagination-bullet]:!w-2 [&>.swiper-pagination-bullet]:!h-2 sm:[&>.swiper-pagination-bullet]:!w-3 sm:[&>.swiper-pagination-bullet]:!h-3 [&>.swiper-pagination-bullet]:!opacity-70 [&>.swiper-pagination-bullet-active]:!bg-insite-cyan [&>.swiper-pagination-bullet-active]:!opacity-100 [&>.swiper-pagination-bullet-active]:!scale-125" />

      {/* Scroll Down Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hide navigation on mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;