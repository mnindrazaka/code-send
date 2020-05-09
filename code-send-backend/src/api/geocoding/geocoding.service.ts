import geocodingUtil from "./geocoding.util";

export default class GeocodingService {
  forward = (query: string) => {
    return geocodingUtil.forward(query);
  };

  reverse = (latitude: number, longitude: number) => {
    return geocodingUtil.reverse(latitude, longitude);
  };
}
