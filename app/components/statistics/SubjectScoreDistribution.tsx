"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useScoreRecords } from "@/app/hooks/useScoreRecords";
import type { ScoreRecord } from "@/app/types/practice";

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

const getPercentageScore = (score: number, section: SectionName): number => {
  return (score / SECTION_MAX_SCORES[section]) * 100;
};

const getAverage = (scores: number[]): number => {
  return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
};

const getMax = (scores: number[]): number => {
  return scores.length ? Math.max(...scores) : 0;
};

const getAveragePercentage = (
  scores: number[],
  section: SectionName
): number => {
  const average = getAverage(scores);
  return getPercentageScore(average, section);
};

const getMaxPercentage = (scores: number[], section: SectionName): number => {
  const max = getMax(scores);
  return getPercentageScore(max, section);
};

const getLatest = (
  scores: number[],
  records: ScoreRecord[],
  section: SectionName
): number => {
  if (!scores.length || !records.length) return 0;
  const latestRecord = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  const score = getSectionScore(
    latestRecord.attemptId,
    latestRecord.type,
    section
  );
  return score;
};

const getLatestPercentage = (
  scores: number[],
  records: ScoreRecord[],
  section: SectionName
): number => {
  const latest = getLatest(scores, records, section);
  return getPercentageScore(latest, section);
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
              getAveragePercentage(subjectScores.writing, "writing"),
              getAveragePercentage(subjectScores.listening, "listening"),
              getAveragePercentage(subjectScores.reading, "reading"),
              getAveragePercentage(subjectScores.translation, "translation"),
            ],
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "最高分",
            data: [
              getMaxPercentage(subjectScores.writing, "writing"),
              getMaxPercentage(subjectScores.listening, "listening"),
              getMaxPercentage(subjectScores.reading, "reading"),
              getMaxPercentage(subjectScores.translation, "translation"),
            ],
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            borderColor: "rgb(34, 197, 94)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "最近得分",
            data: [
              getLatestPercentage(subjectScores.writing, records, "writing"),
              getLatestPercentage(
                subjectScores.listening,
                records,
                "listening"
              ),
              getLatestPercentage(subjectScores.reading, records, "reading"),
              getLatestPercentage(
                subjectScores.translation,
                records,
                "translation"
              ),
            ],
            backgroundColor: "rgba(249, 115, 22, 0.2)",
            borderColor: "rgb(249, 115, 22)",
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
            max: 100,
            ticks: {
              stepSize: 20,
              display: false,
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
                const actualScore =
                  (parseFloat(context.formattedValue) * maxScore) / 100;
                return `${context.dataset.label}: ${actualScore.toFixed(1)}/${maxScore}分 (${parseFloat(context.formattedValue).toFixed(1)}%)`;
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
    <div className="h-[400px] w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
