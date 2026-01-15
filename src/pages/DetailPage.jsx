import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';

import Navbar from '../components/Navbar';
import ThreadDetailContent from '../components/ThreadDetailContent';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';

import { asyncLogoutUser } from '../states/authUser/action';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);
  const threadDetail = useSelector((state) => state.threadDetail);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/');
  };

  const onAddComment = async (content) => {
    if (!authUser) {
      alert('Silakan login untuk berkomentar!');
      navigate('/login');
      return;
    }
    await dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  const onNeutralizeVoteThread = () => {
    dispatch(asyncNeutralizeVoteThreadDetail());
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  const onNeutralizeVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment(commentId));
  };

  // Loading state
  if (!threadDetail) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar authUser={authUser} onLogout={onLogout} />
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="text-4xl mb-4 animate-pulse-slow">🚀</div>
          <p className="text-text-muted">Memuat thread...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar authUser={authUser} onLogout={onLogout} />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-muted hover:text-text mb-6 transition-colors"
        >
          <BiArrowBack size={20} />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Thread Content */}
        <ThreadDetailContent
          {...threadDetail}
          totalComments={threadDetail.comments.length}
          authUser={authUser}
          onUpVote={onUpVoteThread}
          onDownVote={onDownVoteThread}
          onNeutralizeVote={onNeutralizeVoteThread}
        />

        {/* Comment Section */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">
            Komentar ({threadDetail.comments.length})
          </h2>

          {/* Comment Input */}
          {authUser ? (
            <CommentInput onAddComment={onAddComment} />
          ) : (
            <div className="card mb-6 text-center">
              <p className="text-text-muted mb-3">
                Silakan login untuk memberikan komentar.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary"
              >
                Login
              </button>
            </div>
          )}

          {/* Comments List */}
          {threadDetail.comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-muted">
                Belum ada komentar. Jadilah yang pertama berkomentar!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {threadDetail.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  {...comment}
                  authUser={authUser}
                  onUpVote={onUpVoteComment}
                  onDownVote={onDownVoteComment}
                  onNeutralizeVote={onNeutralizeVoteComment}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DetailPage;
