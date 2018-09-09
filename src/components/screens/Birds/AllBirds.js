import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import { Spinner, TextInputAndLabel, Footer } from '../../common'

import firebase from 'firebase'

export default class AllBirds extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Toutes les captures',
    })

    render(){
        return(
            <View>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                    <View>
                        <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
