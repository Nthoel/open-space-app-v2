import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoRocketSharp } from 'react-icons/io5';

import Navbar from '../components/Navbar';
import ThreadList from '../components/ThreadList';
import StarsBackground from '../components/StarsBackground';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(asyncPopulateUsersAndThreads());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const threadsWithOwner = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId) || {
      id: 'unknown',
      name: 'Unknown',
      avatar: 'https://ui-avatars.com/api/?name=Unknown&background=random',
    },
  }));

  const filteredThreads = selectedCategory
    ? threadsWithOwner.filter((thread) => thread.category === selectedCategory)
    : threadsWithOwner;

  const categories = [...new Set(threads.map((thread) => thread.category).filter(Boolean))];

  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/');
  };

  const onUpVote = (threadId) => dispatch(asyncToggleUpVoteThread(threadId));
  const onDownVote = (threadId) => dispatch(asyncToggleDownVoteThread(threadId));
  const onNeutralizeVote = (threadId) => dispatch(asyncNeutralizeVoteThread(threadId));

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <StarsBackground />
      <Navbar authUser={authUser} onLogout={onLogout} />

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-10 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 
                        border border-primary/30 rounded-full mb-4 animate-fade-in">
            <IoRocketSharp className="text-primary" />
            <span className="text-sm text-primary font-medium">Welcome to the cosmos</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-3 animate-slide-up">
            Cosmos Feed
          </h1>
          <p className="text-text-muted text-lg animate-slide-up">
            Join the intergalactic discourse.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              className={selectedCategory === '' ? 'category-chip-active' : 'category-chip'}
            >
              All Signals
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'category-chip-active' : 'category-chip'}
              >
                #{category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Thread List */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4 animate-float">🚀</div>
            <p className="text-text-muted">Loading signals from the cosmos...</p>
          </div>
        ) : (
          <ThreadList
            threads={filteredThreads}
            authUser={authUser}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralizeVote={onNeutralizeVote}
          />
        )}
      </main>
    </div>
  );
}

export default HomePage;
