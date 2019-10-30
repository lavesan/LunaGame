import React from 'react';
import { View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { ICard } from '../../views/game/interfaces';

const defaultCardUrl = '../../assets/imgs/game/default.png';

interface ISelectCard {
    flipCard: (card: ICard) => void;
    cards: ICard[];
}

export default ({ flipCard, cards }: ISelectCard) => {
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
            case 4:
                return (
                    <ImageBackground 
                        source={require(`../../assets/imgs/game/card4.png`)} 
                        style={{ width: 70, height: 100 }} />
                )
            case 5:
                return (
                    <ImageBackground 
                        source={require(`../../assets/imgs/game/card5.png`)} 
                        style={{ width: 70, height: 100 }} />
                )
        }
    }

    return (
        <>
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
        </>
    )
}