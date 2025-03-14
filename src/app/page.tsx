"use client";

import StackedBarChart from "@/components/BarChart";
import HighPieChart from "@/components/HighPieChart";
import TableChart from "@/components/TableChart";
import { Lock, LockOpen } from "lucide-react";

export default function Home() {
  const data = [
    { name: "Strategic Partner", unlocked: 25, locked: 15, color: "#E210E3" },
    {
      name: "Core team",
      unlocked: 2.5,
      locked: 17.5,
      color: "#4AC8FF",
    },
    { name: "Founding Community", unlocked: 4, locked: 11, color: "#A68DFF" },
    { name: "Airdrop Campaigns", unlocked: 15, locked: 0, color: "#7543FF" },
    {
      name: "Community and Ecosystem",
      unlocked: 10,
      locked: 0,
      color: "#1C2ED3",
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
          <TableChart data={data} />
          <HighPieChart data={data} />
        </div>
      </div>
    </div>
  );
}
