import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';

import Navbar from '../components/Navbar';
import ThreadList from '../components/ThreadList';
import CategoryFilter from '../components/CategoryFilter';

import { asyncLogoutUser } from '../states/authUser/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch threads & users saat komponen mount
  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  // Gabungkan thread dengan data owner
  const threadsWithOwner = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId) || {
      id: 'unknown',
      name: 'Unknown User',
      avatar: 'https://ui-avatars.com/api/?name=Unknown&background=random',
    },
  }));

  // Filter berdasarkan kategori
  const filteredThreads = selectedCategory
    ? threadsWithOwner.filter((thread) => thread.category === selectedCategory)
    : threadsWithOwner;

  // Ambil semua kategori unik
  const categories = [...new Set(threads.map((thread) => thread.category).filter(Boolean))];

  // Handlers
  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/');
  };

  const onUpVote = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const onNeutralizeVote = (threadId) => {
    dispatch(asyncNeutralizeVoteThread(threadId));
  };

  const onCreateThread = () => {
    if (!authUser) {
      alert('Silakan login untuk membuat thread!');
      navigate('/login');
      return;
    }
    navigate('/threads/new');
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Navbar */}
      <Navbar authUser={authUser} onLogout={onLogout} />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text">Diskusi Terbaru</h1>
          <button
            onClick={onCreateThread}
            className="btn-primary flex items-center gap-2"
          >
            <BiPlus size={20} />
            <span className="hidden sm:inline">Buat Thread</span>
          </button>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-6">
            <p className="text-text-muted text-sm mb-2">Filter Kategori:</p>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        )}

        {/* Thread List */}
        <ThreadList
          threads={filteredThreads}
          authUser={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralizeVote={onNeutralizeVote}
        />
      </main>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={onCreateThread}
        className="fixed bottom-6 right-6 sm:hidden bg-primary hover:bg-primary-hover 
                   text-white p-4 rounded-full shadow-glow-primary transition-all"
      >
        <BiPlus size={24} />
      </button>
    </div>
  );
}

export default HomePage;
