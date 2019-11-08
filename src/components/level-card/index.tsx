import React from 'react';
import { ImageBackground } from 'react-native';
import styles from './styles';

export default ({ navigation }) => {
    const { phase } = navigation.state.params;
    if (phase === 1) {
        return (
            <>
                <ImageBackground 
                    source={require(`../../assets/imgs/game/act-1.png`)} 
                    style={styles.levelImage} />
                <ImageBackground 
                    source={require(`../../assets/imgs/game/inact-2.png`)} 
                    style={styles.levelImage} />
                <ImageBackground 
                    source={require(`../../assets/imgs/game/inact-3.png`)} 
                    style={styles.levelImage} />
            </>
        )
    } else if(phase === 2) {
        return (
            <>
                <ImageBackground 
                    source={require(`../../assets/imgs/game/act-1.png`)} 
                    style={styles.levelImage} />
                <ImageBackground 
                    source={require(`../../assets/imgs/game/act-2.png`)} 
                    style={styles.levelImage} />
                <ImageBackground 
                    source={require(`../../assets/imgs/game/inact-3.png`)} 
                    style={styles.levelImage} />
            </>
        )
    } else {
        return (
            <>
                <ImageBackground 
                    source={require(`../../assets/imgs/game/act-1.png`)} 
                    style={styles.levelImage} />
                <ImageBackground 
                    source={require(`../../assets/imgs/game/act-2.png`)} 
                    style={styles.levelImage} />
                <ImageBackground 
                    source={require(`../../assets/imgs/game/act-3.png`)} 
                    style={styles.levelImage} />
            </>
        )
    }
}