import { StyleSheet, View } from "react-native"
import Svg, { Circle, Line, Rect, Text } from "react-native-svg";
import Colors from "../styles/Colors";

const LinearProgressBar = ({ percentage, progressColor }) => {

    return (
        <View style={styles.container}>
            <Svg width="100%" height={8}>
                <Rect x="0" y="0" rx="5" ry="5" fill={Colors.white} width="100%" height="8" />
                <Rect x="0"
                    y="0"
                    width={`${percentage}%`}
                    height="8"
                    rx="5"
                    ry="5"
                    fill={progressColor}/>
            </Svg>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default LinearProgressBar;