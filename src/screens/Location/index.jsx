import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, Text } from 'react-native';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import { LocationCard } from '../../components/LocationCard';

export function Location() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState([]);
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

  useEffect(()=>{
    async function fetchLocation(){ 
      try {

        for (let i = 1; i <= 126; i++) {
          let responseNova = await api.get('/location/' + i);
          setLocation(arr => [...arr, responseNova.data]);
        }


      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    fetchLocation();
  }, []);
  
 
    return (
      <S.Container>
        <ImageBackground source={require('../../assets/splash.jpg')} style={styles.imageBackground}>

        <StatusBar 
            barStyle='light-content'
            translucent
            backgroundColor='transparent'
        />

          <S.BlackTable>
              <S.Header>
                <S.BigTitle>Locations</S.BigTitle>
                <S.SubTitle>See all locations in the Rickverse</S.SubTitle>
              </S.Header>
          </S.BlackTable>


          <S.WhiteTable>
            { loading ? <LoadAnimation /> : 
              <S.EpisodesList 
                data={location}
                keyExtractor={item => item.name}
                renderItem={({item}) => 
                  <LocationCard 
                    id={item.id} 
                    name={item.name} 
                    type={item.type} 
                    dimension={item.dimension} 
                  />
                }
              />
           }
                    
          </S.WhiteTable>
        </ImageBackground>
      </S.Container>
    );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
});