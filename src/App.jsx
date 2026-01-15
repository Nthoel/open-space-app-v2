function App() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-night-100 mb-4">
        🚀 Night Space Forum
      </h1>
      <p className="text-night-100/80 mb-6">
        Selamat datang di forum diskusi bertema luar angkasa!
      </p>
      <div className="bg-night-800 p-6 rounded-lg border border-night-700">
        <h2 className="text-xl font-semibold text-night-100 mb-2">
          Setup Berhasil!
        </h2>
        <p className="text-night-100/70">
          Jika kamu melihat card ini dengan warna ungu, Tailwind &amp; Tema Night Space aktif!
        </p>
        <button className="mt-4 bg-night-700 hover:bg-night-100 hover:text-night-900 text-night-100 px-4 py-2 rounded transition-colors">
          Tombol Test
        </button>
      </div>
    </div>
  );
}

export default App;
