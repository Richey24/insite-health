import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBlogContent } from '../contexts/BlogContentContext';
import { submitNewsletter } from '../utils/api';
import { 
  Calendar, 
  User, 
  MessageCircle, 
  Search, 
  ChevronRight,
  Tag,
  Clock,
  Loader2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Individual card that translates itself asynchronously
const BlogPostCard = ({ rawPost, getTranslatedPost, currentLanguage, formatDate, t }) => {
  const [post, setPost] = useState(() => {
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
          src={post.featuredImage?.url || post.featuredImage}
          alt={post.featuredImage?.altText || post.title}
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
            <span>{formatDate(post.publishedAt || post.publishDate)}</span>
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
            <span>{post.commentCount || 0} {t('blog.comments')}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const { getTranslatedPost, currentLanguage } = useBlogContent();

  // ── Posts state ──────────────────────────────────────────────────────────────
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Recent posts sidebar ─────────────────────────────────────────────────────
  const [recentPosts, setRecentPosts] = useState([]);

  // ── Search / pagination ──────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // ── Newsletter ────────────────────────────────────────────────────────────────
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

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

  const formatDate = (date) => {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ── Fetch posts from API ──────────────────────────────────────────────────────
  const fetchPosts = useCallback(async (page, search) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page,
        limit: postsPerPage,
        status: 'published',
      });
      if (search) params.set('search', search);

      const res = await fetch(`${API_BASE_URL}/api/blog/posts?${params}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();

      // API response: { posts: [...], totalPages: n, currentPage: n, total: n }
      const rawPosts = json.posts || json.data || [];
      setPosts(rawPosts);
      setTotalPages(json.totalPages || 1);
    } catch (err) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch recent posts once on mount (no search, page 1, limit 3)
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/blog/posts?page=1&limit=3&status=published`);
        if (!res.ok) return;
        const json = await res.json();
        setRecentPosts(json.posts || json.data || []);
      } catch {
        // silently ignore — sidebar is non-critical
      }
    };
    fetchRecent();
  }, []);

  useEffect(() => {
    fetchPosts(currentPage, activeSearch);
  }, [currentPage, activeSearch, fetchPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery.trim());
    setCurrentPage(1);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    try {
      await submitNewsletter({ email: newsletterEmail });
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(null), 5000);
    } catch {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(null), 5000);
    }
  };

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
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-insite-blue focus:border-transparent"
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
          {recentPosts.map((rp) => {
            const title = rp.content?.en?.title || rp.title || '';
            return (
              <div key={rp._id || rp.id} className="flex space-x-3 group">
                <img
                  src={rp.featuredImage?.url || rp.featuredImage}
                  alt={rp.featuredImage?.altText || title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-insite-blue transition-colors leading-tight mb-1">
                    <Link to={`/blog/${rp.slug}`}>
                      {title.substring(0, 60)}{title.length > 60 ? '...' : ''}
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-500">{formatDate(rp.publishedAt || rp.publishDate)}</p>
                </div>
              </div>
            );
          })}
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
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-insite-blue" />
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => fetchPosts(currentPage, activeSearch)}
                  className="text-insite-blue hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500 text-lg">No posts found{activeSearch ? ` for "${activeSearch}"` : ''}.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-8 mb-8">
                  {posts.map((rawPost) => (
                    <BlogPostCard
                      key={rawPost._id || rawPost.id}
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
              </>
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
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-6 py-3 rounded-lg border-0 bg-white text-gray-900 focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              disabled={newsletterStatus === 'loading'}
              className="bg-white text-insite-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {newsletterStatus === 'loading' ? 'Subscribing...' : t('blog.newsletter.subscribe')}
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="text-green-300 text-sm mt-4">Successfully subscribed! Check your inbox.</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="text-red-300 text-sm mt-4">Something went wrong. Please try again.</p>
          )}
          <p className="text-white/70 text-sm mt-4">{t('blog.newsletter.privacy')}</p>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
