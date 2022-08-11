import React from 'react';
import * as S from './styles';
import { Text } from 'react-native'

export function AvatarCard({onPress, image, name, status, species}) {

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    return (

      <S.Touchable onPress={onPress}>  
        <S.Container>
            <S.BoxImage>
                <S.Image source={{uri: image}}/>
            </S.BoxImage>

            <S.Description>
                <S.Name><B>Name:</B> {name}</S.Name>
                <S.Status><B>Status:</B> {status}</S.Status>
                <S.Species><B>Species:</B> {species}</S.Species>
            </S.Description>
        </S.Container>
      </S.Touchable>
    );
}
