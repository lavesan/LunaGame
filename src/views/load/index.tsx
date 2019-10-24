import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default ({ navigation }) => {
    const [phaseNumber, setPhaseNumber] = useState<number>(null);

    useEffect(() => {
        const { phase } = navigation.state.params;
        setPhaseNumber(phase);
        setTimeout(() => {
            navigation.push('Game', { quantity: phase })
        }, 1000);
    }, []);

    return (
        <ImageBackground source={require('../../assets/imgs/load/full.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
            <View>
                <Text>{phaseNumber}</Text>
            </View>
        </ImageBackground>
    )
}