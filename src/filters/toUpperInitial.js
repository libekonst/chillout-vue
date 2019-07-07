export function toUpperInitial(value) {
  if (!value) return '';
  const val = value.toString();
  return val.charAt(0).toUpperCase() + val.slice(1);
}
