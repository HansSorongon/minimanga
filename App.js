import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screens
import HomeScreen from './src/screens/HomeScreen'
import MangaDetails from './src/screens/MangaDetails'
import MangaPage from './src/screens/MangaPage'

//components
import ThemeToggle from './src/components/ThemeToggle'

const Stack = createNativeStackNavigator()

const headerOptions = {
    title: "Minimanga",
    headerStyle: {
        backgroundColor: "#000e30",
    },
    headerRight: () => (
        <ThemeToggle />
    ),
    headerTintColor: '#fff'
}

const App = () => {

    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={headerOptions}
                    />
                    <Stack.Screen
                        name="MangaDetails"
                        component={MangaDetails}
                        options={headerOptions}
                    />
                    <Stack.Screen
                        name="MangaPage"
                        component={MangaPage}
                        options={headerOptions}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    )
}

export default App
