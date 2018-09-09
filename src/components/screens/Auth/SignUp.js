import React, {Component} from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native'
import { Button, h2 } from 'react-native-elements'
import { Spinner, TextInputAndLabel, Footer } from '../../common'

import firebase from 'firebase'

export default class SignUp extends Component{

    state = {
        firstName:'',
        lastName:'',
        bageurId:'',
        email : '',
        password : '',
        confirmPassword : '',
        loading : false,
    }
    // state = {
    //     firstName:'Alain',
    //     lastName:'Loudmer',
    //     bageurId:'1835793028713',
    //     email : 'a@a.aa',
    //     password : 'aaaaaa',
    //     confirmPassword : 'aaaaaa',
    //     loading : false,
    // }

    register = () => {

        if(this.state.firstName === '') {
            alert('Veuillez entrer votre Prénom');
            return false;
        }
        if(this.state.lastName === '') {
            alert('Veuillez entrer votre Nom');
            return false;
        }
        if(this.state.bageurId === '') {
            alert('Veuillez entrer votre Id de chasseur');
            return false;
        }
        let number = /^[0-9]*$/;
        if(number.test(this.state.bageurId) === false) {
            alert('Veuillez entrer un Id de chasseur valide');
            return false;
        }
        if(this.state.email === ''){
            alert('Veuillez entrer votre email');
            return false;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false){
            alert('Veuillez entrer une email valide');
            return false;
        }
        if(this.state.password === ''){
            alert('Veuillez choisir un mot de passe');
            return false;
        }
        if(this.state.confirmPassword === ''){
            alert('Veuillez répéter le mot de passe');
            return false;
        }
        if(this.state.password !== this.state.confirmPassword){
            alert('Les mots de passe sont différents');
            return false;
        }
        this.setState({loading:true});
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( reponse => {
            //--------------- try to add name
            let user = firebase.auth().currentUser;
            user.updateProfile({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
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
    }

    onRegisterSuccess = () =>{
        AsyncStorage.setItem('userEmail', this.state.email);
        AsyncStorage.setItem('userPassword', this.state.password);
        this.writeUserData();
        console.log('register & login success');
        this.props.navigation.navigate('SignIn');
        this.setState({loading:false});
    }

    writeUserData() {
        let user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            bageurId: this.state.bageurId,
            email: this.state.email,
            userId: user.uid
        });
    }

    render(){
        return(
            <View style={styles.container}>
                {(this.state.loading) ? (
                    <View>
                        <Spinner />
                    </View>
                ):(
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                        <View style={styles.box}>
                            <Image
                                 style={styles.logo}
                                 source={require('../../assets/img/Logo.png')}
                             />
                            <Text style={styles.h2}> Inscription </Text>
                            <View>
                                <TextInputAndLabel
                                  placeholder={'Jean'}
                                    label='Prénom'
                                    value={this.state.firstName}
                                    onChangeText={ firstName => this.setState({firstName}) }/>
                            </View>
                            <View>
                                <TextInputAndLabel
                                    label='Nom'
                                    placeholder={'Bom'}
                                    value={this.state.lastName}
                                    onChangeText={ lastName => this.setState({lastName}) }/>
                            </View>
                            <View>
                                <TextInputAndLabel
                                    label='Numero de Chasseur'
                                    placeholder={'1983023878267'}
                                    value={this.state.bageurId}
                                    keyboardType = 'numeric'
                                    onChangeText={ bageurId => this.setState({bageurId}) }/>
                            </View>
                            <View>
                                <TextInputAndLabel
                                    label='Email'
                                    placeholder='example@test.com'
                                    autoCapitalize={'none'}
                                    keyboardType={'email-address'}
                                    value={this.state.email}
                                    onChangeText={ email => this.setState({email}) }/>
                            </View>
                            <View>
                                <TextInputAndLabel
                                    label='Password'
                                    placeholder={'Entrez votre mot de passe'}
                                    secureTextEntry
                                    autoCapitalize={'none'}
                                    value={this.state.password}
                                    onChangeText={ password => this.setState({password}) }/>
                            </View>
                            <View>
                                <TextInputAndLabel
                                    label='Confirm password'
                                    placeholder={'Répétez votre mot de passe'}
                                    secureTextEntry
                                    autoCapitalize={'none'}
                                    value={this.state.confirmPassword}
                                    onChangeText={ confirmPassword => this.setState({confirmPassword}) }/>
                            </View>
                            <View style={styles.buttonsBloc}>
                                <View>
                                    <Button
                                        buttonStyle={styles.button}
                                        large
                                        ref={'login'}
                                        onPress={() => {this.register();}}
                                        title="S'inscrire" />
                                </View>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')}>
                                    <Text style={styles.link}>Déjà inscrit ?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </ScrollView>
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
        alignItems: 'center',
    },
    logo: {
      flex: 1,
        width: 155,
        height: 118,
        marginTop: 50,
    },
    h2: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    buttonsBloc: {
      marginTop: 25,
    },
    button: {
        borderRadius: 50,
        backgroundColor: '#DA22FF',
        marginBottom: 20,
        width: '100%',
    },
    link: {
        color: '#DA22FF',
        textAlign: 'center',
    }
})
