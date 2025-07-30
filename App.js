import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import RootView from "./components/RootView";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching tasks from server: ", error);
    }
  };

  const onAddTaskPress = async (task) => {
    try {
      console.log(task);
      const response = await axios.post("http://localhost:3000/api/tasks", {
        title: task,
        isCompleted: false,
      });
      setItems((items) => [...items, response.data]);
    } catch (error) {
      console.error("Error adding task to server: ", error);
    }
  };

  const handleTaskPressed = async (index) => {
    const updatedTasks = [...items];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    // updatedTasks.push(updatedTasks.splice(index, 1)[0]);
    setItems(updatedTasks);
    console.log(
      updatedTasks[index],
      updatedTasks[index].id,
      updatedTasks[index].isCompleted
    );
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/${updatedTasks[index].id}:id`,
        {
          id: updatedTasks[index].id,
          isCompleted: updatedTasks[index].isCompleted,
          title: updatedTasks[index].title,
        }
      );
    } catch (error) {
      console.error("Error updating task on server: ", error);
    }
  };

  const onDeleteTaskPress = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}:id`);
      setItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting task from server: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <RootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.title_wrapper}>
          <Text style={styles.title_font}>Today's Tasks</Text>
        </View>
        <View style={styles.tasks_wrapper}>
          <FlatList
            data={items}
            renderItem={({ item, index }) => (
              <TaskItem
                text={item.title}
                key={index}
                onCompletedPress={() => handleTaskPressed(index)}
                onDeletePress={() => onDeleteTaskPress(item.id)}
                isCompleted={item.isCompleted}
              ></TaskItem>
            )}
          />
        </View>
      </View>
      <View style={styles.bottomContainer} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addTaskContainer}
      >
        <AddTask onAddTaskPress={onAddTaskPress} />
      </KeyboardAvoidingView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
  },
  title_wrapper: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  title_font: {
    fontSize: 34,
    fontWeight: "bold",
  },
  tasks_wrapper: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingBottom: 32,
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
  bottomContainer: {
    height: 115,
  },
});
