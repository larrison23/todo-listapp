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

export default function App() {
  const [items, setItems] = useState([]);

  const handleTaskPressed = async (index) => {
    let updatedTasks = [...items];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    updatedTasks.push(updatedTasks.splice(index, 1)[0]);
    setItems(updatedTasks);

    try {
      await AsyncStorage.setItem("task-arr", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  const onAddTaskPress = async (text) => {
    const updatedTasks = [...items, { text: text, isCompleted: false }];
    setItems(updatedTasks);

    try {
      await AsyncStorage.setItem("task-arr", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  const onDeleteTaskPress = async (index) => {
    const updatedTasks = [...items];
    updatedTasks.splice(index, 1);
    setItems(updatedTasks);

    try {
      await AsyncStorage.setItem("task-arr", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("task-arr");
        if (storedTasks != null) {
          updatedTasks = JSON.parse(storedTasks);
          setItems([...updatedTasks]);
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage: ", error);
      }
    };

    loadTasks();
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
                text={item.text}
                key={index}
                onCompletedPress={() => handleTaskPressed(index)}
                onDeletePress={() => onDeleteTaskPress(index)}
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
