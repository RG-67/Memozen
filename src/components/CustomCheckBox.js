import { Pressable, StyleSheet } from "react-native"
import Colors from "../styles/Colors"
import { useState } from "react"


const CustomCheckBox = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Pressable style={{ ...styles.checkBtn, backgroundColor: checked ? Colors.green : Colors.white }} onPress={() => setChecked(!checked)} />
    )
}



const styles = StyleSheet.create({
    checkBtn: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.deepGrey,
        position: 'absolute',
        start: 5,
        top: 5
    }
});

export default CustomCheckBox;