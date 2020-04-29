import { geocoding } from "utils/geocoding";
import { Location } from "./geocoding.types";

export default class GeocodingService {
  forward = (query: string) => {
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

  reverse = (latitude: number, longitude: number) => {
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
}
