import axios from 'axios'
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

// api
const baseUrl = 'api.mangadex.org'

const HomeScreen = () => {
    const [inputVal, setInputVal] = useState('')
    const [mangaList, setMangaList] = useState({})

    const handleSubmit = () => {
        const titleQuery = inputVal.trim().split(' ').join('+')
        axios.get(`https://api.mangadex.org/manga?title=${inputVal}&includes[]=cover_art`).then(
            (response) => {
                console.log('Fetching...')
                const lst = response.data.data
                setMangaList(lst)
            }
        )
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
            <SearchResults mangaList={mangaList}/>
        </Flex>
    )
}

export default HomeScreen
