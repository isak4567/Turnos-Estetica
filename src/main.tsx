
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
import { AppointmentProvider } from "./app/context/index.tsx";
 

  createRoot(document.getElementById("root")!).render(
    <AppointmentProvider>
      <App />
    </AppointmentProvider>
);
  