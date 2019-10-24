import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, Text, ImageBackground } from 'react-native';
import { StyledTouchOpacity } from '../../components/tool-button/styles';
import imgUrl from '../../assets/imgs/home/button.png';
import backgroundUrl from '../../assets/imgs/home/background.png';

export default ({ navigation }) => {
    const [cards, setCards] = useState<any>([]);

    const nextStep = () => {
        navigation.push('Game', { quantity: 2 });
    }

    return (
        // <View></View>
        <ImageBackground 
            source={backgroundUrl}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <TouchableWithoutFeedback onPress={() => nextStep()}>
                    <ImageBackground source={imgUrl} style={{ width: 100, height: 40 }} />
                </TouchableWithoutFeedback>
                {/* <StyledTouchOpacity onPress={nextStep}>
                </StyledTouchOpacity>   */}
        </ImageBackground>
    )
}