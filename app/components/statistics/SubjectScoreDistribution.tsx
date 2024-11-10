"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SubjectScoreDistribution() {
  const { records } = useScoreRecords();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const subjectScores = {
      writing: [] as number[],
      listening: [] as number[],
      reading: [] as number[],
      translation: [] as number[],
    };

    records.forEach((record) => {
      const type = record.type.toLowerCase();
      if (type.includes("writing")) subjectScores.writing.push(record.score);
      if (type.includes("listening"))
        subjectScores.listening.push(record.score);
      if (type.includes("reading")) subjectScores.reading.push(record.score);
      if (type.includes("translation"))
        subjectScores.translation.push(record.score);
    });

    const getAverage = (scores: number[]) =>
      scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "radar",
      data: {
        labels: ["写作", "听力", "阅读", "翻译"],
        datasets: [
          {
            label: "平均分",
            data: [
              getAverage(subjectScores.writing),
              getAverage(subjectScores.listening),
              getAverage(subjectScores.reading),
              getAverage(subjectScores.translation),
            ],
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 15,
            ticks: {
              stepSize: 3,
            },
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
