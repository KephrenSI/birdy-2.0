import React from 'react';
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, BackHandler } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu } from '../../components/common'


export default class Menu extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Menu',
        headerRight: <BurgerMenu active={true} back={true} navigation={navigation} />,
        headerLeft:null
    });

    state = {
        user:{
            email:'AUCUN',
            uid:'AUCUN',
        },
    };

    logout = ()=>{
        firebase.auth().signOut()
            .catch(function(error) {
                console.log('profile/logout An error happened : ' + error);
            }).then(()=>{
            console.log('déconnecté');
            this.props.navigation.navigate('Login');
        });
        AsyncStorage.setItem('userEmail', '');
        AsyncStorage.setItem('userPassword', '');
    };

    componentWillMount(){
        //
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('LastBirds')} style={[styles.menuItem,styles.b]}>
                    <Text style={styles.text}>Accueil</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddBirds')} style={[styles.menuItem,styles.a]}>
                    <Text style={styles.text}>Capture</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('AllBirds')} style={[styles.menuItem,styles.b]}>
                    <Text style={styles.text}>Encyclopedie</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('AllUsers')} style={[styles.menuItem,styles.a]}>
                    <Text style={styles.text}>Les membres</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('User')} style={[styles.menuItem,styles.b]}>
                    <Text style={styles.text}>Mon profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.logout()} style={[styles.menuItem,styles.a]}>
                    <Text style={styles.text}>Se déconnecter</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
