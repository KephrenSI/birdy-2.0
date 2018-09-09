import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const Spinner = ()=>{
    return(
        <View style={styles.container}>
            <ActivityIndicator color="#DA22FF" size="large"/>
        </View>
    )
};
export {Spinner};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})
