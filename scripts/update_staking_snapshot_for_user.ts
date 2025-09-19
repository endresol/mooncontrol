import { db } from "../db";
import { stakingUsers, stakingHoldings } from "../db/schema";
import { snapshotWallet } from "../lib/staking";

async function updateStakingSnapshot() {
  // Get unique addresses from stakingUsers table

  const address = process.argv[2];

  if (!address) {
    console.error("Please provide valid staking address");
    process.exit(1);
  }

  try {
    // Call your snapshot wallet function here
    // Example: await snapshotWallet(address);
    const makeSnapshot = await snapshotWallet(address);

    const insertSnapshot = await db.insert(stakingHoldings).values(
      makeSnapshot.map((snapshot) => ({
        ...snapshot,
        tokenId: snapshot.tokenId.toString(),
      }))
    );
    console.log(`Processing address: ${address}`);

    // Add your snapshot wallet logic here
  } catch (error) {
    console.error(`Error processing address ${address}:`, error);
  }
}

// Execute the script
updateStakingSnapshot()
  .then(() => {
    console.log("Staking snapshot update completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
