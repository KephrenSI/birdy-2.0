import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';


// On passe un Object props à la fonction header, fourni par le parent lors de l'appel. On récupère ensuite la valeur qui nous intéresse dans cet objet.
const Footer = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> {props.content} </Text>
        </View>
    );
};
export {Footer};