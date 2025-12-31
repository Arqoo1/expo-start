// jest-setup.js

// Add extra matchers from @testing-library/jest-native
import "@testing-library/jest-native/extend-expect";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock timers (useful if your components use setTimeout, setInterval, etc.)
// jest.useFakeTimers();

// // Optional: suppress warning messages in test output
// jest.spyOn(console, 'warn').mockImplementation(() => {});
// jest.spyOn(console, 'error').mockImplementation(() => {});

// // Optional: mock native modules that may break tests
// import { NativeModules } from 'react-native';

// NativeModules.RNCAsyncStorage = {
//   setItem: jest.fn(),
//   getItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
// };

// // Optional: mock react-native-gesture-handler (common in Expo apps)
// jest.mock('react-native-gesture-handler', () => {
//   const View = require('react-native').View;
//   return {
//     Swipeable: View,
//     DrawerLayout: View,
//     State: {},
//     PanGestureHandler: View,
//     TapGestureHandler: View,
//     LongPressGestureHandler: View,
//   };
// });
