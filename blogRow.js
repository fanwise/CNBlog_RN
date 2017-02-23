import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Dimensions from 'Dimensions';

var {screenWidth, screenHeight} = Dimensions.get('window');

export default class BlogRow extends Component {
    formatTime(publishedTime) {
        var lastTime = new Date(publishedTime);
        var year = lastTime.getFullYear().toString();
        var month = (lastTime.getMonth() + 1).toString();
        var day = lastTime.getDate().toString();
        var hour = this.zeroize(lastTime.getHours());
        var minute = this.zeroize(lastTime.getMinutes());

        return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    }
    zeroize(value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.section}>
                    <View style={styles.header}>
                        <Text numberOfLines={2} style={styles.title}>{this.props.Title}</Text>
                        <Image
                            source={this.props.Avatar ? { uri: this.props.Avatar } : require('./icon/avator.jpg')}
                            style={this.props.Avatar ? styles.avator : styles.defaultAvator} />
                    </View>
                    <View style={styles.content}>
                        <Text numberOfLines={3} style={styles.summary}>{this.props.Description}</Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.icons}>
                            <Image
                                style={styles.icon}
                                source={require('./icon/read.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.ViewCount}</Text>
                            <Image
                                style={styles.icon}
                                source={require('./icon/like.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.DiggCount}</Text>
                            <Image
                                style={styles.icon}
                                source={require('./icon/comment.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.CommentCount}</Text>
                        </View>
                        <View>
                            <Text style={styles.time}>{this.formatTime(this.props.PostDate)}</Text>
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
        height: 175,
        backgroundColor: "#65D9E3",
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
        flexDirection: "column",
        justifyContent: "space-between"
    },
    header: {
        paddingTop: 20,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 22,
        width: 260,
        color: "#FFF"
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
        color: "#FFF"
    },
    footer: {
        marginHorizontal: 20,
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    icons: {
        flexDirection: "row"
    },
    icon: {
        width: 16,
        height: 16
    },
    iconNumber: {
        paddingHorizontal: 5,
        color: "#FFF"
    },
    time: {
        color: 'rgba(255, 255, 255, 1.0)'
    }
});
