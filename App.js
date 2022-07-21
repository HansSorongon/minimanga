import React from "react";
import { NativeBaseProvider,
         useColorModeValue } from "native-base";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Ionicons from '@expo/vector-icons/Ionicons'

// screens
import HomeScreen from './src/screens/HomeScreen'
import MangaDetails from './src/screens/MangaDetails'

//components
import ThemeToggle from './src/components/ThemeToggle'

const Stack = createNativeStackNavigator()

const App = () => {


    const headerOptions = {
        title: 'Minimanga',
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#000e30',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: '20px',
        },
        headerRight: () => (
            <ThemeToggle />
        ),
        headerTintColor: '#fff',
    }

    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Home' component={HomeScreen} options={headerOptions} />
                    <Stack.Screen name='MangaDetails' component={MangaDetails} options={headerOptions} />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    )
}

export default App


