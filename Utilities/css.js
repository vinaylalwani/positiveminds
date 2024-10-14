import { PixelRatio } from 'react-native';

export function dp(px) {
  return px / PixelRatio.get(px);
}
