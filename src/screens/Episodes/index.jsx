import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, Text } from 'react-native';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import { EpisodesCard } from '../../components/EpisodesCard';


export function Episodes() {
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
 
  function handleModalOpen(item){
    setCharactersModal(item);
  }

  useEffect(()=>{
    async function fetchEpisodes(){ 
      try {

        for (let i = 1; i <= 51; i++) {
          let responseNova = await api.get('/episode/' + i);
          setEpisodes(arr => [...arr, responseNova.data]);
        }

      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    fetchEpisodes();
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
                <S.BigTitle>Episodes</S.BigTitle>
                <S.SubTitle>See all episodes already aired</S.SubTitle>
              </S.Header>
          </S.BlackTable>


          <S.WhiteTable>
            { loading ? <LoadAnimation /> : 
              <S.EpisodesList 
                data={episodes}
                keyExtractor={item => item.name}
                renderItem={({item}) => 
                  <EpisodesCard 
                    onPress={() => handleModalOpen(item.characters)}
                    id={item.id} 
                    name={item.name} 
                    airDate={item.air_date} 
                    episode={item.episode} 
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