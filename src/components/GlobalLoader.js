import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux"
import Colors from "../styles/Colors";


const GlobalLoader = () => {
    const isLoading = useSelector(state => state.loading.isLoading);

    if (!isLoading) return null;

    return (
        <View style={Styles.overlay}>
            <ActivityIndicator size="large" color={Colors.colorPrimary} />
        </View>
    )
}


const Styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
    }
});


export default GlobalLoader;