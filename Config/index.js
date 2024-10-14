import {ConfigDev} from './index.dev';
import {ConfigTest} from './index.test';
import {ConfigProduction} from './index.production';

const CURRENT_ENV_MANUAL = 'dev'; // dev | test | production
let CONFIG_CURRENT;

if (CURRENT_ENV_MANUAL === 'dev') {
  CONFIG_CURRENT = ConfigDev;
} else if (CURRENT_ENV_MANUAL === 'test') {
  CONFIG_CURRENT = ConfigTest;
} else if (CURRENT_ENV_MANUAL === 'production') {
  CONFIG_CURRENT = ConfigProduction;
}

// console.log('CONFIG_CURRENT', CONFIG_CURRENT);

export const Config = {
  API_URL: CONFIG_CURRENT.API_URL,
  // IOS_BUNDLE_ID: CONFIG_CURRENT.IOS_BUNDLE_ID,
  // IOS_APP_STORE_ID: CONFIG_CURRENT.IOS_APP_STORE_ID,
  // IOS_MINIMUM_VERSION_ID: CONFIG_CURRENT.IOS_MINIMUM_VERSION_ID,
  ANDROID_PACKAGE_NAME: CONFIG_CURRENT.ANDROID_PACKAGE_NAME,
  ENV: CONFIG_CURRENT.ENV,
  APP_VERSION: CONFIG_CURRENT.APP_VERSION,
  RELEASE_DATE: CONFIG_CURRENT.RELEASE_DATE,
};
