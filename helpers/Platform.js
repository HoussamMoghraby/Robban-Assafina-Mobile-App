import { Platform } from "react-native";


export function isPlatformAndroid() {
    return Platform.OS === 'android';
};

export function getPlatformVersion() {
    return Platform.Version;
}

export function isPlatformIOS() {
    return Platform.OS === 'ios';
};