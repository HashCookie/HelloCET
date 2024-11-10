"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RecentProgress() {
  const { records } = useScoreRecords();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const recentRecords = [...records]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: recentRecords.map((record) =>
          new Date(record.date).toLocaleDateString("zh-CN")
        ),
        datasets: [
          {
            label: "总分",
            data: recentRecords.map((record) => record.score),
            borderColor: "rgb(59, 130, 246)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [records]);

  return <canvas ref={chartRef} />;
}
