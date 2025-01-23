import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocation } from "@/hooks/useLocation";

const Map = () => {
  const mapViewRef = useRef<MapView>();
  const { location } = useLocation();
  const initialPosition: Region = {
    latitude: location?.coords?.latitude ?? 0,
    latitudeDelta: 0.1,
    longitude: location?.coords?.longitude ?? 0,
    longitudeDelta: 0.1,
  };

  function getDistanceFromLatLonInKm({
    lat1,
    lon1,
    lat2,
    lon2,
  }: {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
  }) {
    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  const markerData = [
    { latitude: 23.06098, longitude: 72.53712 },
    { latitude: 23.04432, longitude: 72.52345 },
    { latitude: 23.05891, longitude: 72.54167 },
    { latitude: 23.04789, longitude: 72.51812 },
    { latitude: 23.05345, longitude: 72.52678 },
    { latitude: 23.06234, longitude: 72.53389 },
    { latitude: 23.04912, longitude: 72.52845 },
    { latitude: 23.05778, longitude: 72.53534 },
    { latitude: 23.05034, longitude: 72.54212 },
    { latitude: 23.04867, longitude: 72.52987 },
    { latitude: 23.05589, longitude: 72.52234 },
    { latitude: 23.04612, longitude: 72.53891 },
    { latitude: 23.05987, longitude: 72.52456 },
    { latitude: 23.05478, longitude: 72.53123 },
    { latitude: 23.04567, longitude: 72.53456 },
    { latitude: 23.05134, longitude: 72.54089 },
    { latitude: 23.05291, longitude: 72.51934 },
    { latitude: 23.06123, longitude: 72.52512 },
    { latitude: 23.05089, longitude: 72.53745 },
    { latitude: 23.05678, longitude: 72.52912 },
    { latitude: 23.04834, longitude: 72.53478 },
    { latitude: 23.04978, longitude: 72.52267 },
    { latitude: 23.05845, longitude: 72.53923 },
    { latitude: 23.04712, longitude: 72.52089 },
    { latitude: 23.05312, longitude: 72.53034 },
    { latitude: 23.05567, longitude: 72.53678 },
    { latitude: 23.05012, longitude: 72.52567 },
    { latitude: 23.06178, longitude: 72.52891 },
    { latitude: 23.04789, longitude: 72.53956 },
    { latitude: 23.05634, longitude: 72.52234 },
    { latitude: 23.05912, longitude: 72.52678 },
    { latitude: 23.04678, longitude: 72.53112 },
    { latitude: 23.05389, longitude: 72.53767 },
    { latitude: 23.04812, longitude: 72.52178 },
    { latitude: 23.05145, longitude: 72.53823 },
    { latitude: 23.05734, longitude: 72.52956 },
    { latitude: 23.04956, longitude: 72.53312 },
    { latitude: 23.05434, longitude: 72.52412 },
    { latitude: 23.06012, longitude: 72.53189 },
    { latitude: 23.04878, longitude: 72.53067 },
    { latitude: 23.05267, longitude: 72.52289 },
    { latitude: 23.05945, longitude: 72.53512 },
    { latitude: 23.04589, longitude: 72.52734 },
    { latitude: 23.05823, longitude: 72.53978 },
    { latitude: 23.05078, longitude: 72.51945 },
    { latitude: 23.05412, longitude: 72.52634 },
    { latitude: 23.05689, longitude: 72.53278 },
    { latitude: 23.04912, longitude: 72.52356 },
    { latitude: 23.05178, longitude: 72.53634 },
    { latitude: 23.06034, longitude: 72.52823 },
  ];
  const locationData: Region = initialPosition;

  const [currLocation, setCurrLocation] = useState<Region>(locationData);
  const getCurrentLocation = () => {
    mapViewRef.current?.animateToRegion(initialPosition, 1000);
  };

  const onRegionChangeComplete = (region: Region) => {
    setCurrLocation(region);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>{JSON.stringify(currLocation)}</Text>
      <View style={styles.map}>
        <MapView
          ref={mapViewRef}
          initialRegion={{
            latitude: location?.coords.latitude ?? 0,
            latitudeDelta: 0.1,
            longitude: location?.coords.longitude ?? 0,
            longitudeDelta: 0.1,
          }}
          style={styles.mapContainerStyle}
          paddingAdjustmentBehavior="automatic"
          showsUserLocation //To show the current location dot
          followsUserLocation
          userLocationCalloutEnabled
          onRegionChangeComplete={onRegionChangeComplete}
          showsMyLocationButton={true}
          loadingEnabled>
          {markerData.map((marker, index) => {
            const distanceFromCurrentLocation = getDistanceFromLatLonInKm({
              lat1: currLocation.latitude,
              lon1: currLocation.longitude,
              lat2: initialPosition.latitude,
              lon2: initialPosition.longitude,
            });
            return (
              <Marker
                key={index.toString()}
                title={distanceFromCurrentLocation.toString()}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              />
            );
          })}
        </MapView>
        {(currLocation.longitudeDelta < 2 ||
          currLocation.latitudeDelta < 2) && (
          <View style={styles.centerMarker}>
            <View style={styles.marker} />
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
        <Text>Get Current Location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { height: "75%", width: "100%" },
  centerMarker: { position: "absolute", top: "50%", left: "50%" },
  marker: {
    height: 2,
    width: 2,
    right: 1,
    bottom: 1,
    backgroundColor: "red",
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "lightskyblue",
    borderRadius: 30,
    marginTop: 10,
    paddingVertical: 10,
    width: "90%",
  },
  mapContainerStyle: { height: "100%", width: "100%" },
});
