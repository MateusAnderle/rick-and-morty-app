import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { StatusBar, ImageBackground, StyleSheet, Alert, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { AvatarCard } from '../../components/AvatarCard';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';


export function Home() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [charactersModal, setCharactersModal] = useState({});
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

  function handleModalOpen(item){
    setModalVisible(true);
    setCharactersModal(item);
  }

  useEffect(()=>{
    async function fetchCharacter(){
      try {
        const response = await api.get('/character');
        setCharacters(response.data);

      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
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
                <S.IconButton>
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
                data={characters.results}
                keyExtractor={item => item.id}
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