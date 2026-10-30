export function isPageComponentEnabled(value: string | undefined) {
  console.log("val:", value);
  if (value === undefined || value.trim() === "") return true
  return value.trim().toLowerCase() === "true"
}
