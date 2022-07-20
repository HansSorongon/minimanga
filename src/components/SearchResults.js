import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList, Text, Container, HStack,
        VStack, Flex, Box, useColorModeValue, Image } from 'native-base'

const SearchResults = (props) => {
    const [ linkStates, setLinkStates ] = useState()

    const boxBackground = useColorModeValue('gray.200', 'gray.800')

    const { mangaList, active } = props

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
            coverLink: link
        }][0]
    })

    return mangas

    return (
        <Box>
            <Input
                rounded={20}
                p={4}
                mt={2}
                bg={useColorModeValue('muted.300', 'gray.800')}
                placeholder='Search...'
                value={inputVal}
            />
            <FlatList
                style={{height: '100%'}}
                data={item}
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
                                    alt='pic'
                                    source={{uri: item.coverLink }}
                                    fallbackSource={{uri: '../assets/icon.png'}}
                                    width='25%'
                                    height='100%'
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
