import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeObservable, observable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";

type TodoType = {
  title: string;
  id: number;
  finished: boolean;
};

export class Todo {
  todoState: TodoType[] = [
    {
      id: Math.random(),
      title: "First Task",
      finished: true,
    },
    {
      id: Math.random(),
      title: "Second Task",
      finished: false,
    },
  ];

  constructor() {
    makeObservable(this, {
      todoState: observable,
      addNewTodo: action,
      toggle: action,
    }),
      makePersistable(this, {
        name: "TODO",
        properties: ["todoState"],
        storage: AsyncStorage,
      });
  }

  toggle(id: number) {
    const todo = this.todoState.find((todo) => todo.id === id);
    if (todo) {
      todo.finished = !todo.finished;
    }
  }

  addNewTodo(todoTitle: string) {
    const newTodo: TodoType = {
      title: todoTitle,
      finished: false,
      id: Math.random(),
    };
    this.todoState.push(newTodo);
  }
}
