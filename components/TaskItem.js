import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TaskItem(props) {
  const { text, isCompleted, onCompletedPress, onDeletePress } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCompletedPress} style={styles.task_item}>
        <View style={styles.square}>
          {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <Text style={[styles.task_font, isCompleted && styles.completedText]}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeletePress}>
        <View style={styles.trashCan}>
          <Text style={styles.trashCanText}>&#128465;</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  task_item: {
    backgroundColor: "white",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 14,
    shadowOpacity: 0.1,
    flex: 1,
  },
  task_font: {
    fontSize: 20,
    fontWeight: "400",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#8DDFDA66",
    borderRadius: 4,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  trashCan: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  trashCanText: {
    color: "#000",
    fontSize: 35,
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});
