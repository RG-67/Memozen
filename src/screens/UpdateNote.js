import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../styles/Colors";
import { Picker } from "@react-native-picker/picker";
import { deleteNoteById, getNoteByNoteId, updateNoteById } from "../redux/actions/NoteActions";
import { noteUpdateValidation } from "../hooks/NoteValidation";
import { dateConverter } from "../utility/Converter";



const UpdateNote = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // const [note, setNote] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [tag, setTag] = useState("");


    useFocusEffect(
        useCallback(() => {
            const getNote = async () => {
                const { noteId } = route.params;
                const result = await dispatch(getNoteByNoteId(noteId));
                if (result) {
                    const date = new Date(result.data.updated_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })
                    // setNote(result.data);
                    setTitle(result.data.title);
                    setDesc(result.data.content);
                    setCreateDate(date);
                    setTag(result.data.tag);
                }
            }
            getNote();
        }, [])
    );

    const noteValidation = () => {
        const validation = noteUpdateValidation(desc);
        if (validation) return ToastAndroid.show(validation, ToastAndroid.SHORT);
        else updateNote();
    }

    const updateNote = async () => {
        try {
            const { noteId } = route.params;
            const result = await dispatch(updateNoteById(noteId, title, desc, tag));
            ToastAndroid.show("Note updated successfully", ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {
            console.error("UpdateNoteScreenErr: ", error);
        }
    }

    const showAlert = () => {
        Alert.alert("Are you sure?", "You want to delete", [
            {
                text: "Cancel",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "OK",
                onPress: () => { deleteNote(); },
                style: "default"
            }
        ]);
    }


    const deleteNote = async () => {
        try {
            const { noteId } = route.params;
            const result = await dispatch(deleteNoteById(noteId));
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {

        }
    }


    return (
        <View style={styles.mainContainer}>

            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <Pressable onPress={() => { navigation.goBack() }} style={styles.backBtn}>
                    <Icon name="arrow-back" size={25} style={{ alignSelf: 'center' }} />
                </Pressable>
                <Text style={styles.title}>Note</Text>
            </View>

            <ScrollView>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>

                    <Text style={styles.textStyle}>Title</Text>
                    <TextInput style={{ ...styles.inputStyle, fontSize: 14, paddingHorizontal: 5, fontWeight: '500' }}
                        value={title}
                        placeholder="Title"
                        numberOfLines={1}
                        keyboardType="default"
                        onChangeText={setTitle}
                    />

                    <Text style={{ ...styles.textStyle, marginTop: 10 }}>Description</Text>
                    <TextInput style={{ ...styles.inputStyle, fontSize: 14, paddingHorizontal: 5, minHeight: 250, textAlignVertical: 'top', fontWeight: '300' }}
                        value={desc}
                        placeholder="Description"
                        multiline
                        keyboardType="default"
                        onChangeText={setDesc}
                    />

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}

                    <View>
                        <Text style={{ ...styles.textStyle }}>Create Date</Text>
                        <Pressable onPress={() => { }}>
                            <View style={{ ...styles.inputStyle, flexDirection: 'row', paddingStart: 5, paddingEnd: 5, justifyContent: 'space-between' }}>
                                <TextInput style={{ fontSize: 14, fontWeight: '400', width: 120, height: 40 }}
                                    value={createDate}
                                    placeholder="Date"
                                    keyboardType="default"
                                    editable={false} />
                                <Icon name="calendar-today" size={20} style={{ alignSelf: 'center' }} />
                            </View>
                        </Pressable>
                    </View>

                    <View style={{}}>
                        <Text style={{ ...styles.textStyle }}>Category</Text>
                        <View style={{ ...styles.inputStyle, height: 45, justifyContent: 'center' }}>
                            <Picker
                                selectedValue={tag}
                                onValueChange={(item) => setTag(item)}
                            >
                                <Picker.Item label="Important" value="Important" />
                                <Picker.Item label="Not Important" value="Not Important" />
                            </Picker>
                        </View>
                    </View>

                    {/* </View> */}


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 20 }}>
                        <TouchableOpacity style={{ ...styles.btnStyle, backgroundColor: Colors.red }} onPress={() => showAlert()}>
                            <Text style={styles.btnTextStyle}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnStyle, backgroundColor: Colors.grGreen }} onPress={() => { noteValidation() }}>
                            <Text style={styles.btnTextStyle}>Update</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>

        </View>
    )
}




const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    backBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.charcoal,
        width: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
    },
    textStyle: {
        color: Colors.charcoal,
        fontWeight: '500',
        fontSize: 15,
        marginTop: 15
    },
    inputStyle: {
        color: Colors.black,
        borderWidth: 1.5,
        borderColor: Colors.charcoal,
        borderRadius: 5,
        marginTop: 5
    },
    btnTextStyle: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.white
    },
    btnStyle: {
        height: 45,
        width: 165,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center'
    }
});



export default UpdateNote;