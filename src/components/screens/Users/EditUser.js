import React, {Component} from 'react'
import { Image, Text, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import { Spinner, TextInputAndLabel, Footer } from '../../common'

import firebase from 'firebase'

export default class Edit extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Modifier mon profil',
    })

    state = {
        firstName: '',
        lastName: '',
        email: '',
        // photoProfil: '',
        //
        // firstName: 'Pierre',
        // lastName: 'Paul',
        // email: 'r@r.rr',
        bageurId: '',
        photoProfil: '',
        loading : false,
    }

    updateProfile() {
        let currentUser = firebase.auth().currentUser;
        if(this.state.email === ''){
            alert('Veuillez choisir une email');
            return false;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false){
            alert('Veuillez choisir une email valide');
            return false;
        }
        this.setState({loading:true});
        // let currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            // email: this.state.email,
            // photoProfil: this.state.photoProfil,
        }).then(() => {
            // this.updateEmail();
            let currentUser = firebase.auth().currentUser;
            currentUser.updateEmail(this.state.email).then(()=>{
                this.onSaveSuccess();
            }).catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('EditUser/save error : ' + errorCode + ' - ' + errorMessage);
            });
        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('EditUser/save error : ' + errorCode + ' - ' + errorMessage);
        });
    }

    updateEmail() {
        let currentUser = firebase.auth().currentUser;
        currentUser.updateEmail(
            this.state.email
        ).then(() => {
            this.onSaveSuccess();
        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('EditUser/save error : ' + errorCode + ' - ' + errorMessage);
        });
    }

    onSaveSuccess = () =>{
        console.log('update success');
        AsyncStorage.setItem('userEmail', this.state.email);
        this. writeUserData();
        this.props.navigation.navigate('SingleUser');
        this.setState({loading:false});
    }

    writeUserData() {
        let currentUser = firebase.auth().currentUser;
        firebase.database().ref('users/' + currentUser.uid).set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            uid: currentUser.uid,
            bageurId: this.state.bageurId,
            photoProfil: this.state.photoProfil,
        });
    }

    componentWillMount() {
        let currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + currentUserId).once('value', snapshot => {
            let users = snapshot.val();
            this.setState({email:users.email, firstName:users.firstName, lastName:users.lastName});
        }).then(()=>this.setState({loading:false}));
    }

    render(){
        return (
            <View>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                  <PhotoUpload
                       onPhotoSelect={avatar => {
                         if (avatar) {
                           this.setState({
                             photoProfil: avatar
                           })
                           console.log('Image base64 string: ', avatar)
                         }
                       }}
                     >
                     <Image
                       style={{
                         paddingVertical: 30,
                         width: 150,
                         height: 150,
                         borderRadius: 75
                       }}
                       resizeMode='cover'
                       source={{
                         uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                       }}
                     />
                   </PhotoUpload>
                    <View>
                        {(this.state.loading) ? (
                            <View>
                                <Spinner />
                            </View>
                        ):(
                            <View>
                                <View>
                                    <TextInputAndLabel
                                        label='Prénom'
                                        value={this.state.firstName}
                                        onChangeText={ firstName => this.setState({firstName}) }/>
                                </View>
                                <View>
                                    <TextInputAndLabel
                                        label='Nom'
                                        value={this.state.lastName}
                                        onChangeText={ lastName => this.setState({lastName}) }/>
                                </View>
                                <View>
                                    <TextInputAndLabel
                                        label='Email'
                                        autoCapitalize={'none'}
                                        keyboardType={'email-address'}
                                        value={this.state.email}
                                        onChangeText={ email => this.setState({email}) }/>
                                </View>
                                <View>
                                    <View>
                                        <TouchableOpacity
                                            ref={'login'}
                                            onPress={() => {this.updateProfile();}}>
                                            <Text>Enregistrer</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                    <View>
                        <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
