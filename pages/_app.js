import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const html = document.querySelector("html");
      if (e.matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    });
  }
  return <Component {...pageProps} />
}
