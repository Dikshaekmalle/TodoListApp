import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';

const App = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodoItems([...todoItems, { id: Date.now().toString(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todoItems.find((item) => item.id === id);
    if (todoToEdit) {
      setEditTodo({
        id: todoToEdit.id,
        text: todoToEdit.text,
      });
    }
  };

  const handleUpdateTodo = () => {
    if (editTodo && editTodo.text.trim() !== '') {
      setTodoItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editTodo.id ? { ...item, text: editTodo.text } : item
        )
      );
      setEditTodo(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
      <FlatList
        data={todoItems}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoTextContainer}>
              {editTodo && editTodo.id === item.id ? (
                <TextInput
                  style={styles.editInput}
                  value={editTodo.text}
                  onChangeText={(text) =>
                    setEditTodo({ ...editTodo, text: text })
                  }
                />
              ) : (
                <Text style={styles.todoText}>{item.text}</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              {!editTodo || (editTodo && editTodo.id !== item.id) ? (
                <Button
                  title="Edit"
                  onPress={() => handleEditTodo(item.id)}
                />
              ) : (
                <Button title="Update" onPress={handleUpdateTodo} />
              )}
              <Button
                title="Delete"
                onPress={() => handleDeleteTodo(item.id)}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingLeft: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
})
export default App;
