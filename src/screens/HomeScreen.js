import {
    Flex,
    useColorModeValue,
} from 'native-base'

import SearchResults from '../components/SearchResults'

const HomeScreen = () => {
    return (
        <Flex
            bg={useColorModeValue('muted.50', 'gray.900')}
            height="100%"
            px="10px"
        >
            <SearchResults />
        </Flex>
    )
}

export default HomeScreen
