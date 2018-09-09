import React, {Component} from 'react'
import { Text, View, FlatList, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import  { Footer, Spinner } from '../../common'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import openMap from 'react-native-open-maps';

import firebase from 'firebase'

export default class SingleBird extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
    });

    state = {
        birds: {
            // userData: {},
            //
            // captureType: '',
            // captureDate: ''  ,
            // capturePlace: {
            //     lat: '',
            //     long: '',
            // },
            //
            // firstCapture: '',
            // ring_nbr: '',
            // name: '',
            // latin_name : '',
            // ring_type: '',
            // ring_nbr_series: '',
            // wingspan: '',
            // mass: '',
            // adiposity: '',
            // sex: '',
            // age: '',
            // user_id: ''

            captureNumber: '',
            captureType: '',
            captureDate: '',
            capturePlace: {
               lat: null,
               lng: null,
            },
            capturePlaceName: '',
            firstCapture: '',
            ring_nbr: '',
            name: '',
            latin_name : '',
            ring_type: '',
            ring_nbr_series: '',
            wingspan: '',
            mass: '',
            adiposity: '',
            sex: '',
            age: '',
            id: '',
            userId: '',
            user: {
                firstName: '',
                lastName: '',
                email: '',
            }
        }
    }

    componentWillMount(){
        let birdId = this.props.navigation.state.params.id;
        firebase.database().ref('birds/' + birdId).once('value').then((snapshot)=>{
            let birds = snapshot.val();
            this.setState({birds});
        }).then(()=>this.setState({loading:false}));

    }

    goToMap() {
        openMap({ latitude:this.state.birds.capturePlace.lat, longitude:this.state.birds.capturePlace.lng });
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
                        {/*{this.state.birds.capturePlace ? (
                        <View>
                            <Text>
                                Lieu de capture
                            </Text>
                            <View>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={{
                                        latitude: parseFloat(this.state.birds.capturePlace.lat),
                                        longitude: parseFloat(this.state.birds.capturePlace.lng),
                                        latitudeDelta: 0.011,
                                        longitudeDelta: 0.011
                                    }}
                                >
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: parseFloat(this.state.birds.capturePlace.lat),
                                            longitude: parseFloat(this.state.birds.capturePlace.lng),
                                        }}
                                        title={this.state.birds.capturePlaceName}
                                    />
                                </MapView>
                            </View>
                        </View>

                    ) : (
                        null
                    )}*/}



                        <View>
                            <FlatList
                                data={[
                                    {key: 'Numéro :', content: this.state.birds.captureNumber },
                                    {key: 'Type :', content: this.state.birds.captureType },
                                    {key: 'Date :', content: this.state.birds.captureDate },
                                    {key: 'Nom du lieu :', content: this.state.birds.capturePlaceName },
                                    {key: 'Latitude :', content: this.state.birds.capturePlace.lat },
                                    {key: 'Longitude :', content: this.state.birds.capturePlace.lng },
                                    {key: 'Première capture :', content: this.state.birds.firstCapture },
                                    {key: 'Nom :', content: this.state.birds.name },
                                    {key: 'Nom latin :', content: this.state.birds.latin_name },
                                    {key: 'Type de bague :', content: this.state.birds.ring_type },
                                    {key: 'Numéro de la bague :', content: this.state.birds.ring_nbr },
                                    {key: 'Numéro de série :', content: this.state.birds.ring_nbr_series },
                                    {key: 'Envergure :', content: this.state.birds.wingspan },
                                    {key: 'Poids :', content: this.state.birds.mass },
                                    {key: 'Graisse :', content: this.state.birds.adiposity },
                                    {key: 'Sex :', content: this.state.birds.sex },
                                    {key: 'Âge :', content: this.state.birds.age },
                                    {key: 'Id d\'utilisateur :', content: this.state.birds.userId },
                                    {key: 'Capturé par :', content: this.state.birds.user.firstName + ' ' + this.state.birds.user.lastName},
                                ]}
                                renderItem={({item}) => <View><Text>{item.key}</Text><Text>{item.content}</Text></View>}
                            />
                        </View>
                        <View>
                          <Button
                              onPress={() => {this.goToMap();}}
                              title="Afficher la carte" />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {this.props.navigation.navigate('EditBird', {birds:this.state.birds});}}>
                                <Text>Editer</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                        </View>
                </ScrollView>
            </View>
        );
    }
}
