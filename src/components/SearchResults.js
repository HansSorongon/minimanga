import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { TouchableOpacity, FlatList } from 'react-native'
import { Text, Container, HStack,
        VStack, Flex, Box, useColorModeValue, Image, Input } from 'native-base'

const SearchResults = (props) => {
    const navigation = useNavigation()

    const [ inputVal, setInputVal ] = useState('')
    const [ linkStates, setLinkStates ] = useState()
    const [ mangaList, setMangaList ] = useState({})
    const [ noManga, setNoManga ] = useState(false)

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
                if (!mangaList || inputVal=='') {
                    setNoManga(true)
                } else {
                    setNoManga(false)
                }
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
            id: id,
        }][0]
    })

    return (
        <Box style={{flex: 1}} pb={5}>
            <Input
                rounded={20}
                p={4}
                mt={2}
                bg={useColorModeValue('muted.300', 'gray.800')}
                placeholder='Search...'
                onChangeText={(value) => setInputVal(value)}
                value={inputVal}
                onSubmitEditing={handleSubmit}
            />
            <Box pb={2} borderBottomWidth={2} borderBottomColor={useColorModeValue('gray.300', 'gray.800')} />
            {
                !noManga ?
                <FlatList
                    style={{height: '100%'}}
                    data={mangas}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('MangaDetails',
                                {coverLink: item.coverLink, title: item.title, description: item.description, id: item.id})
                            }}>
                                <HStack h={140} rounded={10} mt={5} p={15} w='100%' bg={boxBackground} justifyContent='space-between'>
                                    <VStack w='70%'>
                                        <Text fontSize='18px' fontWeight='bold' noOfLines={2}>{item.title}</Text>
                                        <Text noOfLines={3} isTruncated>{item.description}</Text>
                                    </VStack>

                                    <Image
                                        rounded={15}
                                        source={{uri: item.coverLink}}
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
                : ''
            }
            {
                noManga ?
                    <Text alignSelf='center' mt='50%' color='gray.400' fontSize='20px'>Search something to begin!</Text>
                : ''
            }
        </Box>
    )
}

export default SearchResults
