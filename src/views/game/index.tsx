import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import cardJson from '../../assets/json/cards.json';
import RenderCardIcons from '../../components/select-card';
import RenderPhaseIcon from '../../components/level-card';
import { ICard } from './interfaces';
import { Audio } from 'expo-av';

export default ({ navigation }) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [selectedCard, setSelectedCard] = useState<{ id: number, value: number }>(null);
    const [rightValues, setRightValues] = useState<number[]>([]);
    const [playCardAudio, setPlayCardAudio] = useState<() => void>(null);

    const audioFlipCard = new Audio.Sound();
    const audioIntroduction = new Audio.Sound();
    let audioBackground = new Audio.Sound();

    /**
     * @description Gira as cartas
     * @param {ICard} param0 carta que será virada 
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
                setSelectedCard(null);
                setTimeout(() => {
                    setCards(cards.map(card => {
                        if (rightValues.some(value => value == card.value))
                            return card;
                        else
                            return {
                                ...card,
                                cardUrl: false,
                            }
                    }));
                }, 500)
            }
        }
    }

    const handleInit = (): void => {
        shuffleCards();
        (async () => {
            const { phase, gameAudioBackground } = navigation.state.params;
            try {
                // How to play the game introduction audio
                if (phase === 1) {
                    await audioIntroduction.loadAsync(require('../../assets/media/tela_inicial.mp3'));
                    await audioIntroduction.playAsync();
                }

                // In game background audio
                if (!gameAudioBackground) {
                    await audioBackground.loadAsync(require('../../assets/media/durante_o_jogo.mp3'));
                    await audioBackground.setIsLoopingAsync(true);
                    await audioBackground.setVolumeAsync(0.6);
                    await audioBackground.playAsync();
                } else {
                    audioBackground = gameAudioBackground;
                }

                // Flip card audio
                await audioFlipCard.loadAsync(require('../../assets/media/cartas.mp3'));
                setPlayCardAudio(async () => {
                    console.log('roda peste');
                    try {
                        await audioFlipCard.replayAsync();
                        // await audioFlipCard.setPositionAsync(0);
                        // await audioFlipCard.playAsync();
                    } catch (e) {
                        console.log('Erro em carregar aúdio de flip');
                    }
                });
            } catch (e) {
                console.log('Áudio background não rodou');
            }
        })();
    }

    /**
     * @description Posiciona as cartas em locais aleatórios
     */
    const shuffleCards = (): void => {
        const { cardsValues } = navigation.state.params;
        const cardsSize = cardsValues.length * 2;
        let arr: ICard[] = Array.from({ length: cardsSize });

        const cards = cardJson.filter(({ value }) => cardsValues.includes(value));

        cards.forEach(card => {
            do {
                const randomPos = Math.floor(Math.random() * cardsSize) + 1;
                if (!arr[randomPos - 1]) {
                    arr[randomPos - 1] = card;
                    break;
                }
            } while (true);
        });
        setCards(arr);
    }

    /**
     * Navega para próxima página quando todas as cartas estão ok
     */
    const gameEnd = () => {
        if (cards.length && rightValues.length === cards.length / 2) {
            (async () => {
                const { phase } = navigation.state.params;
                try {
                    if (audioIntroduction)
                        await audioIntroduction.stopAsync();    
                } catch (e) {
                    console.log('Erro em parar o aúdio');
                } finally {
                    if (phase === 3) {
                        try {
                            await audioBackground.stopAsync();
                        } catch (e) {}
                        finally {
                            navigation.navigate('Finish');
                        }
                    }
                    else
                        navigation.push('Load', {
                            phase,
                            gameAudioBackground: audioBackground,
                        });
                }
            })();
        }
    }

    useEffect(() => handleInit(), []);
    useEffect(() => gameEnd(), [rightValues]);
    useEffect(() => { 
        if (typeof playCardAudio === 'function')
            playCardAudio();
    }, [cards]);

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

