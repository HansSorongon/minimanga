import { ScrollView } from 'react-native'
import { useState } from 'react'
import { Flex,
        Container,
        useColorMode,
        useColorModeValue,
        Text,
        Input,
        Box,
         } from 'native-base'

import SearchResults from '../components/SearchResults'

const HomeScreen = () => {

    return (
        <Flex bg={useColorModeValue('muted.50', 'gray.900')}
              height='100%'
              px='10px'
        >
            <SearchResults/>
        </Flex>
    )
}

export default HomeScreen
