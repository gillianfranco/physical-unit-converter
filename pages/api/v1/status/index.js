import database from "../../../../infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1",
    values: [process.env.POSTGRES_DB]
  });
  const openedConnections = openedConnectionsResult.rows[0].count;

  response.status(200).json([{
    updated_at: updatedAt,
    dependencies: {
      database: {
        opened_connections: openedConnections
      }
    }
  }]);
}
