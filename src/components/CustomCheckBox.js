import { Pressable, StyleSheet } from "react-native"
import Colors from "../styles/Colors"
import { useState } from "react"
import Icon from 'react-native-vector-icons/Ionicons';


const CustomCheckBox = ({ checked, onToggle }) => {

    return (
        <Pressable style={styles.checkBtn} onPress={onToggle}>
            {checked ? (
                <>
                    <Icon name="checkbox" size={18} style={{ color: Colors.blue, textAlign: 'center', textAlignVertical: 'center' }} />
                </>
            ) : (
                <>

                </>
            )}
        </Pressable>
    )
}



const styles = StyleSheet.create({
    checkBtn: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1.2,
        borderColor: Colors.red,
        position: 'absolute',
        start: 5,
        top: 5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CustomCheckBox;