import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import cardJson from '../../assets/json/cards.json';
import RenderCardIcons from '../../components/select-card';
import RenderPhaseIcon from '../../components/level-card';
import { ICard } from './interfaces';
import { Audio } from 'expo-av';
import load from '../load/index.js';

export default ({ navigation }) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [selectedCard, setSelectedCard] = useState<{ id: number, value: number }>(null);
    const [rightValues, setRightValues] = useState<number[]>([]);

    const audioIntroduction = new Audio.Sound();
    const audioFlipCard = new Audio.Sound();
    let audioBackground = new Audio.Sound();

    const playCardAudio = async (): Promise<any> => {
        try {
            if (!audioFlipCard._loaded)
                await audioFlipCard.loadAsync(require('../../assets/media/cartas.mp3'));
            await audioFlipCard.playAsync();
        } catch (e) {
            console.log('Erro em carregar aúdio de flip');
        }
    }
    /**
     * @description Gira as cartas
     * @param {ICard} param0 carta que será virada 
     */
    const flipCard = ({ id, value }: ICard): void => {
        playCardAudio();

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

    /**
     * @description Carrega os aúdios background
     */
    const loadAudios = async (): Promise<any> => {
        const { phase } = navigation.state.params;
        try {
            // Aúdio de como jogar
            if (phase === 1) {
                await audioIntroduction.loadAsync(require('../../assets/media/tela_inicial.mp3'));
                await audioIntroduction.playAsync();
            }

            // Aúdio de background do jogo
            await audioBackground.loadAsync(require('../../assets/media/durante_o_jogo.mp3'));
            await audioBackground.setIsLoopingAsync(true);
            // await audioBackground.setVolumeAsync(0.4);
            await audioBackground.playAsync();
        } catch (e) {
            console.log('Áudio background não rodou');
        }
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
     * @description Navega para próxima página quando todas as cartas estão ok
     */
    const gameEnd = (): void => {
        if (cards.length && rightValues.length === cards.length / 2) {
            (async () => {
                const { phase } = navigation.state.params;
                try {
                    if (audioIntroduction)
                        await audioIntroduction.stopAsync();
                    await audioBackground.stopAsync();
                } catch (e) {
                    console.log('Erro em parar o aúdio');
                } finally {
                    // Era a última fase, vai para tela de finalização
                    if (phase === 3)
                        navigation.navigate('Finish');
                    // Vai para tela de carregamento com o foguete
                    else
                        navigation.push('Load', {
                            phase,
                        });
                }
            })();
        }
    }
    
    const handleInit = (): void => {
        shuffleCards();
        loadAudios();
    }

    useEffect(() => handleInit(), []);
    useEffect(() => gameEnd(), [rightValues]);

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

