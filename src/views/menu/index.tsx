import React from 'react';
import { TouchableWithoutFeedback, ImageBackground, View } from 'react-native';
import { StyledTouchOpacity } from '../../components/tool-button/styles';

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
                <View style={{ width: '80%' }}>
                    <TouchableWithoutFeedback onPress={() => nextStep()}>
                        <ImageBackground source={require('../../assets/imgs/menu/button.png')} style={{ width: 200, height: 40 }} />
                    </TouchableWithoutFeedback>
                </View>
        </ImageBackground>
    )
}