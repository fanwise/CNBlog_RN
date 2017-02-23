import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

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
                        <Text numberOfLines={2} style={styles.title}>{this.props.title.text}</Text>
                        <Image
                            source={this.props.author.avatar.text ? { uri: this.props.author.avatar.text } : require('./icon/avator.jpg')}
                            style={this.props.author.avatar.text ? styles.avator : styles.defaultAvator} />
                    </View>
                    <View style={styles.content}>
                        <Text numberOfLines={3} style={styles.summary}>{this.props.summary.text}</Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.icons}>
                            <Image
                                style={styles.icon}
                                source={require('./icon/read.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.views.text}</Text>
                            <Image
                                style={styles.icon}
                                source={require('./icon/like.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.diggs.text}</Text>
                            <Image
                                style={styles.icon}
                                source={require('./icon/comment.png')}
                            />
                            <Text style={styles.iconNumber}>{this.props.comments.text}</Text>
                        </View>
                        <View>
                            <Text style={styles.time}>{this.formatTime(this.props.published.text)}</Text>
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
        height: 175,
        backgroundColor: "#65D9E399"
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
        opacity : .3
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
