import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HomeScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="Apollo" />
      <Stack.Screen name="MobX" />
      <Stack.Screen name="Detox" />
      <Stack.Screen name="Map" />
    </Stack>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
