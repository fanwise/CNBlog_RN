import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

export default class Header extends Component {
    handlePressBack() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop()
        }
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    {(this.props.route.index > 0) && <TouchableOpacity style={styles.navigationButton} onPress={this.handlePressBack.bind(this)}>
                        <Text style={styles.buttonText}>&lt;返回</Text>
                    </TouchableOpacity>}
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.title}>{this.props.route.title}</Text>
                    </View>
                    {(this.props.route.index > 0) && <TouchableOpacity style={styles.navigationButton}>
                        <Text style={styles.buttonText}></Text>
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