import axios from 'axios'
import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList, Text, Container, HStack,
        VStack, Flex, Box, useColorModeValue, Image, Input } from 'native-base'

const SearchResults = (props) => {
    const [ inputVal, setInputVal ] = useState('')
    const [ linkStates, setLinkStates ] = useState()
    const [ mangaList, setMangaList ] = useState({})

    const boxBackground = useColorModeValue('gray.200', 'gray.800')

    const handleSubmit = () => {
        setMangaList({})
        console.log('Attempting to fetch...')
        const titleQuery = inputVal.trim().split(' ').join('+')
        console.log(`Fetching queries for ${titleQuery}...`)
        axios.get(`https://api.mangadex.org/manga?title=${inputVal}&includes[]=cover_art`).then(
            (response) => {
                const lst = response.data.data
                setMangaList(lst)
            }
        )
    }

    const mangas = Object.keys(mangaList).map((key) => {
        const id = mangaList[key].id

        const fileNameObj = mangaList[key].relationships.find(obj => {
            return (obj.type == 'cover_art')
        })
        const fileName = fileNameObj.attributes.fileName

        const link = `https://mangadex.org/covers/${id}/${fileName}`

        return [{
            title: mangaList[key].attributes.title.en,
            description: mangaList[key].attributes.description.en,
            coverLink: link,
        }][0]
    })

    return (
        <Box>
            <Input
                rounded={20}
                p={4}
                mt={2}
                bg={useColorModeValue('muted.300', 'gray.800')}
                placeholder='Search...'
                onChangeText={(value) => setInputVal(value)}
                onSubmitEditing={handleSubmit}
                value={inputVal}
            />
            <Box pb={2} borderBottomWidth={2} borderBottomColor={useColorModeValue('gray.300', 'gray.800')} />
            <FlatList
                style={{height: '100%'}}
                data={mangas}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => console.log('test')}>
                            <HStack h={140} rounded={10} mt={5} p={15} w='100%' bg={boxBackground} justifyContent='space-between'>
                                <VStack w='70%'>
                                    <Text fontSize='18px' fontWeight='bold' noOfLines={2}>{item.title}</Text>
                                    <Text noOfLines={3} isTruncated>{item.description}</Text>
                                </VStack>
                                <Image
                                    rounded={15}
                                    source={{uri: item.coverLink + '?t=' + Math.round(new Date().getTime() / 1000)}}
                                    width='25%'
                                    height='100%'
                                    alt='image'
                                />
                            </HStack>
                        </TouchableOpacity>
                    )
                }}
            >
            </FlatList>
        </Box>
    )
}

export default SearchResults
