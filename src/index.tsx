import React from 'react';
import { StatusBar } from 'react-native';

import AppProvider from './hooks';

import Routes from './routes';
import colors from './styles/colors';

const App: React.FC = () => {
  return (
      <>
        <StatusBar 
        translucent 
        barStyle="light-content"
        backgroundColor={colors.bg}
        />
        <AppProvider>
          <Routes />
        </AppProvider>
      </>
  );
}

export default App;