import { TouchableOpacity } from 'react-native'
import { FlatList, Text, Container, HStack,
        VStack, Flex, Box, useColorModeValue, Image } from 'native-base'

const SearchResults = () => {
    const manga = ['Attack on titan', 'Fullmetal Alchemist', 'Jujutsu Kaisen']
    const boxBackground = useColorModeValue('gray.200', 'gray.800')

    return (
        <FlatList
            style={{height: '100%'}}
            data={manga}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity>
                        <HStack h={140} rounded={10} mt={5} p={5} w='100%' bg={boxBackground} justifyContent='space-between'>
                            <VStack w='70%'>
                                <Text fontSize='16px' fontWeight='bold' noOfLines={2}>{item}</Text>
                            </VStack>
                            <Image
                                rounded={15}
                                alt='pic'
                                source={{uri: 'https://pbs.twimg.com/media/EJ9M3BsXsAUcSxf.jpg:large'}}
                                width='25%'
                                height='100%'
                            />
                        </HStack>
                    </TouchableOpacity>
                )
            }}
        >
        </FlatList>
    )
}

export default SearchResults
