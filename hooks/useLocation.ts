import * as Device from "expo-device"
import * as Location from "expo-location"
import { useEffect, useState } from "react"
import { Platform } from "react-native"

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState(null)

  const fetchGeocode = async (location: Location.LocationObject) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location.coords.latitude},${location.coords.longitude}&key=API_KEY_GOES_HERE`
      )
      const responseJson = await response.json()
      setAddress(responseJson)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === "android" && !Device.isDevice) {
        setError(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        )
        return
      }
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setError("Permission to access location was denied")
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      fetchGeocode(location)
      setLocation(location)
    }

    getCurrentLocation()
  }, [])

  return { error, location }
}
