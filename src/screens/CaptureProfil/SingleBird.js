import React from 'react';
import { Text, View, FlatList, ScrollView, Image } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../components/common'

export default class SingleBird extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.communname,
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        bird:{
            id : '',
            name : '',
            latin_name : '',
            order : '',
            behavior : '',
            birdhouse : '',
            description : '',
            family : '',
            food : '',
            image : '',
            lifespan : '',
            map : '',
            mass : 18,
            nidation : '',
            wingspan : '',
            song : '',
        },
        loading:true
    };

    componentWillMount(){
        let uid = this.props.navigation.state.params.uid;
        firebase.database().ref('/encyclopedia/' + uid).once('value').then((snapshot)=>{
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
                                {key: 'Nom : ', content: this.state.bird.name},
                                {key: 'Nom latin : ', content: this.state.bird.latin_name},
                                {key: 'Description : ', content: this.state.bird.description},
                                {key: 'Comportement  : ', content: this.state.bird.behavior},
                                {key: 'Habitats  : ', content: this.state.bird.birdhouse},
                                {key: 'Famille : ', content: this.state.bird.family},
                                {key: 'Alimentation : ', content: this.state.bird.food},
                                {key: 'Durée de vie : ', content: this.state.bird.lifespan + ' années'},
                                {key: 'Poids : ', content: this.state.bird.mass + ' g'},
                                {key: 'nidation : ', content: this.state.bird.nidation},
                                {key: 'Taille  : ', content: this.state.bird.wingspan + ' cm'}
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
