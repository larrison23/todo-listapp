import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

export default function AddTask(props) {
  const [task, setTask] = useState();
  const { onAddTaskPress } = props;

  const handleAddTask = () => {
    if (task != null) {
      onAddTaskPress(task);
      Keyboard.dismiss();
      setTask();
    }
  };

  const handleTextChange = (text) => {
    setTask(text);
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.inputBox}
        placeholder="Add a new task"
        value={task}
        onChangeText={handleTextChange}
      ></TextInput>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F1F1",
  },
  inputBox: {
    flex: 1,
    fontSize: 20,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    padding: 10,
    alignContent: "center",
  },
  addText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#558CF6",
  },
});
