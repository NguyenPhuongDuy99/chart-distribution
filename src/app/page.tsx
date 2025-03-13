"use client";

import StackedBarChart from "@/components/BarChart";
import HighPieChart from "@/components/HighPieChart";
import { Lock, LockOpen } from "lucide-react";

export default function Home() {
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
        <HighPieChart />
      </div>
    </div>
  );
}
