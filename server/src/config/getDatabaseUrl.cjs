const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/sea-to-see_development",
      test: "postgres://postgres:postgres@localhost:5432/sea-to-see_test",
      e2e: "postgres://postgres:postgres@localhost:5432/sea-to-see_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
