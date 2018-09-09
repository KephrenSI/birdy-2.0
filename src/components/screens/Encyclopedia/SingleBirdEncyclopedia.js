import React, {Component} from 'react'
import { Text, View, FlatList, ScrollView, Image, StyleSheet } from 'react-native'
import { Footer, Spinner, SoundPlayer } from '../../common'

import firebase from 'firebase'

export default class SingleBird extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.nom,
    });

    state = {
        birds:{
            id : '',
            nom : '',
            nom_latin : '',
            famille : '',
            photoUrl : '',
            description : '',
            taille : '',
            envergure : '',
            poids : '',
            vie : '',
            alimentation : '',
            nidification : '',
            habitat : '',
            type_de_vol : '',
            distribution : '',
            chant : '',
        },
        loading:true
    }

    componentWillMount(){
        let id = this.props.navigation.state.params.id;
        firebase.database().ref('encyclopedia/' + id).once('value').then((snapshot)=>{
            let birds = snapshot.val();
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
                        <View>
                            <Image
                                style={{width: 300, height: 300}}
                                source={{uri: this.state.birds.photoUrl}}
                            />
                        </View>
                        <FlatList
                            data={[
                                // {key: 'Id :  ', content: this.state.birds.id},
                                {key: 'Nom :  ', content: this.state.birds.nom},
                                {key: 'Nom latin :  ', content: this.state.birds.nom_latin},
                                {key: 'Famille :  ', content: this.state.birds.famille},
                                // {key: 'PhotoUrl :  ', content: this.state.birds.photoUrl},
                                {key: 'Description :  ', content: this.state.birds.description},
                                {key: 'Taille :  ', content: this.state.birds.taille},
                                {key: 'Envergure :  ', content: this.state.birds.envergure},
                                {key: 'Poids :  ', content: this.state.birds.poids},
                                {key: 'Vie :  ', content: this.state.birds.vie},
                                {key: 'Alimentation :  ', content: this.state.birds.alimentation},
                                {key: 'Nidification :  ', content: this.state.birds.nidification},
                                {key: 'Habitat :  ', content: this.state.birds.habitat},
                                {key: 'Type de vol :  ', content: this.state.birds.type_de_vol},
                                // {key: 'Distribution :  ', content: this.state.birds.distribution},
                                // {key: 'Chant :  ', content: this.state.birds.chant},
                            ]}
                            renderItem={({item}) => <View><Text>{item.key}</Text><Text>{item.content}</Text></View>}
                        />
                        <Text>Répartition</Text>
                        <Text>{this.state.birds.distribution}</Text>
                        <View>
                            <Image
                                style={{width: 300, height: 300}}
                                source={{uri: this.state.birds.distribution}}
                            />
                        </View>
                        <SoundPlayer soundId={this.state.birds.id} />
                        <Text>{this.state.birds.id}</Text>
                    </View>
                        <View>
                            <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                        </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img:{
        width: '100%',
        height: '100%',
        marginBottom:15,
        // resizeMode: Image.resizeMode.contain,
        marginLeft:'auto',
        marginRight:'auto',
    },
});
