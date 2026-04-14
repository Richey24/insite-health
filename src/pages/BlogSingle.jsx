import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBlogContent } from '../contexts/BlogContentContext';
import { multiLanguageBlogPosts } from '../data/multiLanguageBlogData';
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

const BlogSingle = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const { getTranslatedPost, currentLanguage } = useBlogContent();

  const [post, setPost] = useState(null);
  const [isTranslating, setIsTranslating] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    website: '',
    comment: ''
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Find and translate the post whenever slug or language changes
  useEffect(() => {
    const rawPost = multiLanguageBlogPosts.find((p) => p.slug === slug);
    if (!rawPost) {
      setNotFound(true);
      setIsTranslating(false);
      return;
    }

    setNotFound(false);
    setIsTranslating(true);
    getTranslatedPost(rawPost, currentLanguage).then((translated) => {
      setPost(translated);
      setIsTranslating(false);
    });
  }, [slug, currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Recent posts = all posts except current, up to 3
  const recentRaw = multiLanguageBlogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const [recentPosts, setRecentPosts] = useState(recentRaw.map((p) => ({
    ...p,
    title: p.content?.en?.title || '',
  })));

  // Translate recent post titles when language changes
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      recentRaw.map((p) => getTranslatedPost(p, currentLanguage))
    ).then((translated) => {
      if (!cancelled) setRecentPosts(translated);
    });
    return () => { cancelled = true; };
  }, [currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  const categories = [
    { name: t('blog.categories.healthcareTech'), count: 15 },
    { name: t('blog.categories.digitalHealth'), count: 12 },
    { name: t('blog.categories.compliance'), count: 8 },
    { name: t('blog.categories.assetManagement'), count: 6 },
    { name: t('blog.categories.telemedicine'), count: 10 }
  ];

  const tags = [
    "Healthcare", "Technology", "AI", "HIPAA", "Telemedicine",
    "Asset Tracking", "Mobile Apps", "Data Analytics", "Security", "Compliance"
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: Date.now(),
      ...newComment,
      date: new Date(),
      approved: false
    };
    setComments([...comments, comment]);
    setNewComment({ name: '', email: '', website: '', comment: '' });
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

  // Loading state
  if (isTranslating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-insite-blue mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Not found
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
            <Link to="/" className="hover:text-white transition-colors">
              {t('nav.home')}
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white transition-colors">
              {t('nav.blog')}
            </Link>
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
                  src={post.featuredImage}
                  alt={post.title}
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
                    <img
                      src={post.author?.avatar}
                      alt={post.author?.name}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span>{t('blog.author')}: {post.author?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{post.commentCount} {t('blog.comments')}</span>
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
                    <img
                      src={post.author?.avatar}
                      alt={post.author?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{post.author?.name}</h4>
                      {post.author?.bio && (
                        <p className="text-gray-600 mb-3">{post.author.bio}</p>
                      )}
                      <Link
                        to={`/blog/author/${post.author?.slug}`}
                        className="text-insite-blue hover:text-insite-blue/80 font-medium"
                      >
                        {t('blog.viewAllPostsBy', { name: post.author?.name })}
                      </Link>
                    </div>
                  </div>
                </div>

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
                      className="btn-primary px-8 py-3"
                    >
                      {t('blog.postComment')}
                    </button>
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('blog.recentPosts')}</h3>
              <div className="space-y-4">
                {recentPosts.map((rp) => (
                  <div key={rp.id} className="flex space-x-3 group">
                    <img
                      src={rp.featuredImage}
                      alt={rp.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
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
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('blog.youMightAlsoLike')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((rp) => (
              <Link
                key={rp.id}
                to={`/blog/${rp.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <img
                  src={rp.featuredImage}
                  alt={rp.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
      </div>
    </div>
  );
};

export default BlogSingle;
