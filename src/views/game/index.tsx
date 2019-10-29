import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import cardJson from '../../assets/json/cards.json';
import RenderCardIcons from '../../components/select-card';
import RenderPhaseIcon from '../../components/level-card';
import { ICard } from './interfaces';

export default ({ navigation }) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [selectedCard, setSelectedCard] = useState<{ id: number, value: number }>(null);

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

    return (
        <ImageBackground source={require('../../assets/imgs/game/background.png')} style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}>
            <View style={{ height: '60%', justifyContent: 'space-between', flexDirection: 'column', marginTop: '5%', flex: 0.5 }}>
                <RenderCardIcons cards={cards} flipCard={flipCard} />                
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', marginTop: '3%', flex: 0.5 }}>
                <RenderPhaseIcon navigation={navigation} />
            </View>
        </ImageBackground>
    )
}

