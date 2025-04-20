"use client";

import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { compareAsc, format } from "date-fns";

const DashboardView = ({ insights }) => {
  const salaryRanges = insights?.salaryRanges?.map((salary) => ({
    role: salary.role,
    min: salary.min,
    max: salary.max,
    median: salary.median,
    location: salary.location,
  }));
  
  const parts = insights.industry.split("-");
  const title = parts.slice(1).join(" ");
  const topSkills = insights?.topSkills;
    const keyTrends =insights?.keyTrends
  
    const recommendedSkills = insights?.recommendedSkills
  const getGradient = (index, isKeyTrend) => {
    const gradients = [
      ["from-gray-800 to-gray-750", "bg-gray-800"], // Blue theme
      ["from-gray-700 to-gray-650", "bg-gray-800"], // Blue theme
      ["from-gray-600 to-gray-550", "bg-gray-800"], // Blue theme
      ["from-gray-500 to-gray-450", "bg-gray-800"], // Blue theme
      ["from-gray-400 to-gray-350", "bg-gray-800"], // Blue theme
      
    ];
    
    // Use a different set of gradients for recommendations
    if (!isKeyTrend) {
      return gradients[(index + 2) % gradients.length];
    }
    
    return gradients[index % gradients.length];
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Section */}
      <section className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-gray-300 transition-all">
          {title}
        </h1>
      </section>

      {/* Last Updated Badge */}
      <section className="flex justify-center mb-8">
        <div className="rounded-lg bg-gradient-to-b from-gray-800 to-gray-200 px-3 py-1 text-white text-sm">
          Last Updated: {format(insights.lastUpdated, "yyyy-MM-dd")}
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-gray-350 rounded-xl shadow-xl mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6 lg:p-8">
          {/* Growth Rate Card */}
          <div className="border border-gray-700 bg-gray-900 hover:bg-gray-800 transition-all p-4 rounded-xl flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
              {insights.growthRate}%
            </h2>
            <p className="text-lg font-medium text-gray-500 mt-2">Growth Rate</p>
          </div>

          {/* Demand Level Card */}
          <div className="border border-gray-700 bg-gray-900 hover:bg-gray-800 transition-all p-4 rounded-xl flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
              {insights.demandLevel}
            </h2>
            <p className="text-lg font-medium text-gray-500 mt-2">Demand Level</p>
          </div>

          {/* Market Outlook Card */}
          <div className="border border-gray-700 bg-gray-900 hover:bg-gray-800 transition-all p-4 rounded-xl flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
              {insights.marketOutlook}
            </h2>
            <p className="text-lg font-medium text-gray-500 mt-2">Market Outlook</p>
          </div>

          {/* Top Skills Card */}
          <div className="border border-gray-700 bg-gray-900 hover:bg-gray-800 transition-all p-4 rounded-xl">
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {topSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="text-xs rounded-full bg-gradient-to-r from-gray-400 to-gray-750 px-3 py-1 font-medium text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-lg font-medium text-gray-500 text-center mt-2">Top Skills</p>
          </div>
        </div>
      </section>

      {/* Salary Ranges Section */}
      {salaryRanges && salaryRanges.length > 0 && (
        <section className="bg-gray-350 rounded-xl shadow-xl p-4 md:p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Salary Ranges</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {salaryRanges.map((salary, index) => (
              <div key={index} className="border border-gray-700 bg-gray-900 p-4 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-300 mb-2">{salary.role}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Min</p>
                    <p className="text-lg font-medium text-gray-300">${salary.min.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Max</p>
                    <p className="text-lg font-medium text-gray-300">${salary.max.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Median</p>
                    <p className="text-lg font-medium text-gray-300">${salary.median.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-medium text-gray-300">{salary.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Responsive Chart Section */}
      <section className="bg-gray-350 rounded-xl shadow-xl p-6 lg:p-8 mb-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Key Trends Column */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Key Industry Trends</h2>
          <div className="flex-1 flex flex-col gap-4">
            {keyTrends.map((trend, index) => {
              const [gradientClass, bgClass] = getGradient(index, true);
              const size = 100 - index * 5; // Decreasing size for visual hierarchy
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center ${bgClass} border border-gray-700 rounded-full p-1 mr-4`}>
                    <div 
                      className={`rounded-full bg-gradient-to-r ${gradientClass} h-12 w-12 flex items-center justify-center text-lg font-bold text-white`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div 
                      className={`h-14 rounded-lg bg-gradient-to-r ${gradientClass} flex items-center px-6`} 
                      style={{width: `${size}%`}}
                    >
                      <span className="text-white font-semibold text-lg truncate">{trend}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Skills Column */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Recommended Skills</h2>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {recommendedSkills.map((skill, index) => {
              const [gradientClass] = getGradient(index, false);
              
              return (
                <div 
                  key={index} 
                  className={`bg-gradient-to-r ${gradientClass} rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105`}
                >
                  <div className="bg-white/20 rounded-full p-3 mb-3">
                    {/* This is where you could add an icon based on the skill */}
                    <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
                      <span className="font-bold text-white">{index + 1}</span>
                    </div>
                  </div>
                  <span className="text-white font-semibold text-center">{skill}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default DashboardView; 