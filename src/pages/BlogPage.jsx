import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBlogContent } from '../contexts/BlogContentContext';
import { multiLanguageBlogPosts } from '../data/multiLanguageBlogData';
import { 
  Calendar, 
  User, 
  MessageCircle, 
  Search, 
  ChevronRight,
  Tag,
  Clock
} from 'lucide-react';

// Individual card that translates itself asynchronously
const BlogPostCard = ({ rawPost, getTranslatedPost, currentLanguage, formatDate, t }) => {
  const [post, setPost] = useState(() => {
    // Seed with English content immediately so the card renders without a flash
    const en = rawPost.content?.en || {};
    return { ...rawPost, title: en.title || '', excerpt: en.excerpt || '', tags: en.tags || [] };
  });

  useEffect(() => {
    let cancelled = false;
    getTranslatedPost(rawPost, currentLanguage).then((translated) => {
      if (!cancelled && translated) setPost(translated);
    });
    return () => { cancelled = true; };
  }, [currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          {(post.categories || []).map((category, index) => (
            <span
              key={index}
              className="inline-block bg-insite-blue text-white px-3 py-1 text-xs font-semibold rounded-full mr-2 mb-2"
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
            <span>{post.author?.name}</span>
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

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-insite-blue transition-colors leading-tight">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-insite-blue font-semibold hover:text-insite-blue/80 transition-colors group"
          >
            {t('blog.readMore')}
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center text-gray-500 text-sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{post.commentCount} {t('blog.comments')}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const { getTranslatedPost, currentLanguage } = useBlogContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = [
    { name: t('blog.categories.healthcareTech'), count: 15 },
    { name: t('blog.categories.digitalHealth'), count: 12 },
    { name: t('blog.categories.compliance'), count: 8 },
    { name: t('blog.categories.assetManagement'), count: 6 },
    { name: t('blog.categories.telemedicine'), count: 10 },
    { name: t('blog.categories.mobileHealth'), count: 9 },
    { name: t('blog.categories.dataAnalytics'), count: 7 }
  ];

  const tags = [
    "Healthcare", "Technology", "AI", "HIPAA", "Telemedicine",
    "Asset Tracking", "Mobile Apps", "Data Analytics", "Security",
    "Compliance", "Patient Care", "Hospital Management"
  ];

  // Recent posts sidebar — translated titles
  const recentRaw = multiLanguageBlogPosts.slice(0, 3);
  const [recentPosts, setRecentPosts] = useState(recentRaw.map((p) => ({
    ...p,
    title: p.content?.en?.title || '',
  })));

  useEffect(() => {
    let cancelled = false;
    Promise.all(recentRaw.map((p) => getTranslatedPost(p, currentLanguage))).then((results) => {
      if (!cancelled) setRecentPosts(results.filter(Boolean));
    });
    return () => { cancelled = true; };
  }, [currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (date) => {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const totalPages = Math.ceil(multiLanguageBlogPosts.length / postsPerPage);
  const currentRawPosts = multiLanguageBlogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const Sidebar = () => (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('common.search')}</h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder={t('blog.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-insite-blue transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('blog.recentPosts')}</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex space-x-3 group">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-insite-blue transition-colors leading-tight mb-1">
                  <Link to={`/blog/${post.slug}`}>
                    {(post.title || '').substring(0, 60)}{post.title?.length > 60 ? '...' : ''}
                  </Link>
                </h4>
                <p className="text-xs text-gray-500">{formatDate(post.publishDate)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('blog.categoriesLabel')}</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <Link
                to={`/blog/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="text-gray-700 hover:text-insite-blue transition-colors"
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

      {/* Tags */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('blog.tags')}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Link
              key={index}
              to={`/blog/tag/${tag.toLowerCase()}`}
              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-insite-blue hover:text-white transition-colors"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-insite-blue py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('blog.title')}
            </h1>
            <div className="flex items-center justify-center space-x-2 text-white/90">
              <Link to="/" className="hover:text-white transition-colors">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <span className="text-insite-cyan">{t('nav.blog')}</span>
            </div>
            <p className="text-white/90 text-xl mt-4 max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts */}
          <div className="lg:col-span-2">
            <div className="grid gap-8 mb-8">
              {currentRawPosts.map((rawPost) => (
                <BlogPostCard
                  key={rawPost.id}
                  rawPost={rawPost}
                  getTranslatedPost={getTranslatedPost}
                  currentLanguage={currentLanguage}
                  formatDate={formatDate}
                  t={t}
                />
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
                          ? 'bg-insite-blue text-white'
                          : 'bg-white text-gray-700 hover:bg-insite-blue hover:text-white'
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

      {/* Newsletter */}
      <section className="bg-insite-blue py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('blog.newsletter.title')}
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            {t('blog.newsletter.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-insite-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('blog.newsletter.subscribe')}
            </button>
          </div>
          <p className="text-white/70 text-sm mt-4">{t('blog.newsletter.privacy')}</p>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
