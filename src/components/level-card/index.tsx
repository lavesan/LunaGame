import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    levelImage: {
        width: 80,
        height: 35,
        borderRadius: 5,
        overflow: 'hidden',
    }
})

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