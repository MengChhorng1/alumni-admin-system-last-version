import { resources } from "../constants/resources";

const today = new Date().toISOString();
const sampleValue = (field, index) => {
  if (field === "id") return index + 1;
  if (field.includes("email")) return `user${index + 1}@alumni.local`;
  if (field.includes("avatar"))
    return `https://i.pravatar.cc/120?img=${index + 8}`;
  if (field.includes("amount")) return (index + 1) * 250;
  if (field.includes("count")) return (index + 1) * 8;
  if (field.includes("status"))
    return ["active", "pending", "blocked", "completed"][index % 4];
  if (field.startsWith("is_")) return index % 2 === 0;
  if (
    field.includes("date") ||
    field.includes("_at") ||
    field.includes("birthday")
  )
    return today;
  if (
    field.includes("description") ||
    field.includes("reason") ||
    field.includes("message")
  )
    return "Clean mock data ready to connect with your backend API.";
  if (field.includes("name")) return `Sample ${index + 1}`;
  if (field.includes("location")) return "Phnom Penh";
  if (field.includes("currency")) return "USD";
  if (field.includes("link")) return "https://example.com";
  return `${field.replaceAll("_", " ")} ${index + 1}`;
};

export const database = Object.fromEntries(
  resources.map((resource) => [
    resource.slug,
    Array.from({ length: 18 }, (_, index) =>
      Object.fromEntries(
        resource.fields.map((field) => [field, sampleValue(field, index)]),
      ),
    ),
  ]),
);
