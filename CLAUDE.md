# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Dev server at localhost:3000
npm run build            # Production build
npm run lint             # ESLint
npm run db:generate      # Generate Drizzle migration from schema changes
npm run db:up            # Apply migrations locally
npm run db:deploy        # Deploy migrations via migrator script
npm run script:owner     # Sync avatar NFT owners from blockchain
npm run script:genesis   # Sync genesis NFT owners from blockchain
npm run script:staking   # Update staking snapshot for all users
npm run script:reward    # Calculate rewards for all users
```

No test framework is configured. There are no tests.

## Architecture

**Stack**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3, MySQL via Drizzle ORM, wagmi/viem/RainbowKit for Web3, NextAuth + SIWE for auth.

**Provider nesting** (`app/providers.tsx`): QueryClientProvider > SessionProvider > WagmiProvider > RainbowKitSiweNextAuthProvider > RainbowKitProvider. The wagmi config is defined inline here (no separate config file).

**Auth flow**: Wallet connect via RainbowKit → SIWE message signed → verified server-side in `app/api/auth/[...nextauth]/options.ts` using `new SiweMessage()` from the `siwe` package → JWT session with `{ id: address, role: 'user'|'admin' }`. The SIWE message arrives as a plain EIP-4361 string (not JSON) from `rainbowkit-siwe-next-auth@0.5.0`.

**Database**: Drizzle ORM with MySQL. Schema in `db/schema/`, client singleton in `db/index.ts`. Config uses `defineConfig({ dialect: "mysql" })` in `drizzle.config.ts`.

**Server actions**: Files with `"use server"` directive (`lib/staking.ts`, `app/staking/server_actions.ts`). All exported functions must be async. Return `{ success: boolean, error?: string }`. Consumed via `useActionState` (React 19) in client components.

**Contract ABIs**: `abis/avatar.ts`, `abis/genesis.ts`, `abis/mutant.ts`. Used with viem's `getContract()` or `readContract()`.

**Scripts**: `scripts/` directory, run via `ts-node` with `dotenv -e .env.local`. They sync blockchain state to the database.

## Key Gotchas

- `lib/staking.ts` has `"use server"` — every exported function MUST be async. Pure utility functions belong in `lib/utils.ts`, not here.
- Next.js 15 route handler params are `Promise<>` — must `await params` before accessing properties.
- `rainbowkit-siwe-next-auth@0.5.0` sends a plain EIP-4361 string, not JSON. Do NOT `JSON.parse()` the message in authorize. `new SiweMessage(plainString)` handles it.
- Next.js image optimizer cache causes disappearing images in dev. Config sets `unoptimized: true` in dev mode.
- Git has `core.fileMode false` to ignore macOS permission noise on `/Volumes/DATA`. Do not change this.
- `stakingHoldings` has a unique index on `(address, contract, tokenId, holdingMonth)`. Scripts use `onDuplicateKeyUpdate` to handle conflicts.
- `lib/resources.ts` exports `Resource` (includes `fileUrl`) and `ResourceInfo` (excludes `fileUrl`). Only send `ResourceInfo` to clients.
- Package manager is yarn (`yarn@1.22.22` in packageManager field) but `npm run` scripts work fine.

## Environment Variables

Required: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_NETWORK_RPC`, `NEXT_PUBLIC_AVATAR_CONTRACT`, `NEXT_PUBLIC_GENESIS_CONTRACT`, `NEXT_PUBLIC_MUTANT_CONTRACT`, `ADMIN_WALLET_ADDRESS`, `AVATAR_BLENDER_FOLDER`.

Optional: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (has hardcoded fallback).
