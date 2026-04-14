import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Calendar,
  User,
  MessageCircle,
  Heart,
  BarChart3,
  LogOut
} from 'lucide-react';

const BlogManagement = () => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Mock blog posts data
  const mockPosts = [
    {
      id: 1,
      title: "The Future of Healthcare Technology: AI and Machine Learning in Medical Diagnosis",
      slug: "future-healthcare-technology-ai-ml-diagnosis",
      status: "published",
      author: "Dr. Sarah Mitchell",
      publishDate: new Date('2024-03-15'),
      lastModified: new Date('2024-03-15'),
      views: 1247,
      comments: 12,
      likes: 24,
      excerpt: "Exploring how artificial intelligence and machine learning are revolutionizing medical diagnosis...",
      categories: ["Healthcare Technology", "AI & ML"],
      featuredImage: "/assets/images/themex-blog-1.jpg"
    },
    {
      id: 2,
      title: "HIPAA Compliance in Digital Health: Essential Guidelines for Healthcare Providers",
      slug: "hipaa-compliance-digital-health-guidelines",
      status: "published",
      author: "Michael Chen",
      publishDate: new Date('2024-03-12'),
      lastModified: new Date('2024-03-13'),
      views: 892,
      comments: 8,
      likes: 15,
      excerpt: "Understanding the critical aspects of HIPAA compliance when implementing digital health solutions...",
      categories: ["Compliance", "Digital Health"],
      featuredImage: "/assets/images/themex-blog-2.jpg"
    },
    {
      id: 3,
      title: "Asset Tracking Revolution: How Real-Time Monitoring Improves Hospital Efficiency",
      slug: "asset-tracking-hospital-efficiency",
      status: "draft",
      author: "Jennifer Davis",
      publishDate: null,
      lastModified: new Date('2024-03-10'),
      views: 0,
      comments: 0,
      likes: 0,
      excerpt: "Discover how InSite's intelligent asset tracking systems are helping hospitals reduce costs...",
      categories: ["Asset Management", "Hospital Operations"],
      featuredImage: "/assets/images/themex-blog-3.jpg"
    },
    {
      id: 4,
      title: "Telemedicine Implementation: Best Practices for Healthcare Organizations",
      slug: "telemedicine-implementation-best-practices",
      status: "scheduled",
      author: "Robert Thompson",
      publishDate: new Date('2024-03-20'),
      lastModified: new Date('2024-03-08'),
      views: 0,
      comments: 0,
      likes: 0,
      excerpt: "A comprehensive guide to successfully implementing telemedicine solutions...",
      categories: ["Telemedicine", "Implementation"],
      featuredImage: "/assets/images/themex-blog-4.jpg"
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Not set';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      archived: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedPosts.length === 0) return;
    
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) {
          setPosts(posts.filter(post => !selectedPosts.includes(post.id)));
          setSelectedPosts([]);
        }
        break;
      case 'publish':
        setPosts(posts.map(post => 
          selectedPosts.includes(post.id) 
            ? { ...post, status: 'published', publishDate: new Date() }
            : post
        ));
        setSelectedPosts([]);
        break;
      case 'draft':
        setPosts(posts.map(post => 
          selectedPosts.includes(post.id) 
            ? { ...post, status: 'draft' }
            : post
        ));
        setSelectedPosts([]);
        break;
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center">
                <img src="/assets/images/logo.png" alt="InSite Health" className="h-8" />
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">Blog Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/blog"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <img 
                  src={user?.avatar || "/assets/images/team-1.jpg"} 
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-custom py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Link
                  to="/blog/manage/new"
                  className="bg-insite-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-insite-blue/90 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Link>
                
                {selectedPosts.length > 0 && (
                  <div className="flex items-center gap-2 bg-insite-blue/10 border border-insite-blue/30 rounded-lg px-3 py-2">
                    <span className="text-sm font-medium text-insite-blue">
                      {selectedPosts.length} selected
                    </span>
                    <div className="w-px h-4 bg-insite-blue/30" />
                    <select
                      onChange={(e) => { if (e.target.value) handleBulkAction(e.target.value); e.target.value = ''; }}
                      defaultValue=""
                      className="text-sm border border-insite-blue/40 bg-white text-gray-700 rounded px-2 py-1 focus:ring-2 focus:ring-insite-blue focus:border-transparent cursor-pointer"
                    >
                      <option value="" disabled>Bulk Actions</option>
                      <option value="publish">Publish</option>
                      <option value="draft">Move to Draft</option>
                      <option value="delete">Delete</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setSelectedPosts([])}
                      className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insite-blue focus:border-transparent"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-insite-blue focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Posts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-4 p-4">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPosts(filteredPosts.map(p => p.id));
                        } else {
                          setSelectedPosts([]);
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">Title</th>
                  <th className="text-left p-4 font-medium text-gray-900">Author</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Stats</th>
                  <th className="text-right p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPosts([...selectedPosts, post.id]);
                          } else {
                            setSelectedPosts(selectedPosts.filter(id => id !== post.id));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{post.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.categories.map((cat, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{post.author}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900">
                        {post.publishDate ? formatDate(post.publishDate) : 'Not published'}
                      </div>
                      <div className="text-xs text-gray-500">
                        Modified: {formatDate(post.lastModified)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {post.comments}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {post.likes}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/blog/manage/edit/${post.id}`}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        {hasPermission('editor') && (
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <BarChart3 className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first blog post'
                }
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Link
                  to="/blog/manage/new"
                  className="inline-flex items-center bg-insite-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-insite-blue/90 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;