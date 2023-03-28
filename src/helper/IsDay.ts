export default function isDay(): boolean {
  const time = new Date().getHours();
  return time >= 6 && time <= 18;
}
