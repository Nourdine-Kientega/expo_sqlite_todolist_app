import { removeTodo } from '@/db/database';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface TodoProps {
    id: number;
    content: string;
    onRemove: () => void;
}

const TodoComponent = ({ id, content, onRemove }: TodoProps) => {

    const [checkedTodo, setCheckedTodo] = useState(false);

    const handleRemoveTodo = async () => {

        await removeTodo(id);
        onRemove();
    };

    return (
        <View style={styles.todo}>
            <Text style={styles.todoText}>{content}</Text>
            <View style={styles.icons}>
                <TouchableOpacity onPress={handleRemoveTodo}>
                    <Ionicons size={18} name='trash' color={'red'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCheckedTodo(!checkedTodo)}>
                    <Ionicons size={18} name={checkedTodo ? 'checkmark-circle' : 'radio-button-off'} color={'blue'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
        position: 'relative',
        width: '90%',
        margin: 'auto',
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        shadowColor: '#a0a0a0',
        elevation: 8,
        justifyContent: 'center',
        paddingRight: 60,
    },
    todoText: {
        fontSize: 14,
    },
    icons: {
        borderColor: '#a0a0a0',
        borderLeftWidth: 1,
        gap: 5,
        flexDirection: 'row',
        paddingLeft: 5,
        position: 'absolute',
        right: 10,
    }
});

export default TodoComponent;