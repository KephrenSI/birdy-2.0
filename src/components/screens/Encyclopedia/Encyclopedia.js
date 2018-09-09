import React, {Component} from 'react'
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import  { Footer, Spinner } from '../../common'

import firebase from 'firebase'

export default class AllBirds extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Encyclopedie',
    })

    state = {
        birds:{},
        loading:true
    }

    componentWillMount(){
        firebase.database().ref('encyclopedia/').once('value').then((snapshot)=>{
            let birds=[];
            snapshot.forEach((item)=>{
                birds.push(item.val());
            });
            this.setState({birds});
        }).then(()=>this.setState({loading:false}));
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
                    <View>
                        <FlatList
                            keyExtractor={ (item, index) => item.id }
                            data={this.state.birds}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('SingleBirdEncyclopedia', {id:item.id,nom:item.nom})}>
                                    <Text>{item.nom}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View>
                        <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
