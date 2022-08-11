import React from 'react';
import * as S from './styles';
import { Text } from 'react-native';


export function EpisodesCard({ id, name, airDate, episode}) {

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    return (    
        <S.Container>
            <S.Description>
                <S.NameTitle>Episode Number: {id}</S.NameTitle>
                <S.Name><B>Episode Name:</B> {name}</S.Name>
                <S.Name><B>Air Date:</B> {airDate}</S.Name>
                <S.Name><B>Season/Episode:</B> {episode}</S.Name>
            </S.Description>
        </S.Container>
    );
}
