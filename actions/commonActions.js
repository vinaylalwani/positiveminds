import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from '../actionTypes/commonActionTypes';

/**
 *
 */
export function incrementAction(count) {
  return {
    type: INCREMENT_COUNT,
    count: count,
  };
}

export function decrementAction() {
  return {
    type: DECREMENT_COUNT,
  };
}
