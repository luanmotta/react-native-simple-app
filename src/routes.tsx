import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/main'

const Stack = createStackNavigator();

const headerStyles = {
  headerStyle: {
    backgroundColor: '#DA552F',
  },
  headerTintColor: '#FFF'
}

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'JSHunt',
            ...headerStyles
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes
