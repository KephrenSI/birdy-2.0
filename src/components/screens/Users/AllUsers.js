import React, {Component} from 'react'
import { Text, View, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import  { Footer, Spinner } from '../../common'

import firebase from 'firebase'

export default class AllUsers extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Membres',
    });

    state = {
        users:{},
        loading:true
    };

    componentWillMount(){
        firebase.database().ref('/users/').once('value').then((snapshot)=>{
            let users=[];
            snapshot.forEach((item)=>{
                users.push(item.val());
            });
            this.setState({users});
        }).then(()=>this.setState({loading:false}));
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

                        <FlatList
                            keyExtractor={ (item, index) => item.uid }
                            data={this.state.users}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.captureBloc} onPress={() => this.props.navigation.navigate('MyFeed', {birds:item})}>
                                    <View style={styles.captureCard}>
                                        <Text style={styles.captureCardHead}>{item.firstName} {item.lastName}</Text>
                                        <Text style={styles.captureCardMember}>{item.email}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View >
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
