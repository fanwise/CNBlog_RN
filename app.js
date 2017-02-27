import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Platform, ActivityIndicator, Image, Navigator } from "react-native";
import Content from './content';
import Header from './header';
import Footer from './footer';
import Dimensions from 'Dimensions';

var {screenWidth, screenHeight} = Dimensions.get('window');
var ContentType = { List: 'list', Detial: 'detial' }

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentType: ContentType.List,
            blogId: 0
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{ title: "RN博客园", index: 0 }}
                configureScene={(route, routeStack) => ({
                    ...Navigator.SceneConfigs.VerticalUpSwipeJump,
                    gestures: {
                        pop: {},
                    }
                })}
                renderScene={(route, navigator) =>
                    <Image source={require('./icon/wallpaper.jpg')} style={styles.backgroundImage}>
                        <View style={styles.container}>
                            <Header
                                title={route.title}
                                index={route.index}
                                onBack={() => {
                                    if (route.index > 0) {
                                        navigator.pop();
                                        this.setState({
                                            contentType: ContentType.List
                                        })
                                    }
                                }}
                            />
                            <Content
                                onForward={(title, Id) => {
                                    const nextIndex = route.index + 1;
                                    this.setState({
                                        contentType: ContentType.Detial,
                                        blogId: Id
                                    });
                                    navigator.push({
                                        title: title,
                                        index: nextIndex,
                                    });
                                }}
                                contentType={this.state.contentType}
                                blogId={this.state.blogId}
                            />
                            <Footer />
                        </View>
                    </Image>
                }
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