import { createRoot } from "react-dom/client";
import { Header } from "./Header";
import { Main } from "./MainContent";
import "./index.css";

const root = createRoot(document.getElementById("app"));
root.render(<Main />);
