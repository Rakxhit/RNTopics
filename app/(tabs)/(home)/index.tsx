import { router, Stack } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  ScrollView,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>Learning Topics of react native</Text>
        <View style={{ justifyContent: "center" }}>
          <Button
            title="Apollo"
            onPress={() => {
              router.navigate("/Apollo");
            }}
          />
          <Button
            title="MobX"
            onPress={() => {
              router.navigate("/MobX");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  titleText: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
});
