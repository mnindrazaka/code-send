import supertest from "supertest";
import app from "app";
import { expect } from "chai";
import geocoding from "./geocoding.util";
import { Location } from "./geocoding.types";

const request = supertest(app);

jest.mock("./geocoding.util");
const geocodingMock = geocoding as jest.Mocked<typeof geocoding>;

describe("geocoding", () => {
  it("can do forward geocoding", async () => {
    const locations: Location[] = [
      {
        latitude: 1,
        longitude: 1,
        name: "name1"
      },
      {
        latitude: 2,
        longitude: 2,
        name: "name2"
      }
    ];
    geocodingMock.forward.mockResolvedValueOnce(locations);
    const forwardGeocodingResponse = await request
      .post("/geocoding/forward")
      .send({ query: "name" });
    expect(forwardGeocodingResponse.body).to.have.length(2);
  });

  it("can show error if forward geocoding error", async () => {
    geocodingMock.forward.mockRejectedValueOnce({ message: "network error" });
    const forwardGeocodingResponse = await request
      .post("/geocoding/forward")
      .send({ query: "name" });
    expect(forwardGeocodingResponse.body)
      .to.have.property("status")
      .equal("error");
    expect(forwardGeocodingResponse.body)
      .to.have.property("message")
      .equal("network error");
  });

  it("can do reverse geocoding", async () => {
    geocodingMock.reverse.mockResolvedValueOnce("jawa timur");
    const reverseGeocodingResponse = await request
      .post("/geocoding/reverse")
      .send({ latitude: 1, longitude: 1 });
    expect(reverseGeocodingResponse.body)
      .to.has.property("name")
      .equal("jawa timur");
  });

  it("can show error if reverse geocoding error", async () => {
    geocodingMock.reverse.mockRejectedValueOnce({ message: "network error" });
    const reverseGeocodingResponse = await request
      .post("/geocoding/reverse")
      .send({ latitude: 1, longitude: 1 });
    expect(reverseGeocodingResponse.body)
      .to.have.property("status")
      .equal("error");
    expect(reverseGeocodingResponse.body)
      .to.have.property("message")
      .equal("network error");
  });
});
