import React, { useState, useMemo } from 'react';
import { SPIRITUAL_POSTS } from '../constants';
import { Post } from '../types';

const DiscoverFeed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) {
      return SPIRITUAL_POSTS;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return SPIRITUAL_POSTS.filter(post =>
      post.title.toLowerCase().includes(lowercasedTerm) ||
      post.snippet.toLowerCase().includes(lowercasedTerm) ||
      post.content.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover</h2>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search articles by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full bg-white/80 backdrop-blur-md border-2 border-transparent focus:border-purple-400 focus:ring-0 transition-colors duration-300 shadow-sm"
          aria-label="Search articles"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onReadMore={() => setSelectedPost(post)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white/50 rounded-2xl">
          <p className="text-gray-600 font-semibold">No articles found for "{searchTerm}".</p>
          <p className="text-gray-500 mt-2">Try searching for another keyword.</p>
        </div>
      )}

      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

interface PostCardProps {
  post: Post;
  onReadMore: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onReadMore }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="font-bold text-xl mb-2 text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{post.snippet}</p>
      <button 
        onClick={onReadMore}
        className="font-semibold text-purple-600 hover:text-purple-800 transition-colors mt-auto self-start"
      >
        Read More →
      </button>
    </div>
  </div>
);

interface PostModalProps {
  post: Post;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 text-gray-800 hover:bg-gray-200 z-10" aria-label="Close article">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="p-8 pt-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>
        </div>
    </div>
);

export default DiscoverFeed;