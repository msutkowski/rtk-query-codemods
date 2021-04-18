const child_process = require("child_process");
const path = require("path");
const transformer = require.resolve("./v2-v3");

it("transforms correctly", () => {
  const result = child_process.spawnSync(
    path.join(__dirname, "../node_modules", ".bin", "jscodeshift"),
    [
      "--dry",
      "--print",
      "--run-in-band",
      "-t",
      transformer,
      "--extensions=ts",
      "--parser=ts",
      path.join(__dirname, "./mocks/api.input.ts"),
    ],
    {
      encoding: "utf8",
    }
  );

  expect(result.stdout).not.toEqual(expect.stringContaining("entityTypes:"));
  expect(result.stdout).toEqual(expect.stringContaining("tagTypes:"));

  expect(result.stdout).not.toEqual(expect.stringContaining("addEntityTypes:"));
  expect(result.stdout).toEqual(expect.stringContaining("addTagTypes:"));

  expect(result.stdout).not.toEqual(expect.stringContaining("provides:"));
  expect(result.stdout).toEqual(expect.stringContaining("providesTags:"));

  expect(result.stdout).not.toEqual(expect.stringContaining("invalidates:"));
  expect(result.stdout).toEqual(expect.stringContaining("invalidatesTags:"));
});
