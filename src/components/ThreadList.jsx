import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, authUser, onUpVote, onDownVote, onNeutralizeVote }) {
  if (threads.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-text-muted text-lg">Belum ada thread.</p>
        <p className="text-text-muted text-sm mt-2">Jadilah yang pertama membuat diskusi!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralizeVote={onNeutralizeVote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  authUser: PropTypes.object,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default ThreadList;
