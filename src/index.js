import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.200", "gray.200")(props),
      },
    }),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
