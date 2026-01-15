import PropTypes from 'prop-types';
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote, BiCommentDetail } from 'react-icons/bi';

function ThreadDetailContent({
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  totalComments,
  authUser,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    if (isUpVoted) {
      onNeutralizeVote();
    } else {
      onUpVote();
    }
  };

  const handleDownVote = () => {
    if (isDownVoted) {
      onNeutralizeVote();
    } else {
      onDownVote();
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <article className="card mb-6">
      {/* Category */}
      {category && (
        <span className="badge-primary text-sm mb-4 inline-block">
          #{category}
        </span>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-4">
        {title}
      </h1>

      {/* Owner Info */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-text font-medium">{owner.name}</p>
          <p className="text-text-muted text-sm">{formatDate(createdAt)}</p>
        </div>
      </div>

      {/* Body Content */}
      <div
        className="text-text prose prose-invert max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {/* Vote & Comment Stats */}
      <div className="flex items-center gap-6 pt-4 border-t border-border">
        <button
          onClick={handleUpVote}
          className={`flex items-center gap-2 transition-colors ${
            isUpVoted ? 'text-upvote' : 'text-text-muted hover:text-upvote'
          }`}
        >
          {isUpVoted ? <BiSolidUpvote size={22} /> : <BiUpvote size={22} />}
          <span className="font-medium">{upVotesBy.length}</span>
        </button>

        <button
          onClick={handleDownVote}
          className={`flex items-center gap-2 transition-colors ${
            isDownVoted ? 'text-downvote' : 'text-text-muted hover:text-downvote'
          }`}
        >
          {isDownVoted ? <BiSolidDownvote size={22} /> : <BiDownvote size={22} />}
          <span className="font-medium">{downVotesBy.length}</span>
        </button>

        <span className="flex items-center gap-2 text-text-muted">
          <BiCommentDetail size={22} />
          <span className="font-medium">{totalComments} Komentar</span>
        </span>
      </div>
    </article>
  );
}

ThreadDetailContent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  owner: PropTypes.object.isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.object,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default ThreadDetailContent;
