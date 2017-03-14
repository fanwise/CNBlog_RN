import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, AsyncStorage } from 'react-native';
import Network from './network'

export default class Header extends Component {
    handlePressBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop()
        }
    }
    handleSave = () => {
        AsyncStorage.getItem('summaries')
            .then((result) => {
                var isFind = false;
                var summaries = JSON.parse(result);
                if (summaries) {
                    for (var i = 0; i < summaries.length; i++) {
                        if (summaries[i].blogId == this.props.route.blogId) {
                            isFind = true;
                            break;
                        }
                    }
                }
                if (!isFind) {
                    AsyncStorage.getItem(this.props.route.blogId + 'tmp' + 'summary')
                        .then((result) => {
                            var summary = JSON.parse(result);
                            var newSummaries = summaries ? [summary, ...summaries] : [summary];
                            AsyncStorage.setItem('summaries', JSON.stringify(newSummaries));
                        })
                    AsyncStorage.getItem(this.props.route.blogId + 'tmp' + 'detail')
                        .then((result) => {
                            AsyncStorage.setItem(this.props.route.blogId + 'detail', result);
                        })
                }
                AsyncStorage.removeItem(this.props.route.blogId + 'tmp' + 'summary');
                AsyncStorage.removeItem(this.props.route.blogId + 'tmp' + 'detail');
            })
    }
    handleDelete = () => {
        AsyncStorage.getItem('summaries')
            .then((result) => {
                var summaries = JSON.parse(result);
                if (summaries) {
                    var newSummaries = summaries.filter((summary) => {
                        if(summary.blogId != this.props.route.blogId)
                            return true;
                    });
                    AsyncStorage.setItem('summaries', JSON.stringify(newSummaries));
                    AsyncStorage.removeItem(this.props.route.blogId + 'detail');
                }
            })
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    {(this.props.route.index > 0) &&
                        <TouchableOpacity style={styles.navigationButton} onPress={this.handlePressBack.bind(this)}>
                            <Text style={styles.buttonText}>&lt;返回</Text>
                        </TouchableOpacity>}
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.title}>{this.props.route.title}</Text>
                    </View>
                    {(this.props.route.index > 0) && (this.props.route.sence === 'blog') &&
                        <TouchableOpacity style={styles.navigationButton} onPress={this.handleSave.bind(this)}>
                            <Text style={styles.buttonText}>收藏</Text>
                        </TouchableOpacity>}
                    {(this.props.route.index > 0) && (this.props.route.sence === 'saved') &&
                        <TouchableOpacity style={styles.navigationButton} onPress={this.handleDelete.bind(this)}>
                            <Text style={styles.buttonText}>取消收藏</Text>
                        </TouchableOpacity>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 64,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            ios: { paddingTop: 20 }
        })
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#FFF'
    },
    navigationButton: {
        marginHorizontal: 16,
        width: 40
    },
    buttonText: {
        color: '#FFF'
    }
});