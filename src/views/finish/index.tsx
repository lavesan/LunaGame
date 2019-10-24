import React from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';

export default ({ navigation }) => {
    const backToHome = () => {
        navigation.navigate('Menu');
    }

    return (
        <ImageBackground source={require('../../assets/playing-metal-bird.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={backToHome}>
                <View style={{ borderWidth: 2, borderColor: 'aaa', borderRadius: 10, backgroundColor: 'red' }}>
                    <Text style={{ fontSize: 20 }}>Retornar</Text>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}