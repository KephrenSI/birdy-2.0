import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Spinner, TextInputAndLabel, Footer } from '../../common'

import firebase from 'firebase'

export default class AddBirds extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Ajouter un oiseau',
    })

    state = {
        // captureNumber: '',
        captureType: '',
        captureDate: ''  ,
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
        loadind:false
    }

    register = () => {
        if(this.state.captureType === '') {
            alert('Veuillez entrer le type de capture');
            return false;
        }
        if(this.state.captureDate === '') {
            alert('Veuillez entrer la date de la capture');
            return false;
        }
        if(this.state.capturePlaceName === '') {
            alert('Veuillez entrer le nom du lieu de capture');
            return false;
        }
        if(this.state.ring_nbr === '') {
            alert('Veuillez entrer le numéro de bague');
            return false;
        }
        if(this.state.name === '') {
            alert('Veuillez entrer le nom de l\'oiseau');
            return false;
        }
        if(this.state.latin_name === '') {
            alert('Veuillez entrer le nom latin de l\'oiseau');
            return false;
        }
        if(this.state.ring_type === '') {
            alert('Veuillez entrer le type de bague');
            return false;
        }
        if(this.state.ring_nbr_series === '') {
            alert('Veuillez entrer le numéro de série de la bague');
            return false;
        }
        if(this.state.wingspan === '') {
            alert('Veuillez entrer l\'envergure de l\'oiseau');
            return false;
        }
        if(this.state.mass === '') {
            alert('Veuillez entrer le poids de l\'oiseau');
            return false;
        }
        if(this.state.adiposity === '') {
            alert('Veuillez entrer l\'adiposité de l\'oiseau');
            return false;
        }
        if(this.state.sex === '') {
            alert('Veuillez entrer le sex de l\'oiseau');
            return false;
        }
        if(this.state.age === '') {
            alert('Veuillez entrer l\'âge de l\'oiseau');
            return false;
        }
        if(true){
            this.setState({loading:true});
            let birdId = firebase.database().ref().child('birds').push().key;
            let user = firebase.auth().currentUser;
            firebase.database().ref('birds/' + birdId).set({
                // userData: {},
                //
                // captureType: this.state.captureType,
                // captureDate: this.state.captureDate,
                // capturePlace: {
                //     lat: this.state.capturePlace.lat,
                //     long: this.state.capturePlace.long,
                // },
                // firstCapture: this.state.firstCapture,
                // ring_nbr: this.state.ring_nbr,
                // name: this.state.name,
                // latin_name : this.state.latin_name,
                // ring_type: this.state.ring_type,
                // ring_nbr_series: this.state.ring_nbr_series,
                // wingspan: this.state.wingspan,
                // mass: this.state.mass,
                // adiposity: this.state.adiposity,
                // sex: this.state.sex,
                // age: this.state.age,

                // id: this.state.birdId,
                user: this.state.userData,
                id: birdId,
                userId: firebase.auth().currentUser.uid,
                captureType: this.state.captureType,
                captureDate: this.state.captureDate,
                capturePlaceName: this.state.capturePlaceName,
                      // location: this.state.capturePlace,
                ring_nbr: this.state.ring_nbr,
                name: this.state.name,
                latin_name: this.state.latin_name,
                ring_type: this.state.ring_type,
                ring_nbr_series: this.state.ring_nbr_series,
                wingspan: this.state.wingspan,
                mass: this.state.mass,
                adiposity: this.state.adiposity,
                sex: this.state.sex,
                age: this.state.age,
                capturePlace: {
                    lat: this.state.capturePlace.lat,
                    lng: this.state.capturePlace.lng,
                },
                // captureNumber: this.state.captureNumber,

            }).catch((error)=>{
                this.setState({loading:false});
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('Capture/register error : ' + errorCode + ' : ' + errorMessage);
                alert(errorMessage);
            }).then(()=>{
                this.onRegisterSuccess();
            });
        }
    }

    onRegisterSuccess = () =>{
        console.log('bird register success');
        this.props.navigation.navigate('Feed');
        this.setState({loading:false});
        ToastAndroid.show('Bien enregistré', ToastAndroid.SHORT);
    }

    // componentWillMount(){
    //     let currentUser = firebase.auth().currentUser;
    //     this.setState({currentUserId: currentUser.uid});
    //
    //     let theDate = new Date();
    //     theDate = theDate.getFullYear() + '-' + theDate.getMonth()+1 + '-' + (theDate.getDate() < 10 ? '0' + theDate.getDate() : theDate.getDate());
    //     this.setState({when: theDate});
    // }


    componentWillMount(){
        let currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + currentUserId).on("value", snapshot => {
            this.setState({ userData: snapshot.val()})
        })
    }

    // location
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    capturePlace: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    error: null,
                });
            },
            (error) =>{
                this.setState({ error: error.message })
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 500 },
        );
    }

    render(){
        return(
                <View>
                    <ScrollView  contentContainerStyle={{flexGrow:1}}>
                        <View>
                            {(this.state.loading) ? (
                                <View>
                                    <Spinner />
                                </View>
                            ):(
                                <View>
                                    {/*<View>
                                        <TextInputAndLabel
                                            label='Numero de capture'
                                            keyboardType={'numeric'}
                                            value={this.state.captureNumber}
                                            onChangeText={ captureNumber => this.setState({captureNumber}) }/>
                                    </View>*/}
                                    <View>
                                        <TextInputAndLabel
                                            label='Type de capture'
                                            value={this.state.captureType}
                                            placeholder='Au filet...'
                                            onChangeText={ captureType => this.setState({captureType}) }/>
                                    </View>
                                    {/*<View>
                                        <TextInputAndLabel
                                            label='Date de capture'
                                            value={this.state.captureDate}
                                            onChangeText={ captureDate => this.setState({captureDate}) }/>
                                    </View>*/}
                                    <View>
                                        <DatePicker
                                            style={{width: 200}}
                                            date={this.state.captureDate}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD-MM-YYYY"
                                            minDate="01-01-2000"
                                            maxDate="01-01-2050"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                              dateIcon: {
                                                display: 'none',
                                                // position: 'absolute',
                                                // left: 0,
                                                // top: 4,
                                                // marginLeft: 0
                                              },
                                              dateInput: {
                                                // marginLeft: 36
                                              }
                                              // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={ captureDate => this.setState({captureDate}) }
                                          />
                                    </View>
                                    {/*<View>
                                        <TextInputAndLabel
                                            label='Lieu de capture'
                                            value={this.state.capturePlace}
                                            onChangeText={ capturePlace => this.setState({capturePlace}) }/>
                                    </View>*/}
                                    {/*<View>
                                        <GooglePlacesAutocomplete
                                            placeholder='Rechercher le lieu'
                                            minLength={2} // minimum length of text to search
                                            autoFocus={false}
                                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                            listViewDisplayed='auto'    // true/false/undefined
                                            fetchDetails={true}
                                            renderDescription={row => row.description} // custom description render

                                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                                console.log(data, details);
                                                const location = details.geometry.location;
                                                { this.setState({ capturePlace: location }) }
                                            }}
                                            query={{
                                                // available options: https://developers.google.com/places/web-service/autocomplete
                                                key: 'AIzaSyBNk53aHYX1_hDqdU8iK-OkMGIZ0iuD4-w',
                                                language: 'fr', // language of the results
                                                types: '(cities)' // default: 'geocode'
                                            }}

                                            styles={{
                                                textInputContainer: {
                                                    width: '100%'
                                                },
                                                description: {
                                                    fontWeight: 'bold'
                                                },
                                                predefinedPlacesDescription: {
                                                    color: '#1faadb'
                                                }
                                            }}

                                            currentLocation={true} // Will add a 'Position actuelle' button at the top of the predefined places list
                                            currentLocationLabel="Position actuelle"
                                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                            GoogleReverseGeocodingQuery={{
                                              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                            }}

                                            GooglePlacesSearchQuery={{
                                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                                rankby: 'distance',
                                            }}

                                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                            debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                                        />
                                    </View>*/}
                                    <View>
                                        <TextInputAndLabel
                                            label='Nom du lieu'
                                            value={this.state.capturePlaceName}
                                            onChangeText={ capturePlaceName => this.setState({capturePlaceName}) }/>
                                    </View>
                                    <View>
                                        <Text>{this.state.error}</Text>
                                        <Text>Latitude: {this.state.capturePlace.lat}</Text>
                                        <Text>Longitude: {this.state.capturePlace.lng}</Text>
                                        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Est-ce une reprise? (oui ou non)'
                                            value={this.state.firstCapture}
                                            onChangeText={ firstCapture => this.setState({firstCapture}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Numero de bague'
                                            keyboardType={'numeric'}
                                            value={this.state.ring_nbr}
                                            onChangeText={ ring_nbr => this.setState({ring_nbr}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Nom'
                                            value={this.state.name}
                                            onChangeText={ name => this.setState({name}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Nom latin'
                                            value={this.state.latin_name}
                                            onChangeText={ latin_name => this.setState({latin_name}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Type de bague'
                                            value={this.state.ring_type}
                                            onChangeText={ ring_type => this.setState({ring_type}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Numéro de série de la bague'
                                            keyboardType={'numeric'}
                                            value={this.state.ring_nbr_series}
                                            onChangeText={ ring_nbr_series => this.setState({ring_nbr_series}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label="Longueure à l'air (en cm)"
                                            keyboardType={'numeric'}
                                            value={this.state.wingspan}
                                            onChangeText={ wingspan => this.setState({wingspan}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Poids (en grammes)'
                                            keyboardType={'numeric'}
                                            value={this.state.mass}
                                            onChangeText={ mass => this.setState({mass}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Adiposité'
                                            keyboardType={'numeric'}
                                            value={this.state.adiposity}
                                            onChangeText={ adiposity => this.setState({adiposity}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Sexe (m ou f)'
                                            value={this.state.sex}
                                            onChangeText={ sex => this.setState({sex}) }/>
                                    </View>
                                    <View>
                                        <TextInputAndLabel
                                            label='Âge (en années)'
                                            keyboardType={'numeric'}
                                            value={this.state.age}
                                            onChangeText={ age => this.setState({age}) }/>
                                    </View>

                                    <View>
                                        <View>
                                            <TouchableOpacity
                                                ref={'login'}
                                                onPress={() => {this.register();}}>
                                                <Text>Enregister</Text>
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
