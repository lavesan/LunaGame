import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import cardJson from '../../assets/json/cards.json';

const PageView = styled.View`
    flex: 1;
    position: relative;
`;

interface ICard {
    id: number;
    value: number;
    cardUrl?: boolean;
}

const styles = StyleSheet.create({
    levelImage: {
        width: 80,
        height: 35,
        borderRadius: 5,
        overflow: 'hidden',
    }
})

const defaultCardUrl = '../../assets/imgs/game/default.png';

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
                if (rightValues.some(value => value == card.value))
                    return card;
                else
                    return {
                        ...card,
                        cardUrl: false,
                    }
            }));
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
        }));
        
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

    const renderCardImage = (value: number) => {
        switch(value) {
            case 0:
                return (
                   <ImageBackground 
                       source={require(`../../assets/imgs/game/card0.png`)} 
                       style={{ width: 70, height: 100 }} />
                )
            case 1:
                return (
                   <ImageBackground 
                       source={require(`../../assets/imgs/game/card1.png`)} 
                       style={{ width: 70, height: 100 }} />
                )
            case 2:
                return (
                    <ImageBackground 
                        source={require(`../../assets/imgs/game/card2.png`)} 
                        style={{ width: 70, height: 100 }} />
                )
            case 3:
                return (
                    <ImageBackground 
                        source={require(`../../assets/imgs/game/card3.png`)} 
                        style={{ width: 70, height: 100 }} />
                )
        }
    }

    const RenderPhaseIcon = () => {
        const { quantity } = navigation.state.params;
        if (quantity == 2) {
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
        } else if(quantity == 3) {
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

    return (
        <ImageBackground source={require('../../assets/imgs/game/background.png')} style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}>
            <View style={{ height: '60%', justifyContent: 'space-between', flexDirection: 'column', marginTop: '5%', flex: 0.5 }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                    {cards.map((card, i) => {
                        if (i % 2 === 0)
                            return (
                                    <TouchableWithoutFeedback key={card.id} onPress={() => flipCard(card)}>
                                        <View>
                                            {card.cardUrl ? 
                                                renderCardImage(card.value) :
                                                <ImageBackground 
                                                    source={require(defaultCardUrl)} 
                                                    style={{ width: 70, height: 100 }} />}
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                        else return null;
                    }
                    )}
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                    {cards.map((card, i) => {
                        if (i % 2 !== 0)
                            return (
                                    <TouchableWithoutFeedback key={card.id} onPress={() => flipCard(card)}>
                                        <View>
                                            {card.cardUrl ? 
                                                renderCardImage(card.value) :
                                                <ImageBackground 
                                                    source={require(defaultCardUrl)} 
                                                    style={{ width: 70, height: 100 }} />}
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                        else return null;
                    }
                    )}
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', marginTop: '3%', flex: 0.5 }}>
                <RenderPhaseIcon />
            </View>
        </ImageBackground>
    )
}

