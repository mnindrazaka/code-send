import Geocoding from "@mapbox/mapbox-sdk/services/geocoding";

export const geocoding = Geocoding({
  accessToken: process.env.MAPBOX_TOKEN || ""
});
