import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Switch, useColorModeValue, useColorMode } from 'native-base'

const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Switch isChecked={colorMode=='light'} onToggle={toggleColorMode} size='sm'/>
    )
}

export default ThemeToggle
