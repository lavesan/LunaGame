import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, ImageBackground, View, Text } from 'react-native';
import { Audio } from 'expo-av';

export default ({ navigation }) => {
    const audioBackground = new Audio.Sound();

    const handleInit = (): void => {
        (async () => {
            try {
                await audioBackground.loadAsync(require('../../assets/media/tema_inicial.mp3'));
                await audioBackground.setIsLoopingAsync(true);
                await audioBackground.playAsync();
            } catch(e) {
                console.log('Aúdio não carregou');
            }
        })();
    }

    const nextStep = async (): Promise<any> => {
        try {
            await audioBackground.stopAsync();
        } catch (e) {}
        finally {
            navigation.push('Game', {
                phase: 1,
                cardsValues: [0, 1]  
            });
        }
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