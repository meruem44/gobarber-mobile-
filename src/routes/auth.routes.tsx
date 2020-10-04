import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import colors from '../styles/colors';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
      <Navigator 
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.bg
            }
        }}
      >   
          <Screen name="SignIn" component={SignIn} />
          <Screen name="SignUp" component={SignUp} />
      </Navigator>
  );
}

export default AuthRoutes;