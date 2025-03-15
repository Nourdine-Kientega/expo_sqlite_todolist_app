import { getALLTodos, removeTodo, updateTodo } from '@/db/database';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface TodoProps {
    id: number;
    is_completed: number;
    content: string;
    onRemove: () => void;
}

const TodoComponent = ({ id, content, is_completed, onRemove }: TodoProps) => {

    const [checkedTodo, setCheckedTodo] = useState<boolean>(is_completed === 1);

    const handleRemoveTodo = async () => {

        await removeTodo(id); 
        onRemove();
    };

    
    const handleCheckedTodo = async () => {

        const newCheckedState = !checkedTodo; // Toggle the state

        setCheckedTodo(newCheckedState);
        await updateTodo(id, newCheckedState ? 1 : 0);
        onRemove();

    };

    useEffect(() => {
        // If the `is_completed` prop changes, sync it with the state
        setCheckedTodo(is_completed === 1);
    }, [is_completed]);

    
    return (
        <View style={styles.todo}>
            <Text style={styles.todoText}>{content}</Text>
            <View style={styles.icons}>
                <TouchableOpacity onPress={handleRemoveTodo}>
                    <Ionicons size={18} name='trash' color={'red'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCheckedTodo}>
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