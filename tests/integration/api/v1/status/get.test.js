test("GET to api/v1/status endpoint should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toEqual(true);

  const parsedUpdatedAt = new Date(responseBody[0].updated_at).toISOString();
  expect(responseBody[0].updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody[0].dependencies.database.opened_connections).toEqual(1);

  expect(responseBody[0].dependencies.database.max_connections).toEqual(100);

  expect(responseBody[0].dependencies.database.version).toEqual("18.1");

  console.log(responseBody);
});
