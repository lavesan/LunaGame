import React, { useEffect } from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Audio } from 'expo-av';

export default ({ navigation }) => {
    let audioBackground;
    
    const backToHome = (): void => {
        (async () => {
            try {
                await audioBackground.stopAsync();
            } catch (e) {
                console.log('Erro em parar o aúdio background')
            } finally {
                // Reseta a navegação, para reinderizar todas as páginas
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Menu' })],
                });
                navigation.dispatch(resetAction);
            }
        })();
    }

    useEffect(() => {
        (async () => {
            try {
                audioBackground = new Audio.Sound();
                await audioBackground.loadAsync(require('../../assets/media/parabens.mp3'));
                await audioBackground.playAsync();
            } catch(e) {
                console.log('Erro ao carregar aúdio background')
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