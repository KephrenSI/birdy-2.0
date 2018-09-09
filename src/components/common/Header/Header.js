import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image
                    // source={require('../../assets/img/Feed2.jpg')}
                    source={require('../../assets/img/Feed.jpg')}
                    // source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
                    //style={StyleSheet.absoluteFill}
                    style={styles.headerBackground}
                />
            </View>
        </View>
    );
};
export {Header};

const styles = StyleSheet.create({
    container:{
        paddingTop: 150,
    },
    box:{
        flex: 1,
        height: 150,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
    text:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#aafefe'
    },
    headerBackground:{
        // height: 150,
        flex: 1,
        height: null,
        width: null,
    }
});
