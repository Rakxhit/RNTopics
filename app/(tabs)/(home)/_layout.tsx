import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HomeScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Apollo" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
