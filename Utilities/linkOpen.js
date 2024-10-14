import { Linking } from 'react-native';

const linkOpen = async url => {
  try {
    await Linking.openURL(url);
  } catch (err) {
    // console.log('err', err);
  }
};

const mailOpen = async email => {
  try {
    await Linking.openURL(`mailto:${email}`);
  } catch (err) {
    // console.log('err', err);
  }
};

const phoneOpen = phone => {
  try {
    Linking.openURL(`tel:${phone}`);
  } catch (err) {
    // console.log('err', err);
  }
};

export { linkOpen, mailOpen, phoneOpen };
