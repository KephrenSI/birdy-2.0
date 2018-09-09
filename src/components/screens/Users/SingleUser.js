import React, {Component} from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import  { Footer, Spinner } from '../../common'

import firebase from 'firebase'

export default class User extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Mon Profil',
    });

    state = {
        users:{
            firstName: '',
            lastName: '',
            email: '',
            bageurId: '',
            photoProfil: '',
        },
    };
    componentDidMount() {
        let currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + currentUserId).on('value', snapshot => {
            this.setState({
                users: snapshot.val()
            })
        })
    }

    render(){
        if(this.state.loading){
            return(
                <View>
                    <Spinner />
                </View>
            );
        }
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
                        <FlatList
                            data={[
                                {key: 'Prénom : ' + this.state.users.firstName},
                                {key: 'Nom : ' + this.state.users.lastName},
                                {key: 'Email : ' + this.state.users.email},
                                {key: 'Identifiant de chasseur : ' + this.state.users.bageurId},
                                {key: 'Photo de profil : ' + this.state.users.photoProfil},
                            ]}
                            renderItem={({item}) => <Text>{item.key}</Text>}
                        />
                        {(this.state.myUid === this.state.uid) &&(
                            <View>
                                <TouchableOpacity
                                    onPress={() => {this.props.navigation.navigate('EditUser');}}>
                                    <Text>Editer</Text>
                                </TouchableOpacity>
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
