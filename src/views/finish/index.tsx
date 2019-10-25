import React from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';

export default ({ navigation }) => {
    const backToHome = () => {
        navigation.popToTop();
    }

    return (
        <ImageBackground source={require('../../assets/imgs/finish/background.png')} style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>Você conseguiu!</Text>
                <TouchableWithoutFeedback onPress={backToHome} style={{ justifyContent: 'center', width: 'auto' }}>
                    <ImageBackground source={require('../../assets/imgs/finish/button.png')} style={{ width: 100, height: 40 }} />
                </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
    )
}