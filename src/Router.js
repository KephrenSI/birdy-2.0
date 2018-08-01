import React from 'react';
import { StackNavigator  } from 'react-navigation';

import User from './screens/Profil/User'
import SignUp from './screens/Register/SignUp'
import Login from './screens/Auth/Login'
import Edit from './screens/EditProfil/Edit'
import Menu from './screens/Navigation/Menu'
import AllUsers from './screens/Members/AllUsers'
import AllBirds from './screens/Encyclopedia/AllBirds'
import SingleBird from './screens/BirdProfil/SingleBird'
import AddBirds from './screens/Capture/AddBirds'
import LastBirds from './screens/Accueil/LastBirds'



export default Navigator = StackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            },
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                title: 'Créer votre compte',
            },
        },
        User: {
            screen: User,
        },
        LastBirds: {
            screen: LastBirds,
        },
        AddBirds: {
            screen: AddBirds,
            navigationOptions: {
                title: 'Ajouter un oiseau',
            },
        },
        SingleBird: {
            screen: SingleBird,
        },
        AllUsers: {
            screen: AllUsers,
        },
        Menu: {
            screen: Menu,
        },
        AllBirds: {
            screen: AllBirds,
        },
        Edit: {
            screen: Edit,
            navigationOptions: {
                title: 'Éditez votre profile',
            },
        },
    },
    {
        headerMode: 'float',
        initialRouteName: 'Login',
        navigationOptions: {
        //
        }
    }
);
