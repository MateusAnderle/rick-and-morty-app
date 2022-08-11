import React from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Splash() {
  const navigation = useNavigation();

  setTimeout(
    function startApp(){
      navigation.navigate('Home')
    }, 2000
  )
 
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

//<TouchableOpacity onPress={startApp} style={{width: 50, height: 50, backgroundColor: 'FFF'}}></TouchableOpacity>