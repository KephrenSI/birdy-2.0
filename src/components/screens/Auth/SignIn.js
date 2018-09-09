import React, {Component} from 'react'
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { Button, h2 } from 'react-native-elements'
import { Spinner, TextInputAndLabel } from '../../common'

import firebase from 'firebase'

export default class SignIn extends Component{

    state = {
        email : '',
        password : '',
        loading : true,
    };
    // state = {
    //     email : 'a@a.aa',
    //     password : 'aaaaaa',
    //     loading : true,
    // };

    async reconnect(){
        let userEmail = await AsyncStorage.getItem('userEmail');
        let userPassword = await AsyncStorage.getItem('userPassword');
        if(userEmail && userPassword){
            this.setState({loading:true});
            firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
                .then( () => this.onReconnectSuccess() )
                .catch((error) => {
                    this.setState({loading:false});
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log('auth/login error : ' + errorCode + ' - ' + errorMessage);
                    alert(errorMessage);
                });
        }else{
            this.setState({loading:false});
        }

    }

    login = () => {
        this.setState({loading:true});
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( () => this.onLoginSuccess() )
            .catch((error) => {
                this.setState({loading:false});
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('auth/login error : ' + errorCode + ' - ' + errorMessage);
                alert(errorMessage);
            });
    }

    onLoginSuccess = () =>{
        console.log('login success');
        AsyncStorage.setItem('userEmail', this.state.email);
        AsyncStorage.setItem('userPassword', this.state.password);
        this.props.navigation.navigate('Feed');
        this.setState({loading:false});
    }

    onReconnectSuccess = () =>{
        console.log('reconnect success');
        this.props.navigation.navigate('Feed');
        this.setState({loading:false});
    }

    componentWillMount(){
        this.reconnect();
    }

    render(){
        return(
            <View style={styles.container}>
                {(this.state.loading) ? (
                    <View>
                        <Spinner />
                    </View>
                ):(
                <ImageBackground style={styles.backgroundImage} source={require('../../assets/img/AuthBcg.jpg')}>
                    <ScrollView  contentContainerStyle={{flexGrow:1}}>
                            <View style={styles.box}>
                                <Text style={styles.h2}> Connexion </Text>
                                <View>
                                    <TextInputAndLabel
                                        label='Email'
                                        placeholder='example@test.com'
                                        value={this.state.email}
                                        autoCapitalize={'none'}
                                        keyboardType={'email-address'}
                                        onChangeText={ email => this.setState({email}) }
                                        error=''/>
                                </View>
                                <View>
                                    <TextInputAndLabel
                                        label='Password'
                                        placeholder={'Entrez votre mot de passe'}
                                        secureTextEntry
                                        autoCapitalize={'none'}
                                        value={this.state.password}
                                        onChangeText={ password => this.setState({password}) }
                                        error=''/>
                                </View>
                                <View style={styles.buttonsBloc}>
                                    <View>
                                        <Button
                                            buttonStyle={styles.button}
                                            large
                                            ref={'login'}
                                            onPress={() => {this.login();}}
                                            title='Se connecter'
                                        />
                                    </View>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
                                        <Text style={styles.link}>Créer un compte</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </ScrollView>
                </ImageBackground>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    box: {
        // padding: 20,
        // // backgroundColor: 'white',
        // marginLeft: 20,
        // marginRight: 20,
        // marginTop: 160,
        // marginBottom: 20,
        // borderRadius: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 20,
        // alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    h2: {
        fontSize: 30,
        // textAlign: 'center',
        margin: 10,
    },
    buttonsBloc: {
      marginTop: 25,
    },
    button: {
        borderRadius: 50,
        backgroundColor: '#DA22FF',
        marginBottom: 20,
    },
    link: {
        color: '#DA22FF',
        textAlign: 'center',
    }
})
