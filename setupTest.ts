import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
