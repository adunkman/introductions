import pipelineConfig from "./app.json";
import { readFile } from "fs/promises";

test("app.json uses the same stack as terraform configuration", async () => {
  const terraformConfig = await readFile("./terraform/heroku.tf", "utf-8");

  expect(pipelineConfig).toHaveProperty("stack");
  expect(terraformConfig).toContain(pipelineConfig.stack);
});
