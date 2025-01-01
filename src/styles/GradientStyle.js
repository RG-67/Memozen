import { StyleSheet } from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';

export function FirstScreenGradient({children}) {
    return (
        <LinearGradient 
        style={styles.GradientStyle}
        start={{x: 0, y: 0.8}}
        end={{x: 0, y:0}}
        colors={['#d6dac2', '#b5cee8', '#d6dac2']}>
            {children}
        </LinearGradient>
    )
}





const styles = StyleSheet.create({
    GradientStyle: {
        flex: 1
    }
});