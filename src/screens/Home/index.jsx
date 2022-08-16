import React, { useState, useEffect, useCallback } from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, Alert, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { AvatarCard } from '../../components/AvatarCard';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(openApp, 3000);
function openApp(){
  SplashScreen.hideAsync();
}

export function Home() {
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [charactersModal, setCharactersModal] = useState({});
  const [bigData, setBigData] = useState([]); 
  const [textInputValue, setTextInputValue] = useState('');
  const [ page, setPage] = useState(1);
  const [ totalPages, setTotalPages] = useState(0);
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

  function handleModalOpen(item){
    setModalVisible(true);
    setCharactersModal(item);
  }

  function handleSearchCharacter(){
    handleModalOpen(true);
    let filtered = bigData.filter(function(obj) { return obj.id == textInputValue; });
    setCharactersModal(filtered[0]);
  }

  async function fetchCharacter(){
    if (totalPages > 0 && page > totalPages) return (setListLoading(false));
    try {
      const response = await api.get(`/character/?page=${page}`);
      const { results, info } = response.data;
      setBigData(arr => [...arr, ...results]);
      setTotalPages(info.pages)
      setPage(page + 1);

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCharacter();
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
                <S.BigTitle>Rick and Morty</S.BigTitle>
                <S.SubTitle>Learn more about pop culture</S.SubTitle>
              </S.Header>

              <S.Search>
                <S.TextInput
                  value={Text}
                  placeholder="Search by character ID"
                  placeholderTextColor='#CCC'
                  keyboardType="numeric"
                  onChangeText={setTextInputValue}
                />

                <S.IconButton onPress={handleSearchCharacter}>
                  <Feather name="search" size={24} color="white" />
                </S.IconButton>
              </S.Search>
          </S.BlackTable>


          <S.WhiteTable>
              <S.Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                  <S.CenteredView>
                    <S.ModalView>

                      <S.ModalAvatar source={{uri: charactersModal.image}}/>
                      
                      <S.ModalText><B>ID:</B> {charactersModal.id}</S.ModalText>
                      <S.ModalText><B>Name:</B> {charactersModal.name}</S.ModalText>
                      <S.ModalText><B>Gender:</B> {charactersModal.gender}</S.ModalText>
                      <S.ModalText><B>Species:</B> {charactersModal.species}</S.ModalText>
                      <S.ModalText><B>Type:</B> {charactersModal.type ? charactersModal.type : 'unknown' }</S.ModalText>
                      <S.ModalText><B>Status:</B> {charactersModal.status}</S.ModalText>

                      <S.Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <S.ButtonText>Close details</S.ButtonText>
                      </S.Pressable>
                    </S.ModalView>
                </S.CenteredView>
              </S.Modal>


          { loading ? <LoadAnimation /> : 
              <S.CharacterList 
                data={bigData}
                keyExtractor={item => String(item.id)}
                onEndReached={fetchCharacter}
                onEndReachedThreshold={0.2}
                ListFooterComponent={() => listLoading ? <S.LoadingView> <LoadAnimation /> </S.LoadingView> : <Text/>}
                renderItem={({item}) => 
                  <AvatarCard 
                    onPress={() => handleModalOpen(item)}
                    image={item.image} 
                    name={item.name} 
                    status={item.status} 
                    species={item.species} 
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