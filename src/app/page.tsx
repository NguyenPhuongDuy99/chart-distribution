"use client";

import StackedBarChart from "@/components/BarChart";
import HighPieChart from "@/components/HighPieChart";
import TableChart from "@/components/TableChart";
import { Lock, LockOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { createPublicClient, http, parseAbiItem } from "viem";
import { arbitrum } from "viem/chains";

const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

console.log("publicClient", publicClient);

interface TransferLog {
  in: bigint;
  out: bigint;
  remaining: bigint;
}

interface TransferLogData {
  [address: string]: TransferLog;
}

interface PoolData {
  name: string;
  unlocked: number;
  locked: number;
}

interface PoolDataWithColor extends PoolData {
  color: string;
}

export default function Home() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [data, setData] = useState<PoolDataWithColor[]>([
    { name: "Founding Community", unlocked: 0, locked: 32, color: "#E210E3" },
    {
      name: "Core team",
      unlocked: 0,
      locked: 6,
      color: "#4AC8FF",
    },
    { name: "Airdrop Campaigns", unlocked: 0, locked: 6, color: "#A68DFF" },
    {
      name: "Community and Ecosystem",
      unlocked: 0,
      locked: 8,
      color: "#7543FF",
    },
    {
      name: "Operation Fund",
      unlocked: 0,
      locked: 10,
      color: "#1C2ED3",
    },
    {
      name: "Liquidity and Exchange Reserves",
      unlocked: 1,
      locked: 0,
      color: "#F087FF",
    },
    {
      name: "Foundation Reservers",
      unlocked: 0,
      locked: 35,
      color: "#adb4c1",
    },
    {
      name: "Strategic Partner",
      unlocked: 0,
      locked: 2,
      color: "#4646AF",
    },
  ]);

  const poolAddress = {
    "0x024bbbe12cf4fe894bfffea0647257aa1183597b": "Strategic Partner",
    "0xb457d6f060ccd8f6510c776e414f905ed34cb28a": "Foundation Reservers",
    "0x3eab71b2b7c42b17e0666cbe6a943ad35aa395ec": "Operation Fund",
    "0xbb6652a8f32a147c3b0a8d0dd3b89b83fa85fca5": "Airdrop Campaigns",
    "0x197f5d9110315544d057b1a463723363769bf01a": "Community and Ecosystem",
    "0x49fcd47a8caf052c80ffc4db9ea24a83ecc69ce5": "Core team",
  };
  const foundingCommunity = "0x8386b1cb4611a136d6bec5b815aff295c4cac999";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const vestingCommunityAddresses = await getVestingCommunityAddresses();
    const transferLogs = await getTransferLogs(
      Object.keys(poolAddress).concat(vestingCommunityAddresses as string[])
    );

    const poolData = await getPoolData(transferLogs);
    const poolDataWithColor = poolData.map((pool) => ({
      ...pool,
      color:
        pool.name === "Founding Community"
          ? "#E210E3"
          : pool.name === "Foundation Reservers"
          ? "#adb4c1"
          : pool.name === "Operation Fund"
          ? "#1C2ED3"
          : pool.name === "Airdrop Campaigns"
          ? "#A68DFF"
          : pool.name === "Community and Ecosystem"
          ? "#7543FF"
          : pool.name === "Core team"
          ? "#4AC8FF"
          : "#4646AF",
    }));

    setData(poolDataWithColor);
  };

  const getVestingCommunityAddresses = async () => {
    const redeemCreatedEvent = await publicClient.getLogs({
      address: foundingCommunity,
      event: parseAbiItem(
        "event RedeemInitialized(address redeem, address erc20, uint256 totalAmount, address[] beneficiaries, uint16[] allocations, uint64 durationSeconds, uint64 redeemRate)"
      ),
      args: {},
      fromBlock: BigInt(303167703),
    });
    return [
      foundingCommunity,
      ...redeemCreatedEvent.map((event) => event.args.redeem),
    ];
  };

  const getTransferLogs = async (
    addresses: string[]
  ): Promise<TransferLogData> => {
    const logs = await publicClient.getLogs({
      address: "0xb1c3960aeeaf4c255a877da04b06487bba698386",
      event: parseAbiItem(
        "event Transfer(address indexed from, address indexed to, uint256 value)"
      ),
      args: {},
      fromBlock: BigInt(303167703),
    });

    const addressesInOutLogs = Object.fromEntries(
      addresses.map((address) => [
        address,
        { in: BigInt(0), out: BigInt(0), remaining: BigInt(0) },
      ])
    );

    logs.forEach((log) => {
      if (
        log.args.to &&
        log.args.value &&
        addresses.includes(log.args.to.toLowerCase())
      ) {
        addressesInOutLogs[log.args.to.toLowerCase()].in =
          addressesInOutLogs[log.args.to.toLowerCase()].in +
          BigInt(log.args.value);
        addressesInOutLogs[log.args.to.toLowerCase()].remaining =
          addressesInOutLogs[log.args.to.toLowerCase()].remaining +
          BigInt(log.args.value);
      }
      if (
        log.args.from &&
        log.args.value &&
        addresses.includes(log.args.from.toLowerCase())
      ) {
        addressesInOutLogs[log.args.from.toLowerCase()].out =
          addressesInOutLogs[log.args.from.toLowerCase()].out +
          BigInt(log.args.value);
        addressesInOutLogs[log.args.from.toLowerCase()].remaining =
          addressesInOutLogs[log.args.from.toLowerCase()].remaining -
          BigInt(log.args.value);
      }
    });
    return addressesInOutLogs;
  };

  const getPoolData = async (transferLogs: TransferLogData) => {
    const totalRemaining = Object.values(transferLogs).reduce((acc, log) => {
      return acc + log.remaining;
    }, BigInt(0));
    const totalOut = Object.values(transferLogs).reduce((acc, log) => {
      return acc + log.out;
    }, BigInt(0));

    const poolData: PoolData[] = [];

    Object.entries(poolAddress).forEach(([address, name]) => {
      poolData.push({
        name: name,
        unlocked:
          totalOut > 0
            ? Number((transferLogs[address].out * BigInt(10000)) / totalOut) /
              100
            : 0,
        locked:
          totalRemaining > 0
            ? Number(
                (transferLogs[address].remaining * BigInt(10000)) /
                  totalRemaining
              ) / 100
            : 0,
      });
    });

    const addressLeft = Object.keys(transferLogs).filter(
      (address) => !Object.keys(poolAddress).includes(address)
    );

    const totalRemainingLeft = addressLeft.reduce((acc, address) => {
      return acc + transferLogs[address].remaining;
    }, BigInt(0));

    const totalOutLeft = addressLeft.reduce((acc, address) => {
      return acc + transferLogs[address].out;
    }, BigInt(0));

    poolData.push({
      name: "Founding Community",
      unlocked:
        totalOut > 0
          ? Number((totalOutLeft * BigInt(10000)) / totalOut) / 100
          : 0,
      locked:
        totalRemaining > 0
          ? Number((totalRemainingLeft * BigInt(10000)) / totalRemaining) / 100
          : 0,
    });
    return poolData;
  };

  return (
    <div className="px-2.5 text-white h-screen bg-[url(/img/background-img.webp)] bg-no-bg-no-repeat bg-cover bg-center">
      <div className="pt-[52px] max-w-[1200px] w-full mx-auto flex flex-col gap-5">
        <h2 className="text-center font-bold text-[35px] leading-[53px]">
          Sustainable Token Distribution
        </h2>

        <p className="font-normal text-[18px] leading-[29px]">
          BIC Tokens are distributed with long-term ecosystem stability in mind.
          The total supply of 5 billion tokens is thoughtfully allocated to key
          stakeholders, including early adopters, partners, and the Beincom
          community, ensuring steady growth and balanced token velocity.
        </p>

        <div className="flex items-center gap-2">
          <LockOpen className="shrink-0" />
          <StackedBarChart />
          <Lock className="shrink-0" />
        </div>
        <div className="flex justify-between">
          <TableChart data={data} setHoveredSegment={setHoveredSegment} />
          <HighPieChart data={data} hoveredSegment={hoveredSegment} />
        </div>
      </div>
    </div>
  );
}
