import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, Text } from 'react-native';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import { EpisodesCard } from '../../components/EpisodesCard';


export function Episodes() {
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [ page, setPage] = useState(1);
  const [ totalPages, setTotalPages] = useState(0);
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

  async function fetchEpisodes(){ 
    if (totalPages > 0 && page > totalPages) return (setListLoading(false));
    try {
      const response = await api.get(`/episode?page=${page}`);
      const { results, info } = response.data;
      setEpisodes(arr => [...arr, ...results]);
      setTotalPages(info.pages)
      setPage(page + 1);

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
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
                keyExtractor={item => String(item.id)}
                onEndReached={fetchEpisodes}
                onEndReachedThreshold={0.2}
                ListFooterComponent={() => listLoading ? <S.LoadingView> <LoadAnimation /> </S.LoadingView> : <Text/>}
                renderItem={({item}) => 
                  <EpisodesCard 
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