"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useScoreRecords } from "@/app/hooks/useScoreRecords";
import type { ScoreRecord } from "@/app/types/practice";

const getSectionScore = (
  attemptId: string,
  type: string,
  section: string
): number => {
  const scores = JSON.parse(
    localStorage.getItem(`${section}Scores`) || "[]"
  ) as ScoreRecord[];

  const record = scores.find(
    (s: ScoreRecord) => s.attemptId === attemptId && s.type === type
  );
  return record?.score || 0;
};

const calculateTotalScore = (attemptId: string, type: string): number => {
  const writingScore = getSectionScore(attemptId, type, "writing");
  const listeningScore = getSectionScore(attemptId, type, "listening");
  const readingScore = getSectionScore(attemptId, type, "reading");
  const translationScore = getSectionScore(attemptId, type, "translation");

  return writingScore + listeningScore + readingScore + translationScore;
};

export default function RecentProgress() {
  const { records } = useScoreRecords();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const dailyScores = records.reduce(
      (acc, record) => {
        const date = new Date(record.date).toLocaleDateString("zh-CN");
        const totalScore = calculateTotalScore(record.attemptId, record.type);

        if (acc[date]) {
          acc[date].scores.push(totalScore);
          if (totalScore > acc[date].max) {
            acc[date].max = totalScore;
          }
        } else {
          acc[date] = {
            max: totalScore,
            scores: [totalScore],
          };
        }
        return acc;
      },
      {} as Record<string, { max: number; scores: number[] }>
    );

    const recentDates = Object.keys(dailyScores)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-10);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: recentDates,
        datasets: [
          {
            label: "最高分",
            data: recentDates.map((date) => dailyScores[date].max),
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            borderWidth: 2,
            tension: 0.1,
            fill: false,
          },
          {
            label: "平均分",
            data: recentDates.map(
              (date) =>
                dailyScores[date].scores.reduce((a, b) => a + b, 0) /
                dailyScores[date].scores.length
            ),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderWidth: 2,
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 710,
            title: {
              display: true,
              text: "分数",
            },
          },
          x: {
            title: {
              display: true,
              text: "日期",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label;
                const value = context.parsed.y || 0;
                const date = recentDates[context.dataIndex];
                const scores = dailyScores[date].scores;

                if (label === "最高分") {
                  return `最高分: ${value.toFixed(1)}`;
                }
                return `平均分: ${value.toFixed(1)} (${scores.length}次练习)`;
              },
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
