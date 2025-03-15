import { addTodo, getALLTodos } from '@/db/database';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

interface FormComponentProps {
    onAdd: () => void;
}

const FormComponent = ({ onAdd }: FormComponentProps) => {

    const [todo, setTodo] = useState('');

    const handleInput = (value: string) => setTodo(value);

    const handleSubmit = async () => {

        todo !== '' && await addTodo(todo);

        onAdd();
        setTodo('');
    }

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder='Créer une nouvelle tâche'
                placeholderTextColor="#888"
                value={todo}
                onChangeText={handleInput}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Ionicons size={42} name='add-circle' color='#fff' />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    form: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingTop: 35,
        paddingBottom: 25,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,  // Shadow for Android
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginRight: 15,
    },
    addButton: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        elevation: 3,
    },
});

export default FormComponent;