import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Box,
    ScrollView,
    Image,
    useColorModeValue,
    Container,
} from 'native-base'

const MangaPage = ({ route }) => {
    const chapter = route.params
    const [pageUrls, setPageUrls] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [hash, setHash] = useState('')

    const fetchPages = async () => {
        console.log('Attempting to get panels...')
        axios
            .get(`https://api.mangadex.org/at-home/server/${chapter.chapterId}`)
            .then((response) => {
                const hash = response.data.chapter.hash // string
                const fileNames = response.data.chapter.data // array

                setHash(hash)
                setFileNames(fileNames)
            })
    }

    useEffect(() => {
        fetchPages()
    }, [])

    useEffect(() => {
        generateLinks()
    }, [fileNames])

    const generateLinks = () => {
        let links = []
        fileNames.map((fileName) => {
            links.push(`https://uploads.mangadex.org/data/${hash}/${fileName}`)
        })
        setPageUrls(links)
    }

    return (
        <Box bg={useColorModeValue('gray.200', 'gray.800')}>
            <ScrollView>
                {pageUrls
                    ? pageUrls.map((url) => {
                          return (
                              <Image
                                  source={{ uri: url }}
                                  key={url}
                                  alt="test"
                                  height="860px"
                                  mt={2}
                              />
                          )
                      })
                    : ''}
            </ScrollView>
        </Box>
    )
}

export default MangaPage
