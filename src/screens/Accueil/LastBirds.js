import React from 'react';
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../components/common'


export default class LastBirds extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params ? navigation.state.params.displayName : 'Accueil' ),
        headerRight: <BurgerMenu navigation={navigation} />,
        // headerLeft: null
    });

    state = {
        user:{
            email: AsyncStorage.getItem('userEmail'),
            displayName:''
        },
        myUid: null
    };

    componentWillMount(){
        let me = firebase.auth().currentUser;
        this.setState({myUid:me.uid});
        if(this.props.navigation.state.params){
            let uid = this.props.navigation.state.params.uid;
            firebase.database().ref('/users/' + uid).once('value').then((snapshot)=>{
                let user = snapshot.val();
                this.setState({user});
            }).then(()=>this.setState({loading:false}));
        }else{
            this.setState({user:me});
        }
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.spinnerContainer}>
                    <Spinner />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                        <View style={styles.footerContainer}>
                            <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                        </View>
                </ScrollView>
            </View>
        );
    }
}
