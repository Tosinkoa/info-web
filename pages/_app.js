import "../styles/globals.css";
import { ContextProvider } from "../store/MyContext";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
