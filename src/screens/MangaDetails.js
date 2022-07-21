import axios from 'axios'
import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, Image, Flex, HStack, VStack, useColorModeValue, Box } from 'native-base'

import ChapterList from '../components/ChapterList'

const MangaDetails = ({ route, navigation }) => {
    const [ chapters, setChapters ] = useState({})
    const [ chapElements, setChapElements ] = useState({})

    const test = [{test: '1'}]

    const manga = route.params
    const boxBackground = useColorModeValue('gray.200', 'gray.800')

    const fetchChapters = () => {
        axios.get(`https://api.mangadex.org/chapter?manga=${manga.id}&limit=100&translatedLanguage[]=en`).then(
            (response) => {
                const uId = []

                // filter and sort manga chapters
                const mangaChapters = response.data.data
                console.log(`Received ${mangaChapters.length} chapters.`)

                const u = mangaChapters.filter(manga => {
                    const isDupe = uId.includes(manga.attributes.chapter)

                    if (!isDupe) {
                        uId.push(manga.attributes.chapter)

                        return true
                    }

                    return false
                })

                u.sort((a, b) => {
                    return a.attributes.chapter - b.attributes.chapter
                })

                setChapters(u)
            }
        )
    }

    useEffect(() => {
        fetchChapters()
    }, []) // crucial! if you remove this, the app will die lol

    useEffect(() => {
        if (chapters) {
            const chapterList = Object.keys(chapters).map((key) => {
                // grab the chapter data

                const chapterNo = chapters[key].attributes.chapter
                const chapterTitle = chapters[key].attributes.title
                const chapterId = chapters[key].id

                return [{
                    chapterNo: chapterNo,
                    chapterTitle: chapterTitle,
                    chapterId: chapterId,
                }][0]
            })
            setChapElements(chapterList)
        }
    }, [chapters])


    return (
        <Box bg={useColorModeValue('muted.50', 'gray.900')} height='100%'>
            <HStack h={160} mt={5} p={15} w='100%' justifyContent='space-between'>
                <VStack w='70%'>
                    <Text fontSize='18px' fontWeight='bold' noOfLines={2}>
                        {manga.title}
                    </Text>
                    <Text noOfLines={4}>
                        {manga.description}
                    </Text>
                </VStack>
                <Image
                    rounded={15}
                    source={{uri: manga.coverLink}}
                    width='25%'
                    height='100%'
                    alt='image'
                />
            </HStack>
            <Box borderBottomWidth={2} borderBottomColor={useColorModeValue('gray.300', 'gray.800')} />
            <ChapterList data={chapElements}/>
        </Box>
    )
}

export default MangaDetails
