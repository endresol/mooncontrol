import { db } from "../db";
import { stakingUsers, stakingHoldings } from "../db/schema";
import { snapshotWallet } from "../lib/staking";

async function updateStakingSnapshot() {
  // Get unique addresses from stakingUsers table
  const uniqueAddresses = await db
    .select({ address: stakingUsers.address })
    .from(stakingUsers)
    .groupBy(stakingUsers.address);

  console.log(`Found ${uniqueAddresses.length} unique staking addresses`);

  // Process each address
  for (const { address } of uniqueAddresses) {
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
