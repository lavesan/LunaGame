import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableWithoutFeedback, Animated, Button } from 'react-native';
import styled from 'styled-components/native';
import cardJson from '../../assets/json/cards.json';

const StyledButton = styled.TouchableOpacity`
    width: 100px;
    height: 30px;
    border-width: 1px;
    border-style: solid;
    border-color: #fff;
    border-radius: 5px;
`;

const PageView = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;
`;

const StyledView = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border-width: 1px;
    border-color: red;
`;

const style = StyleSheet.create({
    est1: {
        translateY: 0,
    }
})

interface ICard {
    id: number;
    url: string;
    value: number;
    cardUrl?: boolean;
}

const defaultCardUrl = '../../assets/imgs/home/background.png';

export default ({ navigation }) => {
    const [girar, setGirar] = useState<any>(false);
    const [cards, setCards] = useState<ICard[]>([]);
    const [selectedId, setSelectedId] = useState<number>(null);
    const [moveAnim] = useState(new Animated.Value(0));

    const [rightIds, setRightIds] = useState<(number | string)[]>([]);

    const flipCard = ({ id, value }: ICard): void => {
        if (rightIds.length === cards.length) {
            navigation.push('Load', { phase: navigation.state.params.quantity });
            return;
        }
        if (rightIds.some(id => id == id))
            return;
        // Gira a carta
        setCards(cards.map(card => {
            if (card.id == id) {
                return {
                    ...card,
                    cardUrl: true,
                }
            }
            return card;
        }))
        
        if (!selectedId)
            setSelectedId(id);
        else {
            if (cardJson.some(card => card.id != selectedId && card.value == value) && id != selectedId) {
                console.log('acertou');
                // Acertou
                setRightIds([...rightIds, id]);
            } else {
                // Errou
                // As 2 cartas vão virar para baixo
                console.log('errou');
                setCards(cards.map(card => {
                    return {
                        ...card,
                        cardUrl: false,
                    }
                }))
            }
            setSelectedId(null);
        }
    }

    useEffect(() => {
        const { quantity } = navigation.state.params;
        const cardsSize = quantity * 2;
        let arr: ICard[] = Array.from({ length: cardsSize });

        const cards = cardJson.slice(0, cardsSize);

        cards.forEach(card => {
            do {
                const randomPos = Math.floor(Math.random() * cardsSize) + 1;
                if (!arr[randomPos - 1]) {
                    arr[randomPos - 1] = card;
                    break;
                }
            } while (true);
        })
        setCards(arr);
    }, []);

    const animacao = Animated.timing(
        moveAnim,
        {
          toValue: 100,
          duration: 1000,
        }
      );

    setTimeout(async () => {
        await animacao.start();
        setGirar('Girou agora');
    }, 2000)

    return (
        <PageView>
            {/* <ImageBackground source={imgUrl} style={{ width: 100, height: 100 }}></ImageBackground>
            <Animated.View style={{
                translateX: moveAnim,
            }}>
                <Text>Texto locão ai</Text>
            </Animated.View>
            <StyledView>
                <Text>{girar}</Text>
            </StyledView>
            <StyledView style={{ position: 'absolute', top: 400 }}>
                <Text>2</Text>
            </StyledView> */}
            {cards.map(card => (
                    <TouchableWithoutFeedback key={card.id} onPress={() => flipCard(card)}>
                        <View>
                            {card.cardUrl && <ImageBackground 
                                source={require('../../assets/playing-metal-bird.png')} 
                                style={{ width: 50, height: 100 }} />}
                            {!card.cardUrl && <ImageBackground 
                                source={require(defaultCardUrl)} 
                                style={{ width: 50, height: 100 }} />}
                        </View>
                    </TouchableWithoutFeedback>
                )
            )}
        </PageView>
    )
}