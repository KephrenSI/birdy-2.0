import React from 'react'

import SignIn from './screens/Auth/SignIn'
import SignUp from './screens/Auth/SignUp'
import TabNavigator from './screens/Navigation/TabNavigator'

import { createStackNavigator } from 'react-navigation'

export default MainStackNavigator = createStackNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                header: null
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                header: null
            }
        },
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: {
                header: null
            }
        },
    },
);
