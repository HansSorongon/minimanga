import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Text, ScrollView, FlatList, Container, useColorModeValue, Spinner } from 'native-base'

const ChapterList = ({data}) => {
    const containerColor = useColorModeValue('muted.200', 'muted.700')

    return (
        <Box height='100%' px={4} px={4} style={{flex: 1}}>
        {data ?
            <FlatList
            data={data}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity>
                        <Container p={3} bg={containerColor} mb={2} rounded={5}>
                            <Text noOfLines={1} >Chapter {item.chapterNo}: {item.chapterTitle}</Text>
                        </Container>
                    </TouchableOpacity>

                )
            }}
            contentContainerStyle={{ y: '10px' }}
            showsVerticalScrollIndicator={false}
            >
            </FlatList> :
            ''
        }
        </Box>
    )
}

export default ChapterList
