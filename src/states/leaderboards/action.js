import { getLeaderboards } from '../../utils/api';
import { receiveLeaderboards } from './reducer';

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await getLeaderboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncReceiveLeaderboards };
