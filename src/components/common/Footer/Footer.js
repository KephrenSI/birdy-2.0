import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

const Footer = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> {props.content} </Text>
        </View>
    );
};
export {Footer};

const styles = StyleSheet.create({
    container:{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,

    },
    text:{
        color: '#A4A4A4',
        alignSelf: 'center'
    }
});
