import React from 'react';
import * as S from './styles';
import { Text } from 'react-native';

export function LocationCard({id, name, type, dimension}) {
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    return (    
        <S.Container>
            <S.Description>
                <S.NameTitle>Name: {name}</S.NameTitle>
                <S.Name><B>Id:</B> {id}</S.Name>
                <S.Name><B>Type:</B> {type} </S.Name>
                <S.Name><B>Dimension:</B> {dimension} </S.Name>
            </S.Description>
        </S.Container>
    );
}
