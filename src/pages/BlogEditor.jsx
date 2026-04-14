import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import MultiLanguageBlogEditor from '../components/MultiLanguageBlogEditor';
import { ArrowLeft } from 'lucide-react';

const EMPTY_LANG_CONTENT = {
  title: '',
  excerpt: '',
  body: '',
  tags: [],
  slug: '',
  seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
};

const BlogEditor = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const basePost = {
      // Per-language content
      content: {
        en: { ...EMPTY_LANG_CONTENT },
      },
      // Global post fields
      status: 'draft',
      publishDate: null,
      featuredImage: { url: '', altText: '' },
      categories: [],
      author: {
        name: user?.name || '',
        slug: user?.slug || '',
        avatar: user?.avatar || '/assets/images/team-1.jpg',
        bio: '',
      },
    };

    if (id) {
      // TODO: fetch real post from API using `id`
      setInitialData({ ...basePost, id });
    } else {
      setInitialData(basePost);
    }
    setIsLoading(false);
  }, [id, user]);

  const handleSave = (updatedPost) => {
    // TODO: persist to API
    console.log('Saving post:', updatedPost);
    navigate('/blog/manage');
  };

  const handleCancel = () => navigate('/blog/manage');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-insite-blue mx-auto mb-4" />
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/blog/manage"
                className="flex items-center text-gray-600 hover:text-insite-blue transition-colors text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                {t('common.back')}
              </Link>
              <span className="h-4 w-px bg-gray-300" />
              <h1 className="text-lg font-bold text-gray-900">
                {id ? t('blog.editPost') : t('blog.newPost')}
              </h1>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-1.5 rounded-lg transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      </div>

      {/* Editor — full width, no inner container (editor manages its own max-width) */}
      <MultiLanguageBlogEditor
        initialData={initialData}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={!!id}
      />
    </div>
  );
};

export default BlogEditor;
