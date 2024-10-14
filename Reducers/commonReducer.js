import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from '../actionTypes/commonActionTypes';

const initialState = {
  count: 0,
};

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: action.count + 1,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: action.count - 1,
      };

    default:
      return state;
  }
}

export default commonReducer;
