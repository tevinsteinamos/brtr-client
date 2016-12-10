
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text } from 'native-base';

import styles from './styles';
import FormRegister from './formRegister'

export default class TabTwo extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <FormRegister />
        </Content>
      </Container>
    );
  }
}
