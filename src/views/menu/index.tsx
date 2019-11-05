import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, ImageBackground, View, Text } from 'react-native';
import { Audio } from 'expo-av';

export default ({ navigation }) => {
    const soundInit = new Audio.Sound();
    const handleInit = () => {
        (async () => {
            try {
                await soundInit.loadAsync(require('../../assets/media/tema_inicial.mp3'));
                await soundInit.playAsync();
            } catch(e) {
                console.log('Aúdio não carregou');
            }
        })();
    }

    const nextStep = () => {
        soundInit.stopAsync();
        navigation.push('Game', { 
            quantity: 2,
            cardsValues: [0, 1]  
        });
    }

    useEffect(() => handleInit(), []);

    return (
        <ImageBackground 
            source={require('../../assets/imgs/menu/background.png')}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <View style={{ width: '80%', height: '60%' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30, marginBottom: 50 }}>LUNA "A astronauta"</Text>
                    <TouchableWithoutFeedback onPress={() => nextStep()} style={{ width: 200 }}>
                        <ImageBackground source={require('../../assets/imgs/menu/button.png')} style={{ width: 200, overflow: 'hidden', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text onPress={() => nextStep()} style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, paddingBottom: 4, paddingTop: 4 }}>START</Text>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </View>
        </ImageBackground>
    )
}