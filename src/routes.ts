import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MenuView from './views/menu';
import GameView from './views/game';
import LoadView from './views/load';
import FinishView from './views/finish';

const AppNavigator = createStackNavigator({
    Menu: {
        screen: MenuView,
    },
    Game: {
        screen: GameView,
    },
    Load: {
        screen: LoadView,
    },
    Finish: {
        screen: FinishView,
    },
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

export default createAppContainer(AppNavigator);