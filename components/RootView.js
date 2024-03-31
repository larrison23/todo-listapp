import { SafeAreaProvider, SafeAreaView } from "react-native";
export default function RootView({ style, children }) {
  return <SafeAreaView style={style}>{children}</SafeAreaView>;
}
