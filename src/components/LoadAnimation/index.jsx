import React from 'react';
import { ActivityIndicator } from 'react-native';

import {
    Container
} from './styles';

export function LoadAnimation(){
  return (
    <Container>
        <ActivityIndicator/>
    </Container>
  );
}