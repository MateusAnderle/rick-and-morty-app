import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import { EpisodesCard } from '../../components/EpisodesCard';


export function Episodes() {
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState({});
  const [charactersModal, setCharactersModal] = useState({});
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
 


  function handleModalOpen(item){
    setModalVisible(true);
    setCharactersModal(item);
  }

  useEffect(()=>{
    async function fetchEpisodes(){ 
      try {
        const response = await api.get('/episode');
        setEpisodes(response.data);

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

              <S.Search>
                <S.IconButton>
                  <Feather name="search" size={24} color="white" />
                </S.IconButton>
              </S.Search>
          </S.BlackTable>


          <S.WhiteTable>
            { loading ? <LoadAnimation /> : 
              <S.EpisodesList 
                data={episodes.results}
                keyExtractor={item => item.id}
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