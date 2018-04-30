import React, { Component } from 'react'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default class Activity extends Component {
    render() {
        return (
            <ActivityIndicator
                size="small" color="white"
                animating={this.props.animating}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center'
    }
})