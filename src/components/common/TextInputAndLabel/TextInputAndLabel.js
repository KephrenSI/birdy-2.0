import React, {Component} from 'react';
import { View, TextInput, Text} from 'react-native';

import styles from './styles';

const TextInputAndLabel = ({ label, placeholder, value, onChangeText, secureTextEntry, autoCapitalize, keyboardType })=>{
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onChangeText}
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                value={value}
            />
        </View>
    );
};
export {TextInputAndLabel};
