import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiArrowBack, BiRocket } from 'react-icons/bi';

import Navbar from '../components/Navbar';
import ThreadInput from '../components/ThreadInput';

import { asyncLogoutUser } from '../states/authUser/action';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.authUser);

  // Redirect jika belum login
  if (!authUser) {
    navigate('/login');
    return null;
  }

  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/');
  };

  const onAddThread = async ({ title, body, category }) => {
    const result = await dispatch(asyncAddThread({ title, body, category }));
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar authUser={authUser} onLogout={onLogout} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-muted hover:text-text mb-6 transition-colors"
        >
          <BiArrowBack size={20} />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <BiRocket size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text">Buat Diskusi Baru</h1>
          </div>
          <p className="text-text-muted">
            Bagikan ide, pertanyaan, atau topik menarik untuk didiskusikan bersama komunitas.
          </p>
        </div>

        {/* Form Card */}
        <div className="card">
          <ThreadInput onAddThread={onAddThread} />
        </div>

        {/* Tips Box */}
        <div className="mt-6 p-4 bg-dark-lighter border border-border rounded-lg">
          <h3 className="text-text font-medium mb-3">💡 Tips Membuat Thread yang Baik</h3>
          <ul className="text-text-muted text-sm space-y-2">
            <li>• <strong className="text-text">Judul jelas</strong> - Buat judul yang menggambarkan isi thread</li>
            <li>• <strong className="text-text">Kategori tepat</strong> - Pilih kategori yang relevan agar mudah ditemukan</li>
            <li>• <strong className="text-text">Isi lengkap</strong> - Jelaskan dengan detail, sertakan konteks jika perlu</li>
            <li>• <strong className="text-text">Sopan</strong> - Gunakan bahasa yang baik dan menghargai sesama</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default CreateThreadPage;
