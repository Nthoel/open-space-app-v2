import { 
  login, 
  register, 
  putAccessToken, 
  getOwnProfile 
} from '../../utils/api';
import { setAuthUser, unsetAuthUser } from './reducer';

// Async Thunk: Register
function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await register({ name, email, password });
      return { success: true };
    } catch (error) {
      alert(error.message);
      return { success: false };
    }
  };
}

// Async Thunk: Login
function asyncLoginUser({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await login({ email, password });
      putAccessToken(token);
      const authUser = await getOwnProfile();
      dispatch(setAuthUser(authUser));
      return { success: true };
    } catch (error) {
      alert(error.message);
      return { success: false };
    }
  };
}

// Async Thunk: Logout
function asyncLogoutUser() {
  return (dispatch) => {
    dispatch(unsetAuthUser());
    putAccessToken('');
  };
}

export { asyncRegisterUser, asyncLoginUser, asyncLogoutUser };
