import Geocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { Location } from "./geocoding.types";

const geocoding = Geocoding({
  accessToken:
    process.env.MAPBOX_TOKEN ||
    "pk.eyJ1IjoibW5pbmRyYXpha2EiLCJhIjoiY2s5aWI3MmFiMTQyOTNlcGhzZzFxcGtkdiJ9.KhOxHwzSjULlMWLWVZPvHA"
});

const forward = (query: string) => {
  return new Promise<Location[]>(async (resolve, reject) => {
    try {
      const { body } = await geocoding
        .forwardGeocode({
          query,
          mode: "mapbox.places",
          types: ["region"]
        })
        .send();
      const places = body.features as Array<{
        place_name: string;
        center: [number, number];
      }>;
      resolve(
        places.map(place => ({
          latitude: place.center[1],
          longitude: place.center[0],
          name: place.place_name
        }))
      );
    } catch (error) {
      reject(error);
    }
  });
};

const reverse = (latitude: number, longitude: number) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const { body } = await geocoding
        .reverseGeocode({
          query: [longitude, latitude],
          mode: "mapbox.places",
          types: ["region"]
        })
        .send();
      resolve(body.features[0].place_name);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  forward,
  reverse
};
