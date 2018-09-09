import React from 'react'
import { Header } from '../../common'

import Feed from '../Home/Feed'
import MyFeed from '../Home/MyFeed'
import SingleUser from '../Users/SingleUser'
import EditUser from '../Users/EditUser'
import AllUsers from '../Users/AllUsers'
import SingleBird from '../Birds/SingleBird'
import EditBird from '../Birds/EditBird'
import AddBirds from '../Birds/AddBirds'
import AllBirds from '../Birds/AllBirds'

import Encyclopedia from '../Encyclopedia/Encyclopedia'
import SingleBirdEncyclopedia from '../Encyclopedia/SingleBirdEncyclopedia'

import { createStackNavigator } from 'react-navigation';

export default StackNavigator = createStackNavigator(
    {
        Feed: {
            screen: Feed,
            // navigationOptions: {
            //     header: props => <Header {...props} />,
            // }
        },
        MyFeed: {
            screen: MyFeed,
        },
        SingleUser: {
            screen: SingleUser,
        },
        EditUser: {
            screen: EditUser,
        },
        AllUsers: {
            screen: AllUsers,
        },
        SingleBird: {
            screen: SingleBird,
        },
        EditBird: {
            screen: EditBird,
        },
        AddBirds: {
            screen: AddBirds,
        },
        AllBirds: {
            screen: AllBirds,
        },
        Encyclopedia: {
            screen: Encyclopedia,
        },
        SingleBirdEncyclopedia: {
            screen: SingleBirdEncyclopedia,
        },
    },{
        navigationOptions: {
            gesturesEnabled: false,
        }
    }
)
