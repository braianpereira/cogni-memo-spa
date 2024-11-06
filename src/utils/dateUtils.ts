export function getUTC3Date(): Date {
  const now = new Date();
  now.setHours(now.getHours() - 3); // Ajusta para UTC-3
  return now;
}
