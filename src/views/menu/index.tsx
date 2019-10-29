import React from 'react';
import { TouchableWithoutFeedback, ImageBackground, View, Text } from 'react-native';

export default ({ navigation }) => {
    const nextStep = () => {
        navigation.push('Game', { quantity: 2 });
    }

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