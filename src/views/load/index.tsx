import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';

export default ({ navigation }) => {
    useEffect(() => {
        const { phase } = navigation.state.params;
        let cardsValues;
        if (phase === 2)
            cardsValues = [0, 1, 2];
        else
            cardsValues = [0, 3, 4, 5];
        
        setTimeout(() => {
            navigation.push('Game', {
                quantity: phase + 1,
                cardsValues,
            })
        }, 1000);
    }, []);

    return (
        <ImageBackground source={require('../../assets/imgs/load/full.png')} style={{ width: '100%', height: '100%', flex: 1 }} />
    )
}