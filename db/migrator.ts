import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql2 from "mysql2/promise";

//const dburi = "mysql://MALuser:MALpassword@localhost:3306/maldev2";

const doMigrate = async () => {
  const dburi = process.env.DATABASE_URL;
  console.log("db:", dburi);

  try {
    const dbConnection = await mysql2.createConnection({
      uri: dburi,
    });

    const dbMigrator = drizzle(dbConnection);

    await migrate(dbMigrator, {
      migrationsFolder: "./db/migrations",
    });
    console.log("migration done");
    process.exit(0);
  } catch (e) {
    console.log("migration error", e);
    process.exit(0);
  }
};

doMigrate();
