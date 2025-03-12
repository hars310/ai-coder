import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/user.context";

function App() {
  return (
    <>
      <UserProvider>
        <Toaster />
        <AppRoutes />
      </UserProvider>
    </>
  );
}

export default App;
