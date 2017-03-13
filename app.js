import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Dimensions from 'Dimensions';
import TabNavigator from 'react-native-tab-navigator';
import BlogSence from './blogSence';
import CollectSence from './collectSence';

var {screenWidth, screenHeight} = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blog'
        }
    }
    render() {
        return (
            <Image source={require('./icon/wallpaper.jpg')} style={styles.backgroundImage}>
                <TabNavigator tabBarStyle={styles.tab}>
                    <TabNavigator.Item
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.tabText}
                        selected={this.state.selectedTab === 'blog'}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('./icon/file.png')} />}
                        renderSelectedIcon={() => <Image style={styles.tabIcon} source={require('./icon/file.png')} />}
                        title="blog"
                        onPress={() => this.setState({ selectedTab: 'blog' })}>
                        <BlogSence />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.tabText}
                        selected={this.state.selectedTab === 'collect'}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('./icon/star.png')} />}
                        renderSelectedIcon={() => <Image style={styles.tabIcon} source={require('./icon/star.png')} />}
                        title="collect"
                        onPress={() => this.setState({ selectedTab: 'collect' })}>
                        <CollectSence />
                    </TabNavigator.Item>
                </TabNavigator >
            </Image>
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
    tab: {
        backgroundColor: '#30B3EE88',
        height: 49,
        alignItems: 'center'
    },
    tabIcon: {
        width: 18,
        height: 18
    },
    tabText: {
        color: '#FFFFFF'
    }
});
