/**
 * Inter-Thin - 100
 *
 * Inter-Regular - 400
 *
 * Inter-Medium - 500
 * Inter-Light - 300
 * Inter-ExtraLight - 200
 *
 * Inter-Bold - 700
 * Inter-SemiBold - 600
 * Inter-ExtraBold - 800
 * Inter-Black - 900
 *
 *
 */
import { StyleSheet } from 'react-native';

const size = {
  h1: 96,
  h1LineHeight: 112,
  h2: 60,
  h2LineHeight: 71,
  h3: 48,
  h3LineHeight: 57,
  h4: 34,
  h4LineHeight: 40,
  h5: 24,
  h5LineHeight: 28,
  h6: 20,
  body1: 16,
  body2: 14,
  sub1: 16,
  sub2: 14,
  sub2Height: 20,
  caption: 12,
  captionLineHeight: 16,
  small: 12,
};

export default StyleSheet.create({
  h1: {
    fontSize: size.h1,
    lineHeight: size.h1LineHeight,
  },
  h2: {
    fontSize: size.h2,
    lineHeight: size.h2LineHeight,
  },
  h3: {
    fontSize: size.h3,
  },
  h4: {
    fontSize: size.h4,
    lineHeight: size.h4LineHeight,
  },
  h5: {
    fontSize: size.h5,
    lineHeight: size.h5LineHeight,
  },
  h6: {
    fontSize: size.h6,
    lineHeight: size.h6 + 1,
  },
  sub1: {
    fontSize: size.sub1,
  },
  sub2: {
    fontSize: size.sub2,
    lineHeight: size.sub2Height,
  },
  caption: {
    fontSize: size.caption,
    lineHeight: size.captionLineHeight,
  },
  default: {
    fontSize: size.body2,
    lineHeight: size.body2 + 10,
  },
  small: {
    fontSize: size.small,
  },
  fontThin: {
    fontFamily: 'Inter-Thin',
  },
  fontRegular: {
    fontFamily: 'Inter-Regular',
  },
  fontMedium: {
    fontFamily: 'Inter-Medium',
  },
  fontLight: {
    fontFamily: 'Inter-Light',
  },
  fontExtraLight: {
    fontFamily: 'Inter-ExtraLight',
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
  fontSemiBold: {
    fontFamily: 'Inter-SemiBold',
  },
  fontExtraBold: {
    fontFamily: 'Inter-ExtraBold',
  },
  fontBlack: {
    fontFamily: 'Inter-Black',
  },
});
