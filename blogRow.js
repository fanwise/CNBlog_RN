import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Dimensions from 'Dimensions';
import BlogDetailComponent from './blogDetailComponent';
import Utils from './utils'

var {screenWidth, screenHeight} = Dimensions.get('window');

export default class BlogRow extends Component {
    handlePressRow() {
        this.cacheSummary();
        const { navigator } = this.props;
        if (navigator) {
            const nextIndex = this.props.route.index + 1;
            navigator.push({
                title: this.props.title,
                index: nextIndex,
                blogId: this.props.blogId,
                component: BlogDetailComponent
            })
        }
    }
    cacheSummary = () => {
        const summary = {
            'blogId': this.props.blogId,
            'title': this.props.title,
            'avatar': this.props.avatar,
            'summary': this.props.summary,
            'views': this.props.views,
            'diggs': this.props.diggs,
            'comments': this.props.comments,
            'published': this.props.published
        }
        AsyncStorage.setItem(this.props.blogId + 'tmp' + 'summary', JSON.stringify(summary));
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.section} onPress={this.handlePressRow.bind(this)}>
                    <View style={styles.header}>
                        <Text numberOfLines={2} style={styles.title}>{this.props.title}</Text>
                        <Image
                            source={this.props.avatar ? { uri: this.props.avatar } : require('./icon/avator.jpg')}
                            style={this.props.avatar ? styles.avator : styles.defaultAvator} />
                    </View>
                    <View style={styles.content}>
                        <Text numberOfLines={3} style={styles.summary}>{this.props.summary}</Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.icons}>
                            <Image
                                style={styles.icon}
                                source={require('./icon/read.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.views}</Text>
                            <Image
                                style={styles.icon}
                                source={require('./icon/like.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.diggs}</Text>
                            <Image
                                style={styles.icon}
                                source={require('./icon/comment.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.comments}</Text>
                        </View>
                        <View>
                            <Text style={styles.time}>{Utils.formatTime(this.props.published)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        height: 175,
        backgroundColor: '#65D9E3',
        opacity: .9,
        borderRadius: 6,
        shadowColor: '#333',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: .8
    },
    section: {
        height: 175,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    header: {
        paddingTop: 20,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        width: 260,
        color: '#FFF'
    },
    avator: {
        borderRadius: 20,
        width: 40,
        height: 40
    },
    defaultAvator: {
        borderRadius: 20,
        width: 40,
        height: 40,
        opacity: .3
    },
    content: {
        paddingHorizontal: 20
    },
    summary: {
        fontSize: 14,
        color: '#FFF'
    },
    footer: {
        marginHorizontal: 20,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icons: {
        flexDirection: 'row'
    },
    icon: {
        width: 16,
        height: 16
    },
    iconNumber: {
        paddingHorizontal: 5,
        color: '#FFF'
    },
    time: {
        color: 'rgba(255, 255, 255, 1.0)'
    }
});
