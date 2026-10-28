import {Platform} from 'react-native';

// Android emulator reaches the host machine via 10.0.2.2.
// iOS simulator can use localhost. Physical devices need your LAN IP.
const DEV_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const env = {
  apiBaseUrl: `http://${DEV_HOST}:4000`,
};

export default env;
