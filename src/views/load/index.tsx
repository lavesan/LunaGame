import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Audio } from 'expo-av';

export default ({ navigation }) => {
    const handleInit = (): void => {
        const { phase } = navigation.state.params;
        let cardsValues;
        if (phase === 1)
            cardsValues = [0, 1, 2];
        else
            cardsValues = [0, 3, 4, 5];
        
        (async () => {
            const soundNextPhase = new Audio.Sound();
            try {
                await soundNextPhase.loadAsync(require('../../assets/media/proxima_fase.mp3'));
                await soundNextPhase.playAsync();
            } catch (e) {
                console.log('Aúdio não iniciou');
            }

            setTimeout(() => {
                try {
                    soundNextPhase.stopAsync();
                } catch (e) {
                    console.log('Aúdio não parou');
                }

                navigation.push('Game', {
                    phase: phase + 1,
                    cardsValues,
                });
            }, 3500);
        })();
    }

    useEffect(() => handleInit(), []);

    return (
        <ImageBackground source={require('../../assets/imgs/load/full.png')} style={{ width: '100%', height: '100%', flex: 1 }} />
    )
}