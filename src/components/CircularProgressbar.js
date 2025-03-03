import { StyleSheet, View } from "react-native"
import Svg, { Circle, Text } from "react-native-svg";
import Colors from "../styles/Colors";

const CircularProgressBar = ({percentage}) => {

    const radius = 40;
    const strokeWidth = 10;
    const size = radius * 2 + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (percentage / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={Colors.lightPurple}
                strokeWidth={strokeWidth}
                fill="none"/>
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={Colors.white}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progress}/>
                <Text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="18"
                fontWeight="bold"
                fill={Colors.white}>
                    {`${percentage}%`}
                </Text>
            </Svg>
        </View>
    );
}

export const TaskProgressBar = ({percentage, progressOuterBg, progressInnerBg}) => {

    const radius = 30;
    const strokeWidth = 5;
    const size = radius * 2 + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (percentage / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={progressOuterBg}
                strokeWidth={strokeWidth}
                fill="none"/>
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={progressInnerBg}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progress}/>
                <Text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="15"
                fontWeight="bold"
                fill={Colors.black}>
                    {`${percentage}%`}
                </Text>
            </Svg>
        </View>
    );

}



export const MemberTaskProgressBar = ({percentage, progressOuterBg, progressInnerBg}) => {

    const radius = 30;
    const strokeWidth = 10;
    const size = radius * 2 + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (percentage / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={progressOuterBg}
                strokeWidth={strokeWidth}
                fill="none"/>
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={progressInnerBg}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progress}/>
                <Text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="15"
                fontWeight="bold"
                fill={Colors.black}>
                    {`${percentage}%`}
                </Text>
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


export default CircularProgressBar;