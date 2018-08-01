import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import styles from './styles'
import firebase from 'firebase'
import { Spinner, TextInputAndLabel, Footer } from '../../components/common'

export default class AddBirds extends Component{

    state = {
        name: '',
        Adiposity: '', // 1 to 5
        age: '', // in year
        uid: '',
        bandType: '',
        bandNumber: '',
        firstbanding: '', //"oui" or "non"
        how: '',
        mass: '', // in gramme
        sex: '', // "m" or "f"
        when: '', // aaaa-mm-jj
        where: '', // sentence or long + lat
        wingspan: '', //in cm
        lat: '',
        lng: '',
        user_id: '',
        loadind:false
    };

    register = () => {
        if(true){
            this.setState({loading:true});
            let birdUid = firebase.database().ref().child('birdBanding').push().key;
            firebase.database().ref('birdBanding/' + birdUid).set({
                Adiposity: this.state.Adiposity,
                age: this.state.age,
                uid: birdUid,
                bandType: this.state.bandType,
                bandNumber: this.state.bandNumber,
                firstbanding: this.state.firstbanding,
                how: this.state.how,
                mass: this.state.mass,
                name: this.state.name,
                sex: this.state.sex,
                when: this.state.when,
                where: '',
                wingspan: this.state.wingspan,
                user_id: this.state.user_id,
                lat: this.state.lat,
                lng: this.state.user_id,
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
    };

    onRegisterSuccess = () =>{
        console.log('bird register success');
        this.props.navigation.navigate('AddBirds');
        this.setState({loading:false});
        ToastAndroid.show('Bien enregistré', ToastAndroid.SHORT);
    };

    componentWillMount(){
        let me = firebase.auth().currentUser;
        this.setState({myUid:me.uid});

        let theDate = new Date();
        theDate = theDate.getFullYear() + '-' + theDate.getMonth()+1 + '-' + (theDate.getDate() < 10 ? '0' + theDate.getDate() : theDate.getDate());
        this.setState({when: theDate});
    }

    render(){
        return(
                <View style={styles.container}>
                    <ScrollView  contentContainerStyle={{flexGrow:1}}>
                        <View style={styles.content}>
                            {(this.state.loading) ? (
                                <View style={styles.spinnerContainer}>
                                    <Spinner />
                                </View>
                            ):(
                                <View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Nom latin'
                                            value={this.state.name}
                                            onChangeText={ name => this.setState({name}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Type de bague'
                                            value={this.state.bandType}
                                            onChangeText={ bandType => this.setState({bandType}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Est-ce une reprise? (oui ou non)'
                                            value={this.state.firstbanding}
                                            onChangeText={ firstbanding => this.setState({firstbanding}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Technique de capture'
                                            value={this.state.how}
                                            placeholder='Au filet...'
                                            onChangeText={ how => this.setState({how}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Sexe (m ou f)'
                                            value={this.state.sex}
                                            onChangeText={ sex => this.setState({sex}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Nom du lieu'
                                            value={this.state.where}
                                            onChangeText={ where => this.setState({where}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Âge (en années)'
                                            keyboardType={'numeric'}
                                            value={this.state.age}
                                            onChangeText={ age => this.setState({age}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Numero de la bague'
                                            keyboardType={'numeric'}
                                            value={this.state.bandNumber}
                                            onChangeText={ bandNumber => this.setState({bandNumber}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label='Poids (en grammes)'
                                            keyboardType={'numeric'}
                                            value={this.state.mass}
                                            onChangeText={ mass => this.setState({mass}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            label="Longueure à l'air (en cm)"
                                            keyboardType={'numeric'}
                                            value={this.state.wingspan}
                                            onChangeText={ wingspan => this.setState({wingspan}) }/>
                                    </View>





                                    <View>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                ref={'login'}
                                                style={styles.button}
                                                onPress={() => {this.register();}}>
                                                <Text style={styles.buttonText}>Enregister</Text>
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
