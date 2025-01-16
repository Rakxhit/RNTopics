import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { gql, useQuery, useSuspenseQuery } from "@apollo/client";
const POLLING_SECONDS = 5000;

const Apollo = () => {
  const GET_USER_DATE = gql`
    query {
      company {
        ceo
      }
    }
  `;

  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_USER_DATE,
    {
      pollInterval: POLLING_SECONDS, // This api will get called every single second
      notifyOnNetworkStatusChange: true, // This will regenerate the data instead of showing the same data on the refetch and the loading state will also be maintained
      variables: {
        name: "users",
      },
    }
  );

  const { data: suspenseData } = useSuspenseQuery(GET_USER_DATE);
  console.log("suspenseData: ", suspenseData);

  if (error) return <Text>What an error</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text>Default polling is {POLLING_SECONDS}</Text>
        <Text style={{ opacity: loading ? 0.2 : 1, paddingVertical: 20 }}>
          {data?.company?.ceo}
        </Text>
        <Button
          testID="start-polling"
          title="Start polling on 1 second"
          onPress={() => {
            startPolling(1000);
          }}
        />
        <Button
          testID="stop-polling"
          title="Stop polling "
          onPress={() => {
            stopPolling();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Apollo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  mainContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
});
