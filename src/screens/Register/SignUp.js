import React, {Component} from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import styles from './styles'
import firebase from 'firebase'
import { Spinner, TextInputAndLabel, Footer } from '../../components/common'

export default class SignUp extends Component{

    // state = {
    //     email : 'aa@a.nn',
    //     displayName:'John Doe',
    //     loading : false,
    //     password : '000000',
    //     confirmPassword : '000000',
    // };
    state = {
        email : '',
        displayName:'',
        loading : false,
        password : '',
        confirmPassword : '',
    };

    register = () => {
        if(this.state.email === ''){
            alert('Veuillez choisir une email');
            return false;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false){
            alert('Veuillez choisir une email valide');
            return false;
        }
        if(this.state.password === ''){
            alert('Veuillez choisir un password');
            return false;
        }
        if(this.state.confirmPassword === ''){
            alert('Veuillez répéter le password');
            return false;
        }
        if(this.state.password !== this.state.confirmPassword){
            alert('Les passwords sont différents');
            return false;
        }
        this.setState({loading:true});
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( reponse => {
            //--------------- try to add name
            let user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: this.state.displayName,
            }).then(()=>{
                let user = firebase.auth().currentUser;
                user.updateEmail(this.state.email).then(()=>{
                    this.onRegisterSuccess();
                }).catch(function(error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log('Edit/save error : ' + errorCode + ' - ' + errorMessage);
                });
            }).catch((error)=>{
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('SignUp/register(add name) error : ' + errorCode + ' - ' + errorMessage);
            });
        } )
            .catch((error) => {
                this.setState({loading:false});
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('SignUp/register error : ' + errorCode + ' : ' + errorMessage);
                alert(errorMessage);
            });
    };

    onRegisterSuccess = () =>{
        AsyncStorage.setItem('userEmail', this.state.email);
        AsyncStorage.setItem('userPassword', this.state.password);
        this.writeUserData();
        console.log('register & login success');
        this.props.navigation.navigate('User');
        this.setState({loading:false});
    };

    writeUserData() {
        let user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).set({
            displayName: this.state.displayName,
            email: this.state.email,
            uid: user.uid
        });
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
                                            autoCapitalize={'none'}
                                            keyboardType={'email-address'}
                                            value={this.state.email}
                                            onChangeText={ email => this.setState({email}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Nom Complet'
                                            value={this.state.displayName}
                                            onChangeText={ displayName => this.setState({displayName}) }/>
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
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Confirm password'
                                            placeholder={'Répétez votre mot de passe'}
                                            secureTextEntry
                                            autoCapitalize={'none'}
                                            value={this.state.confirmPassword}
                                            onChangeText={ confirmPassword => this.setState({confirmPassword}) }/>
                                    </View>
                                    <View>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                ref={'login'}
                                                style={styles.button}
                                                onPress={() => {this.register();}}>
                                                <Text style={styles.buttonText}>Créer le compte</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>

                        <View style={styles.footerContainer}>
                            <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                        </View>
                    </ScrollView>
                </View>
        );
    }
}
