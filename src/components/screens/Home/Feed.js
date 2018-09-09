import React, {Component} from 'react'
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView, Image, geolocation, StyleSheet } from 'react-native'
import  { Footer, Header, Spinner } from '../../common'

import firebase from 'firebase'

export default class Feed extends Component{
    static navigationOptions = ({ navigation }) => ({
        // title: 'Accueil',
        header: null,
    });

    state = {
        users:{
            email: AsyncStorage.getItem('userEmail'),
            firstName:'',
            lastPlace: null,
        },
        // myUserId: null,
        birds: null,
        loading:true
    };

    onRegionChange(region) {
        this.state.region.setValue(region);
    }

    componentWillMount(){
        firebase.database().ref('birds/').once('value').then((snapshot)=>{
            let birds=[];
            snapshot.forEach((item)=>{
                birds.push(item.val());
            });
            this.setState({birds});
        }).then(()=>this.setState({loading:false}));

        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + userId).on("value", snapshot => {
            this.setState({ users: snapshot.val() })
        })


        // Get the Storage service for the app
        let storage = firebase.storage();
        storage.ref('/birds.png').getDownloadURL().catch( () => false ).then( url => this.setState({birds:url}) );
        let theDate = new Date();
    }

    logout = ()=>{
        firebase.auth().signOut()
            .catch(function(error) {
                console.log('profile/logout An error happened : ' + error);
            }).then(()=>{
            console.log('déconnecté');
            this.props.navigation.navigate('SignIn');
        });
        AsyncStorage.setItem('userEmail', '');
        AsyncStorage.setItem('userPassword', '');
    }

    render(){
        return (
          <View style={styles.container}>
              {(this.state.loading) ? (
                  <View>
                      <Spinner />
                  </View>
              ):(
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                        <View>
                            <Header/>
                            <View style={styles.bloc}>
                                <View style={styles.welcomeContainer}>
                                    <Text style={styles.welcome}> Bonjour {this.state.users.firstName}!</Text>
                                </View>
                            </View>
                            <View>
                                <FlatList
                                    keyExtractor={ (item, index) => item.id }
                                    data={this.state.birds}
                                    renderItem={({item}) => (
                                        <TouchableOpacity style={styles.captureBloc} onPress={() => this.props.navigation.navigate('SingleBird', {id: item.id, nom: item.name})}>
                                            <View style={styles.captureCard}>
                                                <Text style={styles.captureCardHead}>{item.name}</Text>
                                                <Text style={styles.captureCardMember}>Chasseur : {item.user.firstName} {item.user.lastName}</Text>
                                                <Text style={styles.captureCardPlace}>Lieu : {item.capturePlaceName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <View style={styles.absoluteBtn}>
                                <TouchableOpacity onPress={()=>this.logout()}>
                                    <Text style={styles.btnTxt}>Se déconnecter</Text>
                                </TouchableOpacity>
                            </View>
                            <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
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
        backgroundColor: 'white',
    },
    bloc:{
        alignItems: 'center',
    },
    welcomeContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: 200,
        position: 'relative',
        top: -25,
        zIndex: 2,
    },
    welcome:{
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 25,
    },
    captureBloc:{
    },
    captureCard:{
        backgroundColor: '#DA22FF',
        borderRadius: 10,
        marginRight: 20,
        marginLeft: 20,
        padding: 20,
    },
    captureCardHead:{
        fontSize: 30,
        marginBottom: 10,
        color: 'white',
    },
    captureCardMember:{
        color: 'white',
    },
    captureCardPlace:{
        color: 'white',
    },
    absoluteBtn:{
        position: 'absolute',
        marginTop: 20,
        right: 20,
        backgroundColor: '#DA22FF',
        padding: 10,
        borderRadius: 50,
        zIndex: 2
    },
    btnTxt:{
      color: 'white',
    },
});
