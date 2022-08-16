import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.View`
    flex: 1;
    background-color: #1C1E21;
    justify-content: center;
    align-items: center;
`;

export const BlackTable = styled.View`
    flex: 2;
    margin-top: 40px;
    width: 90%;
    padding-bottom: 10px;
`;

export const WhiteTable = styled.View`
    flex: 7;
    align-items: center;
    background-color: #FFF;
    width: 90%;
    height: auto;
    margin-bottom: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px;
`;

export const Header = styled.View`
    margin-top: 20px;
    justify-content: center;
    margin-bottom: 15px;
`;

export const BigTitle = styled.Text`
    color: #FFF;
    font-size: 35px;
    font-weight: 700;
`;

export const SubTitle = styled.Text`
    color: #fff;
`;

export const IconButton = styled.TouchableOpacity`
    margin-left: 10px;
`;

export const Search = styled.View`

    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;

export const TextInput = styled.TextInput`
    height: 30px;
    width: 220px;
    background-color: #fff;
    border-radius: 5px;
    padding-left: 10px;
`;


export const CharacterList = styled(FlatList).attrs({
    showsVerticalScrollIndicator: false
})`
    width: 100%;
`;

export const Modal = styled.Modal``;

export const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalView = styled.View`
    width: 80%;
    background-color: #fff;
    border-radius: 20px;
    padding: 25px;
    align-items: center;
`;

export const ModalAvatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const ModalText = styled.Text`
    margin-bottom: 10px;
    text-align: center;
`;

export const Pressable = styled.TouchableOpacity`
    border-radius: 10px;
    padding: 10px;
    background-color: #98FB98;
`;

export const ButtonText = styled.Text`
    font-weight: bold;
`;

export const LoadingView = styled.Text`
    margin-top: 10px;
    text-align: center;
    justify-content: center;
`;