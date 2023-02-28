import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './screens/Home';
import Search from './screens/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="search"
            screenOptions={() => ({
              headerShown: false,
            })}>
            <Tab.Screen
              options={() => ({
                tabBarStyle: {
                  display: 'none',
                },
              })}
              name="home"
              component={Home}
            />
            <Tab.Screen
              options={() => ({
                tabBarStyle: {
                  display: 'none',
                },
              })}
              name="search"
              component={Search}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
