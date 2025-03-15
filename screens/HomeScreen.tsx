import { View, Text, StatusBar, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import TodoComponent from '@/components/TodoComponent';
import FormComponent from '@/components/FormComponent';
import { getALLTodos } from '@/db/database';

interface Todo {
    id: number;
    content: string;
}

const HomeScreen = () => {
    

    const [todos, setTodos] = useState<Todo[]>([]);

    const handleFetchTodos = async () => {
        const fetchedTodos = await getALLTodos();
        setTodos(fetchedTodos);
    };

    useEffect(() => {
        handleFetchTodos();
    }, []); 

    useEffect(() => {
        // console.log('todo', todos);  // Log updated todos
    }, [todos]);

  return (  
    <View style={styles.container}>
        <StatusBar backgroundColor={'#f1f1f1'} barStyle={'dark-content'} />
        <Text style={styles.title}>Liste des tâches</Text>

        {/* Todos flatlist  */}
        <FlatList 
            // onRemove={handleFetchTodos}
            contentContainerStyle={styles.flatlistContentContainer}
            data={todos} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
            <TodoComponent {...item} onRemove={handleFetchTodos} />
            )}
        />

        {/* Form */}
        <FormComponent onAdd={handleFetchTodos} />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 32,
      marginTop: 80,
      marginBottom: 10,
      textAlign: 'center',
    },
    flatlistContentContainer: {
      paddingVertical: 5,
    },
});

export default HomeScreen;