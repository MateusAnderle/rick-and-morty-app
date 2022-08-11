import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: #1C1E21;
    justify-content: center;
    align-items: center;
`;

export const BlackTable = styled.View`
    flex: 1;
    margin-top: 40px;
    width: 93%;
    flex-direction: row;
    padding-bottom: 10px;
`;

export const WhiteTable = styled.View`
    flex: 7;
    align-items: center;
    background-color: #FFF;
    width: 93%;
    height: auto;
    margin-bottom: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px;
`;

export const Header = styled.View`
    flex: 5;
    justify-content: center;
`;

export const BigTitle = styled.Text`
    color: #FFF;
    font-size: 35px;
    font-weight: 700;
`;

export const SubTitle = styled.Text`
    color: #fff;
`;

export const IconButton = styled.TouchableOpacity``;

export const Search = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;