import { TaskConfig } from "./taskConfig";

try {
    new TaskConfig();
} catch (e) {
  console.log(e);
  while (true) { }
}