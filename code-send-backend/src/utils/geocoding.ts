import Geocoding from "@mapbox/mapbox-sdk/services/geocoding";

export const geocoding = Geocoding({
  accessToken:
    process.env.MAPBOX_TOKEN ||
    "pk.eyJ1IjoibW5pbmRyYXpha2EiLCJhIjoiY2s5aWI3MmFiMTQyOTNlcGhzZzFxcGtkdiJ9.KhOxHwzSjULlMWLWVZPvHA"
});
