"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ScoreRecord } from "@/app/hooks/useScoreRecords";

type SectionName = "writing" | "listening" | "reading" | "translation";

const SECTION_MAX_SCORES = {
  writing: 106.5,
  listening: 248.5,
  reading: 248.5,
  translation: 106.5,
} as const;

const getSectionScore = (
  attemptId: string,
  type: string,
  section: string
): number => {
  const scores = JSON.parse(
    localStorage.getItem(`${section}Scores`) || "[]"
  ) as ScoreRecord[];
  const record = scores.find(
    (s) => s.attemptId === attemptId && s.type === type
  );
  return record?.score || 0;
};

export default function SubjectScoreDistribution() {
  const { records } = useScoreRecords();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !records.length) return;

    const subjectScores = records.reduce(
      (acc, record) => {
        const writingScore = getSectionScore(
          record.attemptId,
          record.type,
          "writing"
        );
        const listeningScore = getSectionScore(
          record.attemptId,
          record.type,
          "listening"
        );
        const readingScore = getSectionScore(
          record.attemptId,
          record.type,
          "reading"
        );
        const translationScore = getSectionScore(
          record.attemptId,
          record.type,
          "translation"
        );

        if (writingScore) acc.writing.push(writingScore);
        if (listeningScore) acc.listening.push(listeningScore);
        if (readingScore) acc.reading.push(readingScore);
        if (translationScore) acc.translation.push(translationScore);

        return acc;
      },
      {
        writing: [] as number[],
        listening: [] as number[],
        reading: [] as number[],
        translation: [] as number[],
      }
    );

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
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 250,
            ticks: {
              stepSize: 50,
              display: false,
              maxTicksLimit: 5,
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              circular: true,
            },
            pointLabels: {
              font: {
                size: 14,
              },
              padding: 20,
            },
            angleLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const sections: SectionName[] = [
                  "writing",
                  "listening",
                  "reading",
                  "translation",
                ];
                const sectionName = sections[context.dataIndex];
                const maxScore = SECTION_MAX_SCORES[sectionName];
                return `${context.dataset.label}: ${context.formattedValue}/${maxScore}分`;
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

  return (
    <div className="w-full h-[400px]">
      <canvas ref={chartRef} />
    </div>
  );
}
