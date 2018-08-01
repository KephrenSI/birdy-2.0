import React, {Component} from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'

class BurgerMenu extends Component{

    state = {
        active : !!this.props.active
    };


    render(){
        if(!this.state.active){
            return(
                <TouchableWithoutFeedback
                    onPress={()=>{
                        this.props.back ? this.props.navigation.goBack(null) : this.props.navigation.navigate( 'Menu' );
                    }}
                >
                    <View style={styles.container}>
                        <View style={{
                            height: 3,
                            width: 30,
                            marginTop: 5,
                            marginBottom: 5,
                            backgroundColor: '#027691',
                        }} />
                        <View style={{
                            height: 3,
                            width: 30,
                            marginBottom: 5,
                            backgroundColor: '#027691',
                        }} />
                        <View style={{
                            height: 3,
                            width: 30,
                            marginBottom: 5,
                            backgroundColor: '#027691',
                        }} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return(
            <TouchableWithoutFeedback
                onPress={()=>{
                    this.props.back ? this.props.navigation.goBack(null) : this.props.navigation.navigate( 'Menu' );
                }}
            >
                <View style={styles.container}>
                    <View style={{
                        height: 3,
                        width: 30,
                        marginBottom: 5,
                        backgroundColor: '#027691',
                        top:14,
                        transform: [
                            {rotate: '45deg'},
                        ]
                    }} />
                    <View style={{
                        height: 3,
                        width: 30,
                        marginBottom: 5,
                        backgroundColor: '#027691',
                        top:6,
                        transform: [
                            {rotate: '-45deg'},
                        ]
                    }} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export {BurgerMenu};



