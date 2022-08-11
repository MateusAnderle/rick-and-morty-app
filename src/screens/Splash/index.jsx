import React from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';

export function Splash() {
    return (
      <S.Container>
        <ImageBackground source={require('../../assets/splash.jpg')} style={styles.imageBackground}>
          <StatusBar 
              barStyle='light-content'
              translucent
              backgroundColor='transparent'
          />

          <S.SplashTitle>
            <ActivityIndicator size="large" color="#FFF" />
          </S.SplashTitle>

        </ImageBackground>
      </S.Container>
    );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    opacity: 1,
  }
})