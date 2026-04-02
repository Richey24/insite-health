import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  MessageCircle, 
  Search, 
  ChevronRight,
  Tag,
  Clock,
  Share2,
  Users,
  ExternalLink
} from 'lucide-react';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Healthcare Technology: AI and Machine Learning in Medical Diagnosis",
      slug: "future-healthcare-technology-ai-ml-diagnosis",
      excerpt: "Exploring how artificial intelligence and machine learning are revolutionizing medical diagnosis and patient care in modern healthcare facilities.",
      featuredImage: "assets/images/blog-1.jpg",
      author: {
        name: "Dr. Sarah Mitchell",
        slug: "sarah-mitchell"
      },
      categories: ["Healthcare Technology", "AI & ML"],
      publishDate: new Date('2024-03-15'),
      readTime: "8 min read",
      commentCount: 12
    },
    {
      id: 2,
      title: "HIPAA Compliance in Digital Health: Essential Guidelines for Healthcare Providers",
      slug: "hipaa-compliance-digital-health-guidelines",
      excerpt: "Understanding the critical aspects of HIPAA compliance when implementing digital health solutions and protecting patient information.",
      featuredImage: "assets/images/blog-2.jpg",
      author: {
        name: "Michael Chen",
        slug: "michael-chen"
      },
      categories: ["Compliance", "Digital Health"],
      publishDate: new Date('2024-03-12'),
      readTime: "6 min read",
      commentCount: 8
    },
    {
      id: 3,
      title: "Asset Tracking Revolution: How Real-Time Monitoring Improves Hospital Efficiency",
      slug: "asset-tracking-hospital-efficiency",
      excerpt: "Discover how InSite's intelligent asset tracking systems are helping hospitals reduce costs and improve operational efficiency.",
      featuredImage: "assets/images/blog-3.jpg",
      author: {
        name: "Jennifer Davis",
        slug: "jennifer-davis"
      },
      categories: ["Asset Management", "Hospital Operations"],
      publishDate: new Date('2024-03-10'),
      readTime: "5 min read",
      commentCount: 15
    },
    {
      id: 4,
      title: "Telemedicine Implementation: Best Practices for Healthcare Organizations",
      slug: "telemedicine-implementation-best-practices",
      excerpt: "A comprehensive guide to successfully implementing telemedicine solutions while maintaining quality patient care and operational efficiency.",
      featuredImage: "assets/images/blog-1.jpg",
      author: {
        name: "Robert Thompson",
        slug: "robert-thompson"
      },
      categories: ["Telemedicine", "Implementation"],
      publishDate: new Date('2024-03-08'),
      readTime: "7 min read",
      commentCount: 9
    },
    {
      id: 5,
      title: "Mobile-First Healthcare: Designing Secure Applications for Medical Professionals",
      slug: "mobile-first-healthcare-secure-applications",
      excerpt: "Learn about the principles of mobile-first design in healthcare and how to create secure, user-friendly applications for medical staff.",
      featuredImage: "assets/images/blog-2.jpg",
      author: {
        name: "Kerry Anderson",
        slug: "kerry-anderson"
      },
      categories: ["Mobile Health", "Security"],
      publishDate: new Date('2024-03-05'),
      readTime: "6 min read",
      commentCount: 11
    },
    {
      id: 6,
      title: "Data Analytics in Healthcare: Turning Information into Actionable Insights",
      slug: "data-analytics-healthcare-actionable-insights",
      excerpt: "Exploring how healthcare data analytics can drive better patient outcomes, optimize operations, and support evidence-based decision making.",
      featuredImage: "assets/images/blog-3.jpg",
      author: {
        name: "Nicolas Poran",
        slug: "nicolas-poran"
      },
      categories: ["Data Analytics", "Healthcare Insights"],
      publishDate: new Date('2024-03-02'),
      readTime: "9 min read",
      commentCount: 7
    }
  ];

  const categories = [
    { name: "Healthcare Technology", count: 15 },
    { name: "Digital Health", count: 12 },
    { name: "Compliance", count: 8 },
    { name: "Asset Management", count: 6 },
    { name: "Telemedicine", count: 10 },
    { name: "Mobile Health", count: 9 },
    { name: "Data Analytics", count: 7 }
  ];

  const recentPosts = blogPosts.slice(0, 3);

  const tags = [
    "Healthcare", "Technology", "AI", "HIPAA", "Telemedicine", 
    "Asset Tracking", "Mobile Apps", "Data Analytics", "Security", 
    "Compliance", "Patient Care", "Hospital Management"
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const BlogPostCard = ({ post }) => (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          {post.categories.map((category, index) => (
            <span 
              key={index}
              className="inline-block bg-primary text-white px-3 py-1 text-xs font-semibold rounded-full mr-2 mb-2"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(post.publishDate)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <Link 
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors group"
          >
            Read More
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{post.commentCount} Comments</span>
          </div>
        </div>
      </div>
    </article>
  );

  const Sidebar = () => (
    <div className="space-y-8">
      {/* Search Widget */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Search</h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex space-x-3 group">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-1">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title.substring(0, 60)}...
                  </Link>
                </h4>
                <p className="text-xs text-gray-500">
                  {formatDate(post.publishDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <Link 
                to={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Widget */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Link
              key={index}
              to={`/blog/tag/${tag.toLowerCase()}`}
              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const currentPosts = blogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Healthcare Blog
            </h1>
            <div className="flex items-center justify-center space-x-2 text-white/90">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-accent">Blog</span>
            </div>
            <p className="text-white/90 text-xl mt-4 max-w-2xl mx-auto">
              Stay informed with the latest insights on healthcare technology, industry trends, and innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="grid gap-8 mb-8">
              {currentPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        currentPage === index + 1
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-primary hover:text-white'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Healthcare Innovation
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on healthcare technology, 
            industry trends, and InSite Health Systems updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;