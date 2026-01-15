import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote, BiCommentDetail } from 'react-icons/bi';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  authUser,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const navigate = useNavigate();
  
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = (e) => {
    e.stopPropagation();
    if (isUpVoted) {
      onNeutralizeVote(id);
    } else {
      onUpVote(id);
    }
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (isDownVoted) {
      onNeutralizeVote(id);
    } else {
      onDownVote(id);
    }
  };

  // Format tanggal
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

  // Potong body untuk preview
  const truncateBody = (text, maxLength = 150) => {
    const strippedText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.substring(0, maxLength) + '...';
  };

  return (
    <div
      className="card-interactive animate-fade-in"
      onClick={() => navigate(`/threads/${id}`)}
      role="button"
      tabIndex={0}
    >
      {/* Category Badge */}
      {category && (
        <span className="badge-primary text-xs mb-3 inline-block">
          #{category}
        </span>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-text hover:text-primary transition-colors mb-2">
        {title}
      </h3>

      {/* Body Preview */}
      <p className="text-text-muted text-sm mb-4 line-clamp-2">
        {truncateBody(body)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        {/* Vote & Comment */}
        <div className="flex items-center gap-4">
          {/* Upvote */}
          <button
            onClick={handleUpVote}
            className={`flex items-center gap-1 transition-colors ${
              isUpVoted ? 'text-upvote' : 'text-text-muted hover:text-upvote'
            }`}
          >
            {isUpVoted ? <BiSolidUpvote size={18} /> : <BiUpvote size={18} />}
            <span>{upVotesBy.length}</span>
          </button>

          {/* Downvote */}
          <button
            onClick={handleDownVote}
            className={`flex items-center gap-1 transition-colors ${
              isDownVoted ? 'text-downvote' : 'text-text-muted hover:text-downvote'
            }`}
          >
            {isDownVoted ? <BiSolidDownvote size={18} /> : <BiDownvote size={18} />}
            <span>{downVotesBy.length}</span>
          </button>

          {/* Comments */}
          <span className="flex items-center gap-1 text-text-muted">
            <BiCommentDetail size={18} />
            <span>{totalComments}</span>
          </span>
        </div>

        {/* Owner & Time */}
        <div className="flex items-center gap-2 text-text-muted">
          <img
            src={owner.avatar}
            alt={owner.name}
            className="w-5 h-5 rounded-full"
          />
          <span>{owner.name}</span>
          <span>•</span>
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.object.isRequired,
  authUser: PropTypes.object,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default ThreadItem;
