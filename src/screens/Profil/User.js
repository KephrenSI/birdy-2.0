import React from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import styles from './styles'
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../components/common'


export default class User extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params ? navigation.state.params.displayName : 'Mon profile' ),
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        user:{
            email: AsyncStorage.getItem('userEmail'),
            img: 'aezifygsdiuvg',
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
                     <Image
                       style={{
                         paddingVertical: 30,
                         width: 150,
                         height: 150,
                         borderRadius: 75
                       }}
                       resizeMode='cover'
                       source={{
                         uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                       }}
                     />
                    <View style={styles.content}>
                        <FlatList
                            data={[
                                {key: 'Nom : ' + this.state.user.displayName},
                                {key: 'Adresse email : ' + this.state.user.email},
                                {key: 'Img : ' + this.state.user.img},
                            ]}
                            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                        />
                        {(this.state.myUid === this.state.user.uid) &&(
                            <View  style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {this.props.navigation.navigate('Edit');}}>
                                    <Text style={styles.buttonText}>Editer</Text>
                                </TouchableOpacity>
                            </View>
                            )}
                    </View>
                        <View style={styles.footerContainer}>
                            <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                        </View>
                </ScrollView>
            </View>
        );
    }
}
