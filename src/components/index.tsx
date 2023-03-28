import dynamic from "next/dynamic";

export { default as Header } from "./Header";
export const WeatherBody = dynamic(() => import("./WeatherBody"), {
  ssr: false,
});
