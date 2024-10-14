import * as React from 'react';
import {StackActions} from '@react-navigation/native';
/**
   * addListener: ƒ addListener(type, callback)
canGoBack: ƒ canGoBack()
dangerouslyGetParent: ƒ dangerouslyGetParent()
dangerouslyGetState: ƒ dangerouslyGetState()
dispatch: ƒ dispatch(action)
getCurrentOptions: ƒ ()
getCurrentRoute: ƒ ()
getRootState: ƒ ()
goBack: ƒ ()
navigate: ƒ ()
removeListener: ƒ removeListener(type, callback)
reset: ƒ ()
resetRoot: ƒ (state)
setParams: ƒ ()
   */
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function reset(...args) {
  navigationRef.current?.dispatch(StackActions.reset(...args));
}
