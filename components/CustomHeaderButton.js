import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/CustomColors';
import { Platform } from 'react-native';
import { isPlatformAndroid } from '../helpers/Platform';

const CustomHeaderButton = (props) => {
    const iconComponent = props.iconComponent ? props.iconComponent : Ionicons;
    return (
        <HeaderButton {...props}
            IconComponent={iconComponent}
            iconSize={25}
            color={props.color ? props.color : (isPlatformAndroid() ? '#fff' : Colors.primaryColor)}
        ></HeaderButton>
    )
};

export default CustomHeaderButton;