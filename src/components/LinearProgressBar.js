import { StyleSheet, View } from "react-native"
import Svg, { Circle, Line, Rect, Text } from "react-native-svg";
import Colors from "../styles/Colors";

const LinearProgressBar = ({ percentage }) => {

    return (
        <View style={styles.container}>
            <Svg width="100%" height={15}>
                <Rect x="0" y="0" rx="10" ry="10" fill={Colors.black} />
                <Rect x="0"
                    y="0"
                    width={`${percentage}%`}
                    height="15"
                    rx="10"
                    ry="10"
                    fill={Colors.white}/>
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