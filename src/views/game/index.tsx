import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, Animated } from 'react-native';
import styled from 'styled-components/native';
import cardJson from '../../assets/json/cards.json';

const PageView = styled.View`
    flex: 1;
    position: relative;
`;

interface ICard {
    id: number;
    url: string;
    value: number;
    cardUrl?: boolean;
}

const defaultCardUrl = '../../assets/imgs/game/back-card.png';

export default ({ navigation }) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [selectedCard, setSelectedCard] = useState<{ id: number, value: number }>(null);
    const [moveAnim] = useState(new Animated.Value(0));

    const [rightValues, setRightValues] = useState<number[]>([]);

    /**
     * @description Gira as cartas
     * @param param0 
     */
    const flipCard = ({ id, value }: ICard): void => {
        // Não faz nada quando o valor da carta selecionada já foi acertado
        if (rightValues.some(arrValue => arrValue == value))
            return;
        // Gira a carta quando a mesma anterior é selecionada
        if (selectedCard && selectedCard.id == id) {
            setCards(cards.map(card => {
                return {
                    ...card,
                    cardUrl: false,
                }
            }))
            setSelectedCard(null);
            return;
        }
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
        
        if (!selectedCard)
            setSelectedCard({ id, value });
        else {
            if (selectedCard.id != id && selectedCard.value == value) {
                // Acertou
                setRightValues([...rightValues, value]);
                setSelectedCard(null);
            } else {
                // Errou
                // As 2 cartas vão virar para baixo
                setTimeout(() => {
                    setCards(cards.map(card => {
                        if (rightValues.some(value => value == card.value))
                            return card;
                        else
                            return {
                                ...card,
                                cardUrl: false,
                            }
                    }))
                    setSelectedCard(null);
                }, 500)
            }
        }
    }

    useEffect(() => {
        // Navega para próxima página quando tudo é acertado
        if (cards.length && rightValues.length === cards.length / 2) {
            if (navigation.state.params.quantity == 4)
                navigation.navigate('Finish');
            else
                navigation.push('Load', { phase: rightValues.length + 1 });
        }
    }, [rightValues])

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
    }, 2000)

    return (
        <ImageBackground source={require('../../assets/imgs/game/background.png')} style={{ width: '100%', height: '100%', flex: 1 }}>
            <View style={{ width: '50%', justifyContent: 'space-between', flexDirection: 'row', marginTop: '10%' }}>
                {cards.map(card => (
                        <TouchableWithoutFeedback key={card.id} onPress={() => flipCard(card)}>
                            <View>
                                {card.cardUrl ? 
                                    <ImageBackground 
                                        source={require(`../../assets/imgs/game/card1.png`)} 
                                        style={{ width: 50, height: 100 }} /> :
                                    <ImageBackground 
                                        source={require(defaultCardUrl)} 
                                        style={{ width: 50, height: 100 }} />}
                            </View>
                        </TouchableWithoutFeedback>
                    )
                )}
            </View>
        </ImageBackground>
    )
}