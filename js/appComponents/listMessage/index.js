
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
    Container, Header, Title, Content, Button, Icon,
    List, Spinner
} from 'native-base';
import { Image, AsyncStorage, BackAndroid } from 'react-native';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import EachMessage from './EachMessage'
import {listMessageProcess} from '../../actions/listMessage'

class listMessage extends Component {

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        this.props.listMessageProcess(this.props.token)
    }

    render() {
        const {item, navigator, dataUser} = this.props
        let ItemNodes = item.map((data)=> {
            if (dataUser.id == data.Item.UserId || dataUser.id == data.Item2.UserId) {
                return(
                    <EachMessage key={data.id} items={data} title={data.title} itemMessageId={data.id} navigator={navigator} activeUser={dataUser}/>
                )
            } else {
            }
        })

        if (item.length === 0) {
            return (
                <Container style={styles.container}>
                    <Content>
                        <Spinner color='green' />
                    </Content>
                </Container>
            )
        }
        else {
            return (
                <Container theme={myTheme} style={styles.container}>
                    <Header>
                        <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>MESSAGES</Title>
                        <Button transparent onPress={() => navigator.pop()}>
                            <Icon name="ios-arrow-back"/>
                        </Button>
                        <Button transparent onPress={() => this.props.listMessageProcess(this.props.token)}>
                            <Icon name="ios-refresh"/>
                        </Button>
                    </Header>

                    <Content>
                        <List>
                            {ItemNodes}
                        </List>
                    </Content>
                </Container>
            )
        }
    }
}

function bindAction(dispatch) {
    return {
        listMessageProcess: (token) => dispatch(listMessageProcess(token)),
    };
}

const mapStateToProps = state => ({
    item: state.listMessage
});

export default connect(mapStateToProps, bindAction)(listMessage);
