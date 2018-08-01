import React from 'react'
import { Image, Text, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import styles from './styles'
import firebase from 'firebase'
import { Spinner, TextInputAndLabel, BurgerMenu, Footer } from '../../components/common'

export default class Edit extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerRight: <BurgerMenu navigation={navigation} />,
        headerMode: 'screen'
    });

    state = {
        email : '',
        displayName:'',
        uid : '',
        img: '',
        loading : false,
    };

    save = () => {
        let user = firebase.auth().currentUser;
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
        //--------------- try to update
        user.updateProfile({
            displayName: this.state.displayName,
        }).then(()=>{
            let user = firebase.auth().currentUser;
            user.updateEmail(this.state.email).then(()=>{
                this.onSaveSuccess();
            }).catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('Edit/save error : ' + errorCode + ' - ' + errorMessage);
            });
        }).catch((error)=>{
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('Edit/save error : ' + errorCode + ' - ' + errorMessage);
        });
    };

    onSaveSuccess = () =>{
        console.log('update success');
        AsyncStorage.setItem('userEmail', this.state.email);
        this. writeUserData();
        this.props.navigation.navigate('User');
        this.setState({loading:false});
    };

    writeUserData() {
        let user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).set({
            displayName: this.state.displayName,
            email: this.state.email,
            img: this.state.img,
        });
    }

    componentWillMount(){
        let user = firebase.auth().currentUser;
        user && this.setState({email:user.email,displayName:user.displayName});
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                  <Text>{this.state.img}</Text>
                  <PhotoUpload
                       onPhotoSelect={avatar => {
                         if (avatar) {
                           this.setState({
                             img: avatar
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
                                <View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            ref={'login'}
                                            style={styles.button}
                                            onPress={() => {this.save();}}>
                                            <Text style={styles.buttonText}>Enregistrer</Text>
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
