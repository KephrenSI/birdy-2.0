import React from 'react';
import { Text, View, FlatList, ScrollView, Image } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../components/common'

export default class SingleBird extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.nom,
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        bird:{
            id : '',
            nom : '',
            nom_latin : '',
            ordre : '',
            famille : '',
            genre : '',
            espece : '',
            description : '',
            taille : '',
            envergure : '',
            poids : '',
            vie : '',
            alimentation : '',
            nidation : '',
            habitat : '',
            type_de_vol : '',
            photoUrl : '',
            distribution : '',
            chant : '',
        },
        loading:true
    };

    componentWillMount(){
        let id = this.props.navigation.state.params.id;
        firebase.database().ref('/encyclopedia/' + id).once('value').then((snapshot)=>{
            let bird = snapshot.val();
            this.setState({bird});
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
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.image}
                                source={{uri: this.state.bird.image}}
                            />
                        </View>
                        <FlatList
                            data={[
                                // {key: 'Id :  ', content: this.state.bird.id},
                                {key: 'Nom :  ', content: this.state.bird.nom},
                                {key: 'Nom latin :  ', content: this.state.bird.nom_latin},
                                {key: 'Ordre :  ', content: this.state.bird.ordre},
                                {key: 'Famille :  ', content: this.state.bird.famille},
                                {key: 'Genre :  ', content: this.state.bird.genre},
                                {key: 'Espece :  ', content: this.state.bird.espece},
                                {key: 'Description :  ', content: this.state.bird.description},
                                {key: 'Taille :  ', content: this.state.bird.taille},
                                {key: 'Envergure :  ', content: this.state.bird.envergure},
                                {key: 'Poids :  ', content: this.state.bird.poids},
                                {key: 'Vie :  ', content: this.state.bird.vie},
                                {key: 'Alimentation :  ', content: this.state.bird.alimentation},
                                {key: 'Nidation :  ', content: this.state.bird.nidation},
                                {key: 'Habitat :  ', content: this.state.bird.habitat},
                                {key: 'Type de vol :  ', content: this.state.bird.type_de_vol},
                                {key: 'PhotoUrl :  ', content: this.state.bird.photoUrl},
                                {key: 'Distribution :  ', content: this.state.bird.distribution},
                                {key: 'Chant :  ', content: this.state.bird.chant},
                            ]}
                            renderItem={({item}) => <View><Text style={styles.key}>{item.key}</Text><Text style={styles.item}>{item.content}</Text></View>}
                        />
                        <Text style={styles.repartition}>Répartition</Text>
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.map}
                                source={{uri: this.state.bird.map}}
                            />
                        </View>
                    </View>
                        <View style={styles.footerContainer}>
                            <Footer content={'Birdy © 2018 | Képhren SIMONIS'} />
                        </View>
                </ScrollView>
            </View>
        );
    }
}
