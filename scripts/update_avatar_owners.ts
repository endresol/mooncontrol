import mysql from "mysql2/promise";
import Web3 from "web3";

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

const provider = process.env.NEXT_PUBLIC_NETWORK_RPC as string;
const maladdress = process.env
  .NEXT_PUBLIC_MOON_APE_LAB_GENESIS_CONTRACT as string;
const abi = require("../abis/MALgenesis-ABI.json");

async function getApeOwner(contract: Web3.Contract, apeId: number) {
  const owner = await contract.methods.ownerOf(apeId).call();
  console.log("owner", owner);

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM nfts_apenft WHERE nft_id = ?",
      [apeId]
    );

    if (rows.length > 0 && rows[0].owner !== owner) {
      await pool.execute("UPDATE nfts_apenft SET owner = ? WHERE nft_id = ?", [
        owner,
        apeId,
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  try {
    const w3 = new Web3(provider as Web3.Provider);
    const contract = new w3.eth.Contract(abi, maladdress) as Web3.Contract;

    const totalSupply = await contract.methods.totalSupply().call();

    console.log("totalSupply", totalSupply);

    const t1 = Date.now();

    for (let i = 1; i <= totalSupply; i++) {
      await getApeOwner(contract, i);
    }

    const t2 = Date.now();

    const timeMsg = `[live] Updated APE owners in ${Math.round(
      (t2 - t1) / 1000
    )} seconds`;

    console.log(timeMsg);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
