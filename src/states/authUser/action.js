import { 
  login, 
  register, 
  putAccessToken, 
  getOwnProfile 
} from '../../utils/api';
import { setAuthUser, unsetAuthUser } from './reducer';
import { showSuccessToast, showErrorToast, showInfoToast } from '../../utils/toast';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Async Thunk: Register
function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await register({ name, email, password });
      showSuccessToast('Registrasi berhasil! Silakan login.');
      return { success: true };
    } catch (error) {
      showErrorToast(error.message);
      return { success: false };
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Async Thunk: Login
function asyncLoginUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await login({ email, password });
      putAccessToken(token);
      const authUser = await getOwnProfile();
      dispatch(setAuthUser(authUser));
      showSuccessToast(`Selamat datang, ${authUser.name}!`);
      return { success: true };
    } catch (error) {
      showErrorToast(error.message);
      return { success: false };
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Async Thunk: Logout
function asyncLogoutUser() {
  return (dispatch) => {
    dispatch(unsetAuthUser());
    putAccessToken('');
    showInfoToast('Anda telah logout.');
  };
}

export { asyncRegisterUser, asyncLoginUser, asyncLogoutUser };
