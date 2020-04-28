import { geocoding } from "utils/geocoding";
import { Place } from "./geocoding.types";

export default class GeocodingService {
  forward = (query: string) => {
    return new Promise<Place[]>(async (resolve, reject) => {
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
}
