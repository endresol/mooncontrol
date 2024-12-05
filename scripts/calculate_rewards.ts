import { db } from "../db";
import { stakingHoldings } from "../db/schema/stakingHoldings";
import { stakingRewards } from "../db/schema/stakingRewards";
import { eq, and, between } from "drizzle-orm";

interface RewardCalculation {
  token_id: string;
  contract: string;
  days: number;
  reward: number;
}

interface RewardSummary {
  contract: string;
  totalReward: number;
  totalDays: number;
  count: number;
}

function summarizeRewards(rewards: RewardCalculation[]): RewardSummary[] {
  const summary = rewards.reduce(
    (acc: { [key: string]: RewardSummary }, curr) => {
      if (!acc[curr.contract]) {
        acc[curr.contract] = {
          contract: curr.contract,
          totalReward: 0,
          totalDays: 0,
          count: 0,
        };
      }

      acc[curr.contract].totalReward += curr.reward;
      acc[curr.contract].totalDays += curr.days;
      acc[curr.contract].count += 1;

      return acc;
    },
    {}
  );

  return Object.values(summary);
}

function getReward(address: string) {
  if (address === process.env.NEXT_PUBLIC_AVATAR_CONTRACT) {
    return 60;
  } else if (address === process.env.NEXT_PUBLIC_GENESIS_CONTRACT) {
    return 45;
  } else {
    return 10;
  }
}

function addCombinationEntriesWithRules(
  entries: RewardCalculation[],
  allowedPairs: string[][],
  days: number,
  reward: number
): RewardCalculation[] {
  const result: RewardCalculation[] = [...entries]; // Start with the existing entries
  const seen = new Map<string, Set<string>>(); // To track contracts per token_id

  // Populate the map with token_id and associated contracts
  entries.forEach((entry) => {
    if (!seen.has(entry.token_id)) {
      seen.set(entry.token_id, new Set());
    }
    seen.get(entry.token_id)?.add(entry.contract);
  });

  // Check for token_id with allowed pairs of contracts and add combinations
  seen.forEach((contracts, token_id) => {
    const contractArray = Array.from(contracts);

    // Check each pair of contracts
    for (let i = 0; i < contractArray.length; i++) {
      for (let j = i + 1; j < contractArray.length; j++) {
        const pair = [contractArray[i], contractArray[j]];
        const reversedPair = [contractArray[j], contractArray[i]];

        // If the pair (or its reverse) is in allowedPairs, add a combination
        if (
          allowedPairs.some(
            (allowed) =>
              JSON.stringify(allowed) === JSON.stringify(pair) ||
              JSON.stringify(allowed) === JSON.stringify(reversedPair)
          )
        ) {
          const combinedContract = pair.join("+");
          const daysreward =
            entries.find((entry) => entry.token_id === token_id)?.days ?? 0;

          result.push({
            token_id,
            contract: combinedContract,
            days: daysreward,
            reward: daysreward * reward,
          });
        }
      }
    }
  });

  return result;
}

const calculateRewardsForUser = async (
  address: string,
  from: string,
  to: string
) => {
  // Get holdings for specific user in both months
  const fromHoldings = await db
    .select()
    .from(stakingHoldings)
    .where(
      and(
        eq(stakingHoldings.holdingMonth, from),
        eq(stakingHoldings.address, address)
      )
    );

  const toHoldings = await db
    .select()
    .from(stakingHoldings)
    .where(
      and(
        eq(stakingHoldings.holdingMonth, to),
        eq(stakingHoldings.address, address)
      )
    );

  const rewards: RewardCalculation[] = [];

  // Find matching token_id + contract combinations
  fromHoldings.forEach((fromHolding) => {
    const matchingToHolding = toHoldings.find(
      (toHolding) =>
        toHolding.tokenId === fromHolding.tokenId &&
        toHolding.contract === fromHolding.contract
    );

    if (matchingToHolding) {
      // Calculate months held
      const timeHeld =
        matchingToHolding.snapshotDate.getTime() -
        fromHolding.snapshotDate.getTime();

      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const daysBetween = timeHeld / millisecondsPerDay;

      const daysHeld = Math.floor(daysBetween);

      // Calculate reward (you can adjust the reward formula)
      const baseReward = getReward(matchingToHolding.contract); // Base reward per month
      const reward = baseReward * daysHeld;

      rewards.push({
        token_id: fromHolding.tokenId,
        contract: fromHolding.contract,
        days: daysHeld,
        reward: reward,
      });
    }
  });

  // Add combinations with rules
  const allowedPairs = [
    [
      process.env.NEXT_PUBLIC_AVATAR_CONTRACT || "",
      process.env.NEXT_PUBLIC_GENESIS_CONTRACT || "",
    ],
  ];
  const combinedRewards = addCombinationEntriesWithRules(
    rewards,
    allowedPairs,
    0,
    50
  );

  return combinedRewards;
};

const insertRewardSummary = async (
  address: string,
  rewardsSummary: RewardSummary[],
  fromMonth: string,
  toMonth: string
) => {
  // Set expiry date to 4 weeks from now
  const claimExpiry = new Date();
  claimExpiry.setDate(claimExpiry.getDate() + 28);

  // Map contract rewards to the correct fields
  let contractAReward = 0;
  let contractBReward = 0;
  let contractCReward = 0;
  let sameIdBonus = 0;
  let totalReward = 0;

  rewardsSummary.forEach((summary) => {
    if (summary.contract === process.env.NEXT_PUBLIC_AVATAR_CONTRACT) {
      contractAReward = summary.totalReward;
    } else if (summary.contract === process.env.NEXT_PUBLIC_GENESIS_CONTRACT) {
      contractBReward = summary.totalReward;
    } else if (summary.contract === process.env.NEXT_PUBLIC_MUTANT_CONTRACT) {
      contractCReward = summary.totalReward;
    } else if (summary.contract.includes("+")) {
      sameIdBonus = summary.totalReward;
    }
    totalReward += summary.totalReward;
  });

  await db.insert(stakingRewards).values({
    address: address,
    holdingMonth: toMonth,
    contractAReward: contractAReward,
    contractBReward: contractBReward,
    contractCReward: contractCReward,
    sameIdBonus: sameIdBonus,
    totalReward: totalReward,
    claimStatus: "unclaimed",
    claimExpiry: claimExpiry,
  });
};

const main = async () => {
  const fromMonth = process.argv[2];
  const toMonth = process.argv[3];

  if (!fromMonth || !toMonth) {
    console.error("Please provide valid from and to months as arguments");
    process.exit(1);
  }

  // Get unique addresses from staking_holdings
  const uniqueUsers = await db
    .select({ address: stakingHoldings.address })
    .from(stakingHoldings)
    .groupBy(stakingHoldings.address);

  // Process rewards for each user
  for (const user of uniqueUsers) {
    console.log(`Calculating rewards for user: ${user.address}`);
    const userRewards = await calculateRewardsForUser(
      user.address,
      fromMonth,
      toMonth
    );
    const rewardsSummary = summarizeRewards(userRewards);
    console.log(`Rewards for ${user.address}:`, userRewards);
    console.log("Rewards Summary:", rewardsSummary);

    // Insert rewards into the rewards table
    await insertRewardSummary(user.address, rewardsSummary, fromMonth, toMonth);
  }

  process.exit(0);
};

main().catch((error) => {
  console.error("Error calculating rewards:", error);
  process.exit(1);
});
