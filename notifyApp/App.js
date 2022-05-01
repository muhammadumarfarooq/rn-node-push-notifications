import React from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar, Text,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: () => {},
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
    {
      channelId: "test-channel",
      channelName: "Test channel",
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const showNotification = () => {
      console.log('called...');
    PushNotification.localNotification({
      channelId: "test-channel",
        title: 'New Order Alert',
        message: `Please open to accept order`,
        ignoreInForeground: false,
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity onPress={showNotification}>
        <Text>Click me to show notification!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
