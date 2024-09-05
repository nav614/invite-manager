import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";
import { createRouter } from "./router";

const router = createRouter();

// eslint-disable-next-line react/react-in-jsx-scope
hydrateRoot(document.getElementById("root")!, <StartClient router={router} />);
