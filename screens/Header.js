import React from 'react';
import {Appbar, Title} from 'react-native-paper';

const Header = props => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: '#00aaff',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <Title style={{color: '#fff', fontWeight: 'bold'}}>{props.name}</Title>
    </Appbar.Header>
  );
};

export default Header;
