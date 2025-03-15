import * as SQLite from 'expo-sqlite';

interface Todo {
    id: number;
    is_completed: number;
    content: string;
}

// Initialize database and create table
const initializeDB = async () => {

    try {

        const db = await SQLite.openDatabaseAsync('todo_app');

        await db.execAsync(`CREATE TABLE IF NOT EXISTS todos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            is_completed BOOLEAN DEFAULT FALSE,
            content TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

    } catch (error) {
        console.error('Error database inititialization: ', error);
    }
};

const getALLTodos = async () => {

    try {

        const db = await SQLite.openDatabaseAsync('todo_app');

        const result = await db.getAllAsync('SELECT * FROM todos');

        return result as Todo[];

    } catch (error) {
        console.error('Error when fetching todos:', error);
        return [];
    }
};

// Add todo
const addTodo = async (content: string) => {

    try {
        const db = await SQLite.openDatabaseAsync('todo_app');
        const result = await db.runAsync(
            `INSERT INTO todos(content) VALUES (?)`,
            [content]
        );

    } catch (error) {
        console.error('Failed to add an todo:', error);
    }
};

// Update todo
const updateTodo = async (id: number, is_completed: number) => {

    try {
      const db = await SQLite.openDatabaseAsync('todo_app');

      const result = await db.runAsync(
        `UPDATE todos SET is_completed = ? WHERE id = ?`,
        [is_completed, id]
      );

    } catch (error) {
    
      console.error('Error occured when updating article:', error);
    }
};

// Delete todo
const removeTodo = async (id: number) => {

    try {
        const db = await SQLite.openDatabaseAsync('todo_app');

        const result = await db.runAsync(
            `DELETE FROM todos WHERE id = $todosId`,
            { $todosId: id }
        );

    } catch (error) {
        console.error('todo deletion failed:', error);
    }
};

export { initializeDB, getALLTodos, addTodo, updateTodo, removeTodo };