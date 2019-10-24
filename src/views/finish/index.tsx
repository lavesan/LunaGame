import React from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';

export default ({ navigation }) => {
    return (
        <ImageBackground source={require('../../assets/playing-metal-bird.png')}>
            <TouchableWithoutFeedback>
                <Text>Retornar</Text>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}