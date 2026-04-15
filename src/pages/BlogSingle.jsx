import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBlogContent } from '../contexts/BlogContentContext';
import {
  Calendar,
  User,
  MessageCircle,
  Search,
  Tag,
  Clock,
  Share2,
  Users,
  ExternalLink,
  Heart,
  Bookmark
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Normalise a raw API post so getTranslatedPost can read it correctly.
// The API stores the body in content.en.body; the context reads content.en.content.
const normalisePost = (raw) => {
  if (!raw) return null;
  const patched = { ...raw };
  if (patched.content?.en) {
    patched.content = {
      ...patched.content,
      en: {
        ...patched.content.en,
        content: patched.content.en.content ?? patched.content.en.body ?? '',
      },
    };
  }
  // Map API fields to the shape the rest of the UI expects
  patched.id = raw._id || raw.id;
  patched.publishDate = raw.publishedAt || raw.publishDate;
  return patched;
};

const BlogSingle = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const { getTranslatedPost, currentLanguage } = useBlogContent();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', website: '', comment: '' });
  const [commentStatus, setCommentStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fetch the main post
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setPost(null);

    fetch(`${API_BASE_URL}/api/blog/posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then(async (data) => {
        if (cancelled) return;
        // API response shape: { success, data: { ...post } }
        const raw = data.data || data.post || data;
        const normalised = normalisePost(raw);
        const translated = await getTranslatedPost(normalised, currentLanguage);
        if (!cancelled) {
          setPost(translated);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-translate when language changes (post already loaded)
  useEffect(() => {
    if (!post) return;
    let cancelled = false;
    // We need the original normalised post to re-translate
    fetch(`${API_BASE_URL}/api/blog/posts/${slug}`)
      .then((res) => res.ok ? res.json() : null)
      .then(async (data) => {
        if (!data || cancelled) return;
        const raw = data.data || data.post || data;
        const normalised = normalisePost(raw);
        const translated = await getTranslatedPost(normalised, currentLanguage);
        if (!cancelled) setPost(translated);
      });
    return () => { cancelled = true; };
  }, [currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch recent posts (exclude current slug)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog/posts?status=published&limit=4`)
      .then((res) => res.ok ? res.json() : null)
      .then(async (data) => {
        if (!data) return;
        const posts = (data.data || data.posts || []).filter((p) => p.slug !== slug).slice(0, 3);
        const translated = await Promise.all(
          posts.map((p) => getTranslatedPost(normalisePost(p), currentLanguage))
        );
        setRecentPosts(translated.filter(Boolean));
      })
      .catch(() => {});
  }, [slug, currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch approved comments for this post
  useEffect(() => {
    if (!slug) return;
    fetch(`${API_BASE_URL}/api/blog/posts/${slug}/comments`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data) setComments(data.data);
      })
      .catch(() => {});
  }, [slug]);

  const categories = [
    { name: t('blog.categories.healthcareTech'), count: 15 },
    { name: t('blog.categories.digitalHealth'), count: 12 },
    { name: t('blog.categories.compliance'), count: 8 },
    { name: t('blog.categories.assetManagement'), count: 6 },
    { name: t('blog.categories.telemedicine'), count: 10 },
  ];

  const tags = [
    'Healthcare', 'Technology', 'AI', 'HIPAA', 'Telemedicine',
    'Asset Tracking', 'Mobile Apps', 'Data Analytics', 'Security', 'Compliance',
  ];

  const formatDate = (date) => {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentStatus('loading');
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/posts/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error('Failed');
      setCommentStatus('success');
      setNewComment({ name: '', email: '', website: '', comment: '' });
      setTimeout(() => setCommentStatus(null), 6000);
    } catch {
      setCommentStatus('error');
      setTimeout(() => setCommentStatus(null), 5000);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post?.title;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-insite-blue mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl">{t('blog.notFound')}</p>
          <p className="text-gray-500 mt-2">{t('blog.notFoundDesc')}</p>
          <Link to="/blog" className="mt-4 inline-block text-insite-blue hover:underline">
            ← {t('nav.blog')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-insite-blue py-12">
        <div className="container-custom">
          <div className="flex items-center justify-center space-x-2 text-white/90 mb-4">
            <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link>
            <span>/</span>
            <span className="text-insite-cyan">{t('nav.blog')}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center max-w-4xl mx-auto leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Article */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">

              {/* Featured Image */}
              <div className="relative">
                <img
                  src={post.featuredImage?.url || post.featuredImage}
                  alt={post.featuredImage?.altText || post.title}
                  className="w-full h-64 md:h-80 object-cover"
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

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center">
                    {post.author?.avatar && (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                    )}
                    <span>{t('blog.author')}: {post.author?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{post.commentCount || 0} {t('blog.comments')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                        isLiked
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{(post.likes || 0) + (isLiked ? 1 : 0)}</span>
                    </button>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 mr-2">{t('blog.shareLabel')}:</span>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Users className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                  <span className="text-sm text-gray-600 mr-2">{t('blog.tags')}:</span>
                  {(post.tags || []).map((tag, index) => (
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

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t('blog.aboutAuthor')}</h3>
                  <div className="flex items-start space-x-4">
                    {post.author?.avatar && (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{post.author?.name}</h4>
                      {post.author?.bio && (
                        <p className="text-gray-600 mb-3">{post.author.bio}</p>
                      )}
                      {post.author?.slug && (
                        <Link
                          to={`/blog/author/${post.author.slug}`}
                          className="text-insite-blue hover:text-insite-blue/80 font-medium"
                        >
                          {t('blog.viewAllPostsBy', { name: post.author?.name })}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Approved Comments */}
                {comments.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {t('blog.comments')} ({comments.length})
                    </h3>
                    <div className="space-y-6">
                      {comments.map((c) => (
                        <div key={c.id || c._id} className="bg-gray-50 rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-full bg-insite-blue flex items-center justify-center text-white font-bold text-sm">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                              <p className="text-xs text-gray-500">
                                {new Date(c.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{c.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comment Form */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.leaveComment')}</h3>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('blog.commentName')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={newComment.name}
                          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                          placeholder={t('blog.commentName')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('blog.commentEmail')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={newComment.email}
                          onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                          placeholder={t('blog.commentEmail')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('blog.commentWebsite')}
                      </label>
                      <input
                        type="url"
                        value={newComment.website}
                        onChange={(e) => setNewComment({ ...newComment, website: e.target.value })}
                        placeholder={t('blog.commentWebsite')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('blog.commentMessage')} *
                      </label>
                      <textarea
                        rows="6"
                        required
                        value={newComment.comment}
                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent"
                        placeholder={t('blog.commentMessage')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={commentStatus === 'loading'}
                      className="btn-primary px-8 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {commentStatus === 'loading' ? t('common.loading') : t('blog.postComment')}
                    </button>
                    {commentStatus === 'success' && (
                      <p className="text-green-600 text-sm mt-3">
                        {t('blog.commentSubmitted', 'Thank you! Your comment is awaiting moderation.')}
                      </p>
                    )}
                    {commentStatus === 'error' && (
                      <p className="text-red-500 text-sm mt-3">
                        {t('blog.commentError', 'Could not submit comment. Please try again.')}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('common.search')}</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('blog.searchPlaceholder')}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-insite-blue transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('blog.recentPosts')}</h3>
                <div className="space-y-4">
                  {recentPosts.map((rp) => (
                    <div key={rp.id || rp._id} className="flex space-x-3 group">
                      {(rp.featuredImage?.url || rp.featuredImage) && (
                        <img
                          src={rp.featuredImage?.url || rp.featuredImage}
                          alt={rp.featuredImage?.altText || rp.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-insite-blue transition-colors leading-tight mb-1">
                          <Link to={`/blog/${rp.slug}`}>
                            {(rp.title || '').substring(0, 60)}{rp.title?.length > 60 ? '...' : ''}
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500">{formatDate(rp.publishDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
        </div>

        {/* You Might Also Like */}
        {recentPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('blog.youMightAlsoLike')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((rp) => (
                <Link
                  key={rp.id || rp._id}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {(rp.featuredImage?.url || rp.featuredImage) && (
                    <img
                      src={rp.featuredImage?.url || rp.featuredImage}
                      alt={rp.featuredImage?.altText || rp.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 group-hover:text-insite-blue transition-colors leading-tight">
                      {rp.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">{formatDate(rp.publishDate)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSingle;
