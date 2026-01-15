import PropTypes from 'prop-types';
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi';

function CommentItem({
  id,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  authUser,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    if (isUpVoted) {
      onNeutralizeVote(id);
    } else {
      onUpVote(id);
    }
  };

  const handleDownVote = () => {
    if (isDownVoted) {
      onNeutralizeVote(id);
    } else {
      onDownVote(id);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-dark-lighter border border-border rounded-lg p-4 animate-fade-in">
      {/* Header: Owner & Time */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="text-text font-medium text-sm">{owner.name}</p>
          <p className="text-text-muted text-xs">{formatDate(createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      <div
        className="text-text text-sm mb-3 prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Footer: Votes */}
      <div className="flex items-center gap-4 text-sm">
        <button
          onClick={handleUpVote}
          className={`flex items-center gap-1 transition-colors ${
            isUpVoted ? 'text-upvote' : 'text-text-muted hover:text-upvote'
          }`}
        >
          {isUpVoted ? <BiSolidUpvote size={16} /> : <BiUpvote size={16} />}
          <span>{upVotesBy.length}</span>
        </button>

        <button
          onClick={handleDownVote}
          className={`flex items-center gap-1 transition-colors ${
            isDownVoted ? 'text-downvote' : 'text-text-muted hover:text-downvote'
          }`}
        >
          {isDownVoted ? <BiSolidDownvote size={16} /> : <BiDownvote size={16} />}
          <span>{downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  owner: PropTypes.object.isRequired,
  authUser: PropTypes.object,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default CommentItem;
