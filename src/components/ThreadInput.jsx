import { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ onAddThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Judul tidak boleh kosong!');
      return;
    }
    if (!body.trim()) {
      alert('Isi thread tidak boleh kosong!');
      return;
    }

    onAddThread({ title, body, category: category.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-text font-medium mb-2">
          Judul <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tulis judul thread yang menarik..."
          className="input-field"
          maxLength={100}
        />
        <p className="text-text-muted text-xs mt-1 text-right">
          {title.length}/100
        </p>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-text font-medium mb-2">
          Kategori <span className="text-text-muted text-sm">(opsional)</span>
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
          placeholder="contoh: react, javascript, redux"
          className="input-field"
          maxLength={30}
        />
        <p className="text-text-muted text-xs mt-1">
          Kategori membantu pengguna lain menemukan thread kamu
        </p>
      </div>

      {/* Body */}
      <div>
        <label htmlFor="body" className="block text-text font-medium mb-2">
          Isi Thread <span className="text-error">*</span>
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tulis isi diskusi kamu di sini...&#10;&#10;Tips: Jelaskan dengan detail agar pengguna lain mudah memahami dan membantu."
          rows={10}
          className="input-field resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1">
          Publikasikan Thread
        </button>
      </div>
    </form>
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default ThreadInput;
