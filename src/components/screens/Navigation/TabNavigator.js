import React, { Component } from "react"
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Feed from '../Home/Feed'
import AddBirds from '../Birds/AddBirds'
import MyFeed from '../Home/MyFeed'
import SingleUser from '../Users/SingleUser'
import AllUsers from '../Users/AllUsers'
import Encyclopedia from '../Encyclopedia/Encyclopedia'
import StackNavigator from './StackNavigator'

import {createBottomTabNavigator} from 'react-navigation'

export default AppTabNavigator = createBottomTabNavigator ({
    Feed: {
        screen: StackNavigator,
        navigationOptions: {
            tabBarLabel: "Accueil",
        },
    },
    AddBirds: {
        screen: AddBirds,
        navigationOptions: {
            tabBarLabel: "Ajouter",
        },
    },
    MyFeed: {
        screen: MyFeed,
        navigationOptions: {
            tabBarLabel: "Mes captures",
        },
    },
    SingleUser: {
        screen: SingleUser,
        navigationOptions: {
            tabBarLabel: "Profil",
        },
    },
    AllUsers: {
        screen: AllUsers,
        navigationOptions: {
            tabBarLabel: "Membres",
        },
    },
    Encyclopedia: {
        screen: Encyclopedia,
        navigationOptions: {
            tabBarLabel: "Encyclopedie",
        },
    },
},{
    // tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: '#DA22FF',
    }
  })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
