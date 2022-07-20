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
    const [inputVal, setInputVal] = useState('')

    const handleSubmit = () => {
        console.log(inputVal)
    }

    return (
        <Flex bg={useColorModeValue('muted.50', 'gray.900')}
              height='100%'
              px='10px'
        >
            <Box pb={2} borderBottomWidth={2} borderBottomColor={useColorModeValue('gray.300', 'gray.800')}>
                <Input
                    rounded={20}
                    p={4}
                    mt={2}
                    bg={useColorModeValue('muted.300', 'gray.800')}
                    placeholder='Search...'
                    value={inputVal}
                    onChangeText={(value) => setInputVal(value)}
                    onSubmitEditing={handleSubmit}
                />
            </Box>
            <SearchResults />
        </Flex>
    )
}

export default HomeScreen
