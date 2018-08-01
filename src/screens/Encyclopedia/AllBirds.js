import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../components/common'


export default class AllBirds extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Encyclopedie',
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        birds:{},
        loading:true
    };

    componentWillMount(){
        firebase.database().ref('/encyclopedia/').once('value').then((snapshot)=>{
            let birds=[];
            snapshot.forEach((item)=>{
                birds.push(item.val());
            });
            this.setState({birds});
        }).then(()=>this.setState({loading:false}));
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
                    <View style={styles.content}>
                        <FlatList
                            keyExtractor={ (item, index) => item.id }
                            data={this.state.birds}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('SingleBird', {id:item.id,nom:item.nom})}>
                                    <Text style={styles.user}>{item.nom}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.footerContainer}>
                        <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
