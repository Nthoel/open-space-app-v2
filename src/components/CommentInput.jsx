import { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ onAddComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Komentar tidak boleh kosong!');
      return;
    }
    onAddComment(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="comment" className="block text-text font-medium mb-2">
        Berikan Komentar
      </label>
      <textarea
        id="comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar kamu..."
        rows={4}
        className="input-field resize-none mb-3"
      />
      <button type="submit" className="btn-primary">
        Kirim Komentar
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
