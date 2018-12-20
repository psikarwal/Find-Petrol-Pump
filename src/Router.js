import { createStackNavigator, createAppContainer } from 'react-navigation';
import App from './App';
import PumpsList from './PumpsList';
import Mapview from './Mapview';

const Router = createStackNavigator(
  {
    App: { screen: App },
    PumpsList: { screen: PumpsList },
    Mapview: { screen: Mapview }
  },
  {
    initialRouteName: 'App',
    navigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(Router);
