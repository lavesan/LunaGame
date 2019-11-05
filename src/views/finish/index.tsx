import React, { useEffect } from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Audio } from 'expo-av';

export default ({ navigation }) => {
    const backToHome = () => {
        navigation.popToTop();
    }

    useEffect(() => {
        (async () => {
            const soundAudio = new Audio.Sound();
            try {
                await soundAudio.loadAsync(require('../../assets/media/parabens.mp3'));
                await soundAudio.playAsync();
            } catch(e) {
                console.log('audio deu pau')
            }
        })();
    }, []);

    return (
        <ImageBackground source={require('../../assets/imgs/finish/background.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'flex-end', flex: 1, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30, marginBottom: 20 }}>Você conseguiu!</Text>
                <TouchableWithoutFeedback onPress={backToHome} style={{ justifyContent: 'center' }}>
                    <ImageBackground source={require('../../assets/imgs/finish/button.png')} style={{ width: 120, height: 40, marginBottom: 50, overflow: 'hidden', borderRadius: 20 }} />
                </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
    )
}