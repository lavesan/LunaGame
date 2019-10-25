import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';

export default ({ navigation }) => {
    useEffect(() => {
        const { phase } = navigation.state.params;
        setTimeout(() => {
            navigation.push('Game', { quantity: phase })
        }, 1000);
    }, []);

    return (
        <ImageBackground source={require('../../assets/imgs/load/full.png')} style={{ width: '100%', height: '100%', flex: 1 }} />
    )
}