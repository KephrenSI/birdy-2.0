import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid, FlatList, StyleSheet} from 'react-native'
import { Spinner, TextInputAndLabel, Footer } from '../../common'

import firebase from 'firebase'

export default class MyFeed extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Mes captures',
    });

    state = {
        users: {},
        myFeed: null,
        loading: true,
    };

    componentWillMount(){
        firebase.database().ref('users/').once('value').then((snapshot)=>{
            let users=[];
            snapshot.forEach((item)=>{
                users.push(item.val());
            });
            this.setState({users});
        })
        .then(()=>{
            let currentUser = firebase.auth().currentUser;
            firebase.database().ref('birds/').once('value').then((snapshot)=>{
                let myFeed=[];
                snapshot.forEach((item)=>{
                    currentUser.uid === item.val().userId && myFeed.push(item.val());
                });
                this.setState({myFeed});
            })
            .then(()=>{
                this.setState({loading:false});
            })
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
                    <View>
                        <FlatList
                            keyExtractor={ (item, index) => item.uid }
                            data={this.state.myFeed}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.captureBloc} onPress={() => this.props.navigation.navigate('MyFeed', {birds:item})}>
                                    <View style={styles.captureCard}>
                                        <Text style={styles.captureCardHead}>{item.name}</Text>
                                        <Text style={styles.captureCardMember}>Chasseur : {item.user.firstName} {item.user.lastName}</Text>
                                        <Text style={styles.captureCardPlace}>Lieu : {item.capturePlaceName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View>
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
    captureBloc:{
      marginTop: 20,
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
});
