import React, {Component} from 'react'
import { View, TextInput, Text, StyleSheet} from 'react-native'
import { FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'

const TextInputAndLabel = ({ label, placeholder, value, onChangeText, secureTextEntry, autoCapitalize, keyboardType, error })=>{
    return(
        <View>
            <FormLabel style={styles.label}>{label}</FormLabel>
            <FormInput
                style={styles.input}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                onChangeText={onChangeText}
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                value={value}
            />
          <FormValidationMessage>{error}</FormValidationMessage>
        </View>
    );
};
export {TextInputAndLabel};

const styles = StyleSheet.create({
    input: {
        
    },
    label: {
    },
})
