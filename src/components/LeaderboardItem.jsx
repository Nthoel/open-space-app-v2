import PropTypes from 'prop-types';
import { BiTrophy } from 'react-icons/bi';

function LeaderboardItem({ user, score, rank }) {
  // Warna medali berdasarkan ranking
  const getMedalColor = () => {
    switch (rank) {
      case 1:
        return 'text-yellow-400'; // Gold
      case 2:
        return 'text-gray-300'; // Silver
      case 3:
        return 'text-orange-400'; // Bronze
      default:
        return 'text-text-muted';
    }
  };

  const getRankBadge = () => {
    if (rank <= 3) {
      return (
        <div className={`${getMedalColor()} flex items-center justify-center w-8`}>
          <BiTrophy size={24} />
        </div>
      );
    }
    return (
      <div className="text-text-muted font-bold w-8 text-center">
        {rank}
      </div>
    );
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
        rank <= 3
          ? 'bg-card border border-border hover:border-primary/50'
          : 'bg-dark-lighter hover:bg-card'
      }`}
    >
      {/* Rank */}
      {getRankBadge()}

      {/* Avatar */}
      <img
        src={user.avatar}
        alt={user.name}
        className={`rounded-full ${rank === 1 ? 'w-12 h-12' : 'w-10 h-10'}`}
      />

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${rank === 1 ? 'text-lg text-text' : 'text-text'}`}>
          {user.name}
        </p>
        {user.email && (
          <p className="text-text-muted text-sm truncate">{user.email}</p>
        )}
      </div>

      {/* Score */}
      <div className="text-right">
        <p className={`font-bold ${rank === 1 ? 'text-2xl text-primary' : 'text-xl text-secondary'}`}>
          {score}
        </p>
        <p className="text-text-muted text-xs">poin</p>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
