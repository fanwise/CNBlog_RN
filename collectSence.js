import React, { Component } from 'react';
import {View, Text, StyleSheet, Navigator } from 'react-native';
import Header from './header';

export default class CollectSence extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{
                    title: '我的收藏',
                    index: 0,
                    blogId: 0,
                }}
                configureScene={(route, routeStack) => ({
                    ...Navigator.SceneConfigs.VerticalUpSwipeJump,
                    gestures: {
                        pop: {},
                    }
                })}
                renderScene={(route, navigator) => {
                    return (
                        <View style={styles.container}>
                            <Header
                                route={route}
                                navigator={navigator}
                            />
                        </View>
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#30B3EE88"
    }
});