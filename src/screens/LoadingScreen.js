import React from 'react'
import { Image, StyleSheet, ImageBackground } from 'react-native'
import { Center } from 'native-base'

const LoadingScreen = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../images/splashbackgroundpattern.png')}
      resizeMode={'cover'}>
      <Center style={styles.logo}>
        <Image source={require('../images/logo.png')} resizeMode={'contain'} />
      </Center>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    height: '100%',
    width: '100%',
  },
  logo: {
    marginTop: '50%',
  },
});
export default LoadingScreen;
