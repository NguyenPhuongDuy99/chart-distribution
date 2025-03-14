"use client";

import StackedBarChart from "@/components/BarChart";
import HighPieChart from "@/components/HighPieChart";
import TableChart from "@/components/TableChart";
import { Lock, LockOpen } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const data = [
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
  ];

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
