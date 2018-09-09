import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Spinner, TextInputAndLabel, Footer } from '../../common'

import firebase from 'firebase'

export default class EditBird extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Modifier une capture',
    })

    state = {
        birds: {
            // captureNumber: '',
            captureType: '',
            captureDate: '',
            capturePlace: {
               lat: '',
               lng: '',
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
    register = () => {
        if(true){
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

            this.setState({loading:true});
            let birdId = this.props.navigation.state.params.birds.id;
            // let user = firebase.auth().currentUser;
            firebase.database().ref('birds/' + birdId).set({
                // user: this.state.userData,
                id: birdId,
                // userId: firebase.auth().currentUser.uid,
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
                user: {
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    email: this.state.user.email,
                }
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
        this.props.navigation.navigate('SingleBird');
        alert('Oiseau modifié');
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
        let birds = this.props.navigation.state.params.birds;
        this.setState({
            captureType: birds.captureType,
            captureDate: birds.captureDate,
            capturePlaceName: birds.capturePlaceName,
            ring_nbr: birds.ring_nbr,
            name: birds.name,
            latin_name: birds.latin_name,
            ring_type: birds.ring_type,
            ring_nbr_series: birds.ring_nbr_series,
            wingspan: birds.wingspan,
            mass: birds.mass,
            adiposity: birds.adiposity,
            sex: birds.sex,
            age: birds.age,
            capturePlace: {
                lat: birds.capturePlace.lat,
                lng: birds.capturePlace.lng,
            },
            user: {
                firstName: birds.user.firstName,
                lastName: birds.user.lastName,
                email: birds.user.email,
            },
            loadind:true
        });
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
                                <View>
                                    <Text>créé par: {this.state.user.firstName} {this.state.user.lastName}</Text>
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
                                        label='Est-ce une reprise? (oui ou non)'
                                        value={this.state.firstCapture}
                                        onChangeText={ firstCapture => this.setState({firstCapture}) }/>
                                </View>
                                <View>
                                    <TextInputAndLabel
                                        label='Technique de capture'
                                        value={this.state.captureType}
                                        placeholder='Au filet...'
                                        onChangeText={ captureType => this.setState({captureType}) }/>
                                </View>
                                <View>
                                    <TextInputAndLabel
                                        label='Sexe (m ou f)'
                                        value={this.state.sex}
                                        onChangeText={ sex => this.setState({sex}) }/>
                                </View>
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
                                        label='Âge (en années)'
                                        keyboardType={'numeric'}
                                        value={this.state.age}
                                        onChangeText={ age => this.setState({age}) }/>
                                </View>
                                <View>
                                    <TextInputAndLabel
                                        label='Numero de la bague'
                                        keyboardType={'numeric'}
                                        value={this.state.ring_nbr}
                                        onChangeText={ ring_nbr => this.setState({ring_nbr}) }/>
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
                                        label='Date de capture'
                                        value={this.state.captureDate}
                                        onChangeText={ captureDate => this.setState({captureDate}) }/>
                                </View>
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
                                <View>
                                    <TextInputAndLabel
                                        label="Envergure (en cm)"
                                        keyboardType={'numeric'}
                                        value={this.state.wingspan}
                                        onChangeText={ wingspan => this.setState({wingspan}) }/>
                                </View>
                                <View>
                                    <View>
                                        <TouchableOpacity
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
