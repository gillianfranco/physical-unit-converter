import database from "../../../../infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [process.env.POSTGRES_DB]
  });
  const openedConnections = openedConnectionsResult.rows[0].count;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  response.status(200).json([{
    updated_at: updatedAt,
    dependencies: {
      database: {
        opened_connections: openedConnections,
        max_connections: maxConnections,
        version: databaseVersion
      }
    }
  }]);
}
