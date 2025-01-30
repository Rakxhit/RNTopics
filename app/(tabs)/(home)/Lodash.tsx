import { StyleSheet, Text, View } from "react-native";
import React from "react";
var _ = require("lodash");

const Lodash = () => {
  const chunk = _.chunk(
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
    3
  ); // make chunk of 3 elements per array

  const compact = _.compact([0, 1, "", 2, "", 3]); //return only the truthy value of the Array

  var arr = [1];
  var concat = _.concat(arr, 2, [3], [[4]]); //Creates a new array concatenating array with any additional arrays and/or values.

  const difference = _.difference([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5]); //Creates an array of array values not included in the other given arrays

  return (
    <View style={styles.container}>
      <Text>Lodash</Text>
    </View>
  );
};

export default Lodash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
