import { isPlatformAndroid, getPlatformVersion, isPlatformIOS } from '../helpers/Platform';
import { TouchableNativeFeedback, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

const TouchableComponent =
    //isPlatformIOS()
    (isPlatformAndroid()
        &&
        getPlatformVersion() > 21) ? TouchableNativeFeedback : TouchableOpacity;

export default TouchableComponent;