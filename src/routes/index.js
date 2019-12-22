import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Pages
import Game from '~/pages/Game';

// Routes
const Routes = createAppContainer(createSwitchNavigator({ Game }));

export default Routes;
