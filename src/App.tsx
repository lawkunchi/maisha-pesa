import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./common/routes/route";
import { AuthProvider } from "./auth/context/ AuthContext";
import { ThemeProvider } from "./theme/ThemeProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
