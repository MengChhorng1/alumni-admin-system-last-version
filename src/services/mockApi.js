import { database } from "./mockData";

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginApi({ email, password }) {
  await wait();
  if (!email || !password) throw new Error("Email and password are required.");
  return {
    token: "mock-jwt-token",
    user: {
      id: 1,
      name: "Alumni Admin",
      email,
      role: "super_admin",
      permissions: ["*"],
    },
  };
}

export async function listResource(slug) {
  await wait();
  return database[slug] || [];
}

export async function createResource(slug, payload) {
  await wait();
  const current = database[slug] || [];
  const row = { id: current.length + 1, ...payload };
  database[slug] = [row, ...current];
  return row;
}

export async function updateResource(slug, id, payload) {
  await wait();
  database[slug] = (database[slug] || []).map((row) =>
    String(row.id) === String(id) ? { ...row, ...payload } : row,
  );
  return payload;
}

export async function deleteResource(slug, id) {
  await wait();
  database[slug] = (database[slug] || []).filter(
    (row) => String(row.id) !== String(id),
  );
  return true;
}

export async function deleteResources(slug, rowsToDelete) {
  await wait();
  const deleteKeys = new Set(rowsToDelete.map((row) => JSON.stringify(row)));
  const deleteIds = new Set(
    rowsToDelete
      .filter((row) => row.id !== undefined && row.id !== null)
      .map((row) => String(row.id)),
  );

  database[slug] = (database[slug] || []).filter((row) => {
    const hasComparableId =
      row.id !== undefined && row.id !== null && deleteIds.size > 0;
    if (hasComparableId && deleteIds.has(String(row.id))) return false;
    return !deleteKeys.has(JSON.stringify(row));
  });

  return true;
}
