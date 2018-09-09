import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import Sound from 'react-native-sound';

class SoundPlayer extends Component {

    state = {
        pause: true,
        sound: null,
        error: null
    };

    componentWillMount(){

        if(this.props.soundId !== undefined){
            this.setState({sound : new Sound('bird_song_'+ this.props.soundId +'.mp3', SoundPlayer.MAIN_BUNDLE, (error)=>{
                if(error)
                    ToastAndroid.show('Error when init the sound player', ToastAndroid.SHORT)
            })});
        }
    }

    onPressPlay(){
        this.setState({error:false})
        if(this.state.sound !== null){
            if(this.state.pause){
                this.state.sound.play((success)=>{
                    if(!success){
                        ToastAndroid.show('Error when Resume the sound player', ToastAndroid.SHORT)
                        this.setState({error:true})
                    }
                })
                if(this.state.error !== true){
                    this.setState({pause: !this.state.pause});
                }
            }else{
                this.state.sound.pause();
                this.setState({pause: !this.state.pause});
            }
        }
    }

    render() {
        if(this.props.soundId !== undefined){
            if(this.state.pause){
                return(
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onPressPlay();
                                }}>
                                <Text>Play</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                );
            }else{
                return(
                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onPressPlay();
                                }}>
                                <Text>Stop</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                );
            }
        }else {
            return(<Text></Text>)
        }
    }
}
export {SoundPlayer};
