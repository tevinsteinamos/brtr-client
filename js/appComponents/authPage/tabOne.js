
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text, View } from 'native-base';

import styles from './styles';
import FormLogin from './formLogin'


export default class TabOne extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <FormLogin />
        </Content>
      </Container>
    );
  }
}
