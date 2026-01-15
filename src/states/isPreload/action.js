import { getAccessToken, getOwnProfile } from '../../utils/api';
import { setAuthUser } from '../authUser/reducer';
import { setIsPreload } from './reducer';

// Async Thunk: Preload (cek apakah user sudah login sebelumnya)
function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = getAccessToken();
      if (token) {
        const authUser = await getOwnProfile();
        dispatch(setAuthUser(authUser));
      }
    } catch (error) {
      // Token expired atau invalid, biarkan authUser tetap null
      console.error('Preload failed:', error.message);
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}

export { asyncPreloadProcess };
