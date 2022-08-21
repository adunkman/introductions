import { readFile } from "fs/promises";
import { describe, it, expect } from "vitest";
import pipelineConfig from "../app.json";

describe.concurrent("app.json", () => {
  it("uses the same stack as terraform configuration", async () => {
    const terraformConfig = await readFile("./terraform/heroku.tf", "utf-8");

    expect(pipelineConfig).toHaveProperty("stack");
    expect(terraformConfig).toContain(pipelineConfig.stack);
  });
});
