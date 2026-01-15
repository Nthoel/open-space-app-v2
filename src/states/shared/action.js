import { getAllThreads, getAllUsers } from '../../utils/api';
import { receiveThreads } from '../threads/reducer';
import { receiveUsers } from '../users/reducer';

// Async Thunk: Populate Threads & Users sekaligus
function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      const [users, threads] = await Promise.all([
        getAllUsers(),
        getAllThreads(),
      ]);

      dispatch(receiveUsers(users));
      dispatch(receiveThreads(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersAndThreads };
