import React, {Component} from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'

import styles from './styles'

import firebase from 'firebase'
// import { Spinner, TextInputAndLabel, Footer, SoundPlayer } from '../../common'
import { Spinner, TextInputAndLabel } from '../../components/common'

export default class Login extends Component{

    // state = {
    //     email : '',
    //     password : '',
    //     loading : true,
    // };

    state = {
        email : 'a@a.aa',
        password : 'aaaaaa',
        loading : true,
    };

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
    };

    onLoginSuccess = () =>{
        console.log('login success');
        AsyncStorage.setItem('userEmail', this.state.email);
        AsyncStorage.setItem('userPassword', this.state.password);
        this.props.navigation.navigate('LastBirds');
        this.setState({loading:false});
    };

    onReconnectSuccess = () =>{
        console.log('reconnect success');
        this.props.navigation.navigate('LastBirds');
        this.setState({loading:false});
    };

    componentWillMount(){
        this.reconnect();
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.content}>
                        {(this.state.loading) ? (
                            <View style={styles.spinnerContainer}>
                                <Spinner />
                            </View>
                        ):(
                            <View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        label='Email'
                                        placeholder='example@test.com'
                                        value={this.state.email}
                                        autoCapitalize={'none'}
                                        keyboardType={'email-address'}
                                        onChangeText={ email => this.setState({email}) }/>
                                </View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        label='Password'
                                        placeholder={'Entrez votre mot de passe'}
                                        secureTextEntry
                                        autoCapitalize={'none'}
                                        value={this.state.password}
                                        onChangeText={ password => this.setState({password}) }/>
                                </View>
                                <View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            ref={'login'}
                                            style={styles.button}
                                            onPress={() => {this.login();}}>
                                            <Text style={styles.buttonText}>Se connecter</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')} style={styles.signUpLink}>
                                        <Text>Créer un compte</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>

            </View>
        );
    }
}
