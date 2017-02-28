import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Platform, ActivityIndicator, Image, Navigator } from 'react-native';
import Header from './header';
import Footer from './footer';
import BlogListComponent from './blogListComponent';
import Dimensions from 'Dimensions';

var {screenWidth, screenHeight} = Dimensions.get('window');

export default class App extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    title: 'RN博客园',
                    index: 0,
                    blogId: 0,
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
                        <Image source={require('./icon/wallpaper.jpg')} style={styles.backgroundImage}>
                            <View style={styles.container}>
                                <Header
                                    route={route}
                                    navigator={navigator}
                                />
                                <route.component
                                    route={route}
                                    navigator={navigator}
                                />
                                <Footer />
                            </View>
                        </Image>
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        backgroundColor: "#30B3EE88"
    },
});
