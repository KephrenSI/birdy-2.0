/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage, Text } from 'react-native';
import { Header, Footer } from './src/components/common';

import Navigator from './src/Router'

import * as firebase from 'firebase';


console.ignoredYellowBox = [
    'Setting a timer'
];

export default class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyBzfbKvUwuCeATyy-OXJ25hw02Tak1DTVM",
            authDomain: "birdy-session2.firebaseapp.com",
            databaseURL: "https://birdy-session2.firebaseio.com",
            projectId: "birdy-session2",
            storageBucket: "birdy-session2.appspot.com",
            messagingSenderId: "961180564419"
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
            <View style={{flexGrow:1, maxHeight:'100%'}}>
              <Header content={'Birdy'} />
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                    <Navigator/>
                </ScrollView>
            </View>
        );
    }
}
