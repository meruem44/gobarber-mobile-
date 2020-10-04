import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import colors from '../styles/colors';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
      <Navigator 
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.bg
            }
        }}
      >   
          <Screen name="Dashboard" component={Dashboard} />
      </Navigator>
  );
}

export default AppRoutes;