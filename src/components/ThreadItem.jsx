import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote, BiCommentDetail, BiTime } from 'react-icons/bi';

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

  // Category color mapping
  const getCategoryColor = (cat) => {
    const colors = {
      react: 'bg-cat-react',
      redux: 'bg-cat-redux',
      javascript: 'bg-cat-javascript',
      typescript: 'bg-cat-typescript',
    };
    return colors[cat?.toLowerCase()] || 'bg-primary';
  };

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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 365) return `over ${Math.floor(diffDays / 30)} months ago`;
    return `over ${Math.floor(diffDays / 365)} years ago`;
  };

  const truncateBody = (text, maxLength = 120) => {
    const strippedText = text.replace(/<[^>]+>/g, '');
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.substring(0, maxLength) + '...';
  };

  return (
    <div
      className="card-interactive relative overflow-hidden animate-fade-in group"
      onClick={() => navigate(`/threads/${id}`)}
      role="button"
      tabIndex={0}
    >
      {/* Category Indicator Line */}
      <div className={`absolute left-0 top-0 w-1 h-full ${getCategoryColor(category)} rounded-l-2xl`} />

      <div className="pl-4">
        {/* Header: Category & Time */}
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span className="badge-category uppercase tracking-wider">
              <span className={`w-2 h-2 rounded-full ${getCategoryColor(category)}`} />
              {category}
            </span>
          )}
          <span className="flex items-center gap-1 text-text-muted text-xs">
            <BiTime size={14} />
            {formatDate(createdAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Body Preview */}
        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {truncateBody(body)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Vote & Comment */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleUpVote}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                isUpVoted 
                  ? 'text-upvote bg-upvote/10' 
                  : 'text-text-muted hover:text-upvote hover:bg-upvote/10'
              }`}
            >
              {isUpVoted ? <BiSolidUpvote size={16} /> : <BiUpvote size={16} />}
              <span className="text-sm font-medium">{upVotesBy.length}</span>
            </button>

            <button
              onClick={handleDownVote}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                isDownVoted 
                  ? 'text-downvote bg-downvote/10' 
                  : 'text-text-muted hover:text-downvote hover:bg-downvote/10'
              }`}
            >
              {isDownVoted ? <BiSolidDownvote size={16} /> : <BiDownvote size={16} />}
              <span className="text-sm font-medium">{downVotesBy.length}</span>
            </button>

            <span className="flex items-center gap-1.5 text-text-muted">
              <BiCommentDetail size={16} />
              <span className="text-sm">{totalComments}</span>
            </span>
          </div>

          {/* Owner */}
          <div className="flex items-center gap-2">
            <img
              src={owner.avatar}
              alt={owner.name}
              className="w-6 h-6 rounded-full ring-2 ring-border"
            />
            <span className="text-sm text-text-muted font-medium">{owner.name}</span>
          </div>
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
