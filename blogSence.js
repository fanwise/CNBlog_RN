import React, { Component } from 'react';
import {View, Text, StyleSheet, Navigator } from 'react-native';
import Header from './header';
import BlogListComponent from './blogListComponent';

export default class BlogSence extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    title: 'RN博客园',
                    index: 0,
                    blogId: 0,
                    sence: 'blog',
                    component: BlogListComponent
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
                            <route.component
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