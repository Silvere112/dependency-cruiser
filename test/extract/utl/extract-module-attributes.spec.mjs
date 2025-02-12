import { expect } from "chai";
import extractModuleAttributes from "../../../src/extract/utl/extract-module-attributes.js";

describe("[U] extract/utl/extract-module-attributes", () => {
  it("leaves regular module specifications alone", () => {
    expect(extractModuleAttributes("protodash")).to.deep.equal({
      module: "protodash",
    });
  });

  it("extracts the protocol if there is one", () => {
    expect(extractModuleAttributes("node:fs")).to.deep.equal({
      module: "fs",
      protocol: "node:",
    });
  });

  it("leaves things alone the protocol is unknown", () => {
    expect(extractModuleAttributes("nod:fs")).to.deep.equal({
      module: "nod:fs",
    });
  });

  it("manages empty strings gracefully", () => {
    expect(extractModuleAttributes("")).to.deep.equal({
      module: "",
    });
  });

  it("extracts both protocol and mimeType when they're in the URI", () => {
    expect(
      extractModuleAttributes("data:application/json,gegevens.json")
    ).to.deep.equal({
      module: "gegevens.json",
      protocol: "data:",
      mimeType: "application/json",
    });
  });

  it("handles emtpy mimeTypes gracefulley", () => {
    expect(extractModuleAttributes("data:,gegevens.json")).to.deep.equal({
      module: ",gegevens.json",
      protocol: "data:",
    });
  });

  it("when protocol separator is mistyped, returns it as part of the module name", () => {
    expect(
      extractModuleAttributes("data:application/json;gegevens.json")
    ).to.deep.equal({
      module: "application/json;gegevens.json",
      protocol: "data:",
    });
  });
});
