function App() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-text mb-4">
        🚀 Night Space Forum
      </h1>
      <p className="text-text-muted mb-6">
        Selamat datang di forum diskusi bertema luar angkasa!
      </p>
      
      {/* Card Test */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-text mb-2">
          Card dengan Class Baru
        </h2>
        <p className="text-text-muted">
          Sekarang penamaan warna lebih intuitif!
        </p>
      </div>
      
      {/* Button Test */}
      <div className="flex gap-4 mb-6">
        <button className="btn-primary">
          Primary Button
        </button>
        <button className="btn-secondary">
          Secondary Button
        </button>
      </div>
      
      {/* Input Test */}
      <input 
        type="text" 
        placeholder="Coba ketik sesuatu..." 
        className="input-field w-full max-w-md mb-6"
      />
      
      {/* Status Colors */}
      <div className="flex gap-4">
        <span className="text-success">✓ Success</span>
        <span className="text-error">✗ Error</span>
        <span className="text-warning">⚠ Warning</span>
        <span className="text-upvote">▲ 10</span>
        <span className="text-downvote">▼ 2</span>
      </div>
    </div>
  );
}

export default App;
