import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t } = useTranslation();
  const blogPosts = [
    {
      id: 1,
      title: "5 Ways Real-Time Equipment Tracking Improves Patient Safety",
      excerpt: "Discover how modern equipment visibility solutions directly impact patient outcomes and safety metrics in healthcare facilities.",
      image: "/assets/images/themex-blog-1.jpg",
      category: "Patient Safety",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "ROI Analysis: The Financial Impact of Equipment Management Systems",
      excerpt: "A comprehensive breakdown of cost savings and efficiency gains from implementing automated equipment tracking solutions.",
      image: "/assets/images/themex-blog-2.jpg",
      category: "Healthcare Economics",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "HIPAA Compliance in Healthcare IoT: What You Need to Know",
      excerpt: "Essential guidelines for maintaining patient privacy and data security when implementing IoT solutions in healthcare.",
      image: "/assets/images/themex-blog-3.jpg",
      category: "Compliance",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Case Study: Metro General Hospital's Equipment Optimization Journey",
      excerpt: "How a 500-bed hospital reduced equipment search time by 75% and improved staff efficiency with InSite Health System.",
      image: "/assets/images/themex-blog-4.jpg",
      category: "Case Study",
      author: "James Wilson",
      date: "March 8, 2024",
      readTime: "8 min read"
    }
  ];

  const categories = [
    t('blog.allPosts', 'All Posts'),
    t('blog.categories.patientSafety', 'Patient Safety'), 
    t('blog.categories.healthcareEconomics', 'Healthcare Economics'),
    t('blog.categories.compliance', 'Compliance'),
    t('blog.categories.caseStudy', 'Case Study'),
    t('blog.categories.technology', 'Technology')
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('blog.title', 'Healthcare Technology Insights')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('blog.subtitle', 'Stay informed with the latest trends, best practices, and innovations in healthcare technology and equipment management.')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                index === 0
                  ? 'bg-insite-blue text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <div key={post.id} className="mb-16">
            <div className="bg-gradient-to-r from-insite-blue to-insite-cyan rounded-2xl p-2">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 lg:h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                    <div className="w-full h-64 lg:h-full bg-gradient-to-br from-insite-blue to-insite-cyan hidden items-center justify-center text-white text-4xl font-bold">
                      Featured
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-insite-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t('blog.featured', 'Featured')}
                      </span>
                      <span className="bg-insite-blue/10 text-insite-blue px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-insite-blue font-semibold hover:text-insite-cyan transition-colors duration-200"
                      >
                        {t('blog.readMore', 'Read More')}
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-insite-blue to-insite-cyan hidden items-center justify-center text-white text-lg font-bold">
                    {post.category}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-insite-blue px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-insite-blue transition-colors duration-200 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Date and Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-insite-blue font-semibold hover:text-insite-cyan transition-colors duration-200"
                    >
                      {t('blog.readMore', 'Read More')}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <div className="bg-background-section rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t('blog.newsletter.title', 'Stay Updated with Healthcare Technology Insights')}
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('blog.newsletter.description', 'Subscribe to our newsletter and get the latest articles, case studies, and industry insights delivered directly to your inbox.')}
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t('blog.newsletter.placeholder', 'Enter your email address')}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent transition-all duration-200"
                />
                <button className="btn-primary whitespace-nowrap">
                  {t('blog.newsletter.subscribe', 'Subscribe Now')}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                {t('blog.newsletter.privacy', 'No spam, unsubscribe at any time. Privacy policy applies.')}
              </p>
            </div>
          </div>
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            {t('blog.viewAllPosts', 'View All Posts')}
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;