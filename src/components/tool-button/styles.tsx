import React from 'react';
import { Text, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

export const StyledButton = styled.Button`
    padding: 15px;
    background-color: #fff;
    color: #fcba03;
`;

export const StyledTouchOpacity = styled.TouchableOpacity`
    border-radius: 10px;
    width: 200px;
    height: 50px;
`;

// interface IPrimaryButton {
//     text: string;
//     onPress: (...args) => void
// }

// export const PrimaryButton = ({ text, onPress }: IPrimaryButton) => (
//     <StyledTouchOpacity onPress={onPress}>
//         <ImageBackground source={imgUrl} style={{ width: 100, height: 100 }}>
//             <Text>{text.toUpperCase()}</Text>
//         </ImageBackground>
//     </StyledTouchOpacity>
// )