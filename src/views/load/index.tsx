import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default ({ navigation }) => {
    const [phaseNumber, setPhaseNumber] = useState<number>(null);

    useEffect(() => {
        const { phase } = navigation.state.params;
        setPhaseNumber(phase);
    }, []);

    return (
        <View>
            <Text>{phaseNumber}</Text>
        </View>
    )
}