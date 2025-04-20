import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./_components/DashboardView";

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getUserOnBoardingStatus();
  if (!isOnboarded) redirect("/onboarding");
  let loading = false;

  try {
    loading = true;
    const insights = await getIndustryInsights();
  } catch (error) {
    console.log(error);
  } finally {
    loading = false;
  }

  const insights = await getIndustryInsights();
  return (
    <div>
      {loading ? (
        <div className="mt-20 text-4xl">Loading Industry Insights...</div>
      ) : (
        <div className="mx-auto">
          <DashboardView insights={insights} />
        </div>
      )}
    </div>
  );
};

export default IndustryInsightsPage;
