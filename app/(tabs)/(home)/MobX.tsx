import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Todo } from "@/mobxStore/todo";
import { observer } from "mobx-react-lite";

const todoStore = new Todo();

const MobX = observer(() => {
  const [text, setText] = useState<string>("");

  const onChangeText = useCallback((val: string) => {
    setText(val);
  }, []);

  const onPressAddTodo = useCallback(() => {
    if (!!text) {
      console.log("ADDED THE TEXT");
      todoStore.addNewTodo(text);
      setText(""); // Reset text input after adding
    }
  }, [text]);

  const onPressId = (id: number) => () => {
    todoStore.toggle(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        testID="todo-textinput"
        value={text}
        placeholder="Add the title here"
        style={styles.inputStyle}
        onChangeText={onChangeText}
        onSubmitEditing={onPressAddTodo}
      />
      <Button
        title="Add a ToDo"
        onPress={onPressAddTodo}
        testID="Add-todo-button"
      />
      <ScrollView style={{ marginTop: 20 }} keyboardDismissMode="on-drag">
        {todoStore.todoState.map((todo, index) => (
          <TouchableOpacity
            onPress={onPressId(todo.id)}
            key={todo.id}
            style={styles.textItem}>
            <Text>
              {index + 1}
              {"  "}
              <Text
                style={
                  todo.finished ? styles.finishedText : styles.unFinishedText
                }>
                {todo.title}
              </Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
});

export default MobX;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputStyle: {
    alignSelf: "center",
    padding: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop: 20,
  },
  textItem: {
    marginTop: 20,
    marginLeft: 20,
  },
  finishedText: {
    textDecorationLine: "line-through",
    fontSize: 20,
    fontWeight: "bold",
    color: "pink",
  },
  unFinishedText: { fontSize: 20, fontWeight: "bold", color: "red" },
});
