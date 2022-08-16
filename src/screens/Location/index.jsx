import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, Text } from 'react-native';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import { LocationCard } from '../../components/LocationCard';

export function Location() {
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [location, setLocation] = useState([]);
  const [ page, setPage] = useState(1);
  const [ totalPages, setTotalPages] = useState(0);
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;


  async function fetchLocation(){ 
    if (totalPages > 0 && page > totalPages) return (setListLoading(false));
    try {
      const response = await api.get(`/location?page=${page}`);
      const { results, info } = response.data;
      setLocation(arr => [...arr, ...results]);
      setTotalPages(info.pages)
      setPage(page + 1);

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
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
                keyExtractor={item => String(item.id)}
                onEndReached={fetchLocation}
                onEndReachedThreshold={0.2}
                ListFooterComponent={() => listLoading ? <S.LoadingView> <LoadAnimation /> </S.LoadingView> : <Text/>}
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