import React, { useState, useEffect } from "react";
import styles from "../styles/ListeningComprehension.module.css";
import AudioPlayer from "./AudioPlayer";
import QuestionList from "./QuestionList";

const ListeningComprehension = () => {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // 这里是加载数据的代码
    // 模拟从外部加载 JSON 数据
    const mockData = {
      questions: [
        {
          number: 1,
          options: {
            A: "The self-driving system was faulty.",
            B: "The car was moving at a fast speed.",
            C: "The man in the car was absent-minded.",
            D: "The test driver made a wrong judgment.",
          },
        },
        {
          number: 2,
          options: {
            A: "They have generally done quite well.",
            B: "They have caused several severe crashes.",
            C: "They have posed a threat to other drivers.",
            D: "They have done better than conventional cars.",
          },
        },
        {
          number: 3,
          options: {
            A: "He is a queen bee specialist.",
            B: "He works at a national park.",
            C: "He removed the bees from the boot.",
            D: "He drove the bees away from his car.",
          },
        },
        {
          number: 4,
          options: {
            A: "They were making a lot of noise.",
            B: "They were looking after the queen.",
            C: "They were dancing in a unique way.",
            D: "They were looking for a new box to live in.",
          },
        },
        {
          number: 5,
          options: {
            A: "The latest test on a rare animal species.",
            B: "The finding of two new species of frog.",
            C: "The second trip to a small remote island.",
            D: "The discovery of a new species of snake.",
          },
        },
        {
          number: 6,
          options: {
            A: "He fell from a tall palm tree by accident.",
            B: "A snake crawled onto his head in his sleep.",
            C: "He discovered a rare frog on a deserted island.",
            D: "A poisonous snake attacked him on his field trip.",
          },
        },
        {
          number: 7,
          options: {
            A: "From its origin.",
            B: "From its length.",
            C: "From its colour.",
            D: "From its genes.",
          },
        },
        {
          number: 8,
          options: {
            A: "The airport is a long way from the hotel.",
            B: "His flight is leaving in less than 2 hours.",
            C: "He has to check a lot of luggage.",
            D: "The security check takes time.",
          },
        },
        {
          number: 9,
          options: {
            A: "In cash.",
            B: "By credit card.",
            C: "With his smart phone.",
            D: "With a traveler's check.",
          },
        },
        {
          number: 10,
          options: {
            A: "Look after his luggage.",
            B: "Find a porter for him.",
            C: "Give him a receipt.",
            D: "Confirm his flight.",
          },
        },
        {
          number: 11,
          options: {
            A: "Posting a comment on the hotel's webpage.",
            B: "Staying in the same hotel next time he comes.",
            C: "Signing up for membership of Sheraton Hotel.",
            D: "Loading her luggage onto the airport shuttle.",
          },
        },
        {
          number: 12,
          options: {
            A: "He becomes tearful in wind.",
            B: "He is the only boy in his family.",
            C: "He is his teacher's favorite student.",
            D: "He has stopped making terrible faces.",
          },
        },
        {
          number: 13,
          options: {
            A: "Warn him of danger by making up a story.",
            B: "Give him some cherry stones to play with.",
            C: "Do something funny to amuse him.",
            D: "Tell him to play in her backyard.",
          },
        },
        {
          number: 14,
          options: {
            A: "They could knock people unconscious.",
            B: "They could fly against a strong wind.",
            C: "They could sometimes terrify adults.",
            D: "They could break people's legs.",
          },
        },
        {
          number: 15,
          options: {
            A: "One would have curly hair if they ate too much stale bread.",
            B: "One would go to prison if they put a stamp on upside down.",
            C: "One would have to shave their head to remove a bat in their hair.",
            D: "One would get a spot on their tongue if they told a lie deliberately.",
          },
        },
        {
          number: 16,
          options: {
            A: "Everything seemed to be changing.",
            B: "People were formal and disciplined.",
            C: "People were excited to go traveling overseas.",
            D: "Things from the Victorian era came back alive.",
          },
        },
        {
          number: 17,
          options: {
            A: "Watching TV at home.",
            B: "Meeting people.",
            C: "Drinking coffee.",
            D: "Trying new foods.",
          },
        },
        {
          number: 18,
          options: {
            A: "He was interested in stylish dresses.",
            B: "He was able to make a lot of money.",
            C: "He was a young student in the 1960s.",
            D: "He was a man full of imagination.",
          },
        },
        {
          number: 19,
          options: {
            A: "They avoid looking at them.",
            B: "They run away immediately.",
            C: "They show anger on their faces.",
            D: "They make threatening sounds.",
          },
        },
        {
          number: 20,
          options: {
            A: "It turns to its owner for help.",
            B: "It turns away to avoid conflict.",
            C: "It looks away and gets angry too.",
            D: "It focuses its eyes on their mouths.",
          },
        },
        {
          number: 21,
          options: {
            A: "By observing their facial features carefully.",
            B: "By focusing on a particular body movement.",
            C: "By taking in their facial expressions as a whole.",
            D: "By interpreting different emotions in different ways.",
          },
        },
        {
          number: 22,
          options: {
            A: "They have to look for food and shelter underground.",
            B: "They take little notice of the changes in temperature.",
            C: "They resort to different means to survive the bitter cold.",
            D: "They have difficulty adapting to the changed environment.",
          },
        },
        {
          number: 23,
          options: {
            A: "They have their weight reduced to the minimum.",
            B: "They consume energy stored before the long sleep.",
            C: "They can maintain their heart beat at the normal rate.",
            D: "They can keep their body temperature warm and stable.",
          },
        },
        {
          number: 24,
          options: {
            A: "By staying in hiding places and eating very little.",
            B: "By seeking food and shelter in people's houses.",
            C: "By growing thicker hair to stay warm.",
            D: "By storing enough food beforehand.",
          },
        },
        {
          number: 25,
          options: {
            A: "To stay safe.",
            B: "To save energy.",
            C: "To keep company.",
            D: "To protect the young.",
          },
        },
      ],
    };
    setQuestions(mockData.questions);

    // 初始化答案状态
    const initialAnswers = mockData.questions.reduce((acc, question) => {
      acc[`q${question.number}`] = "";
      return acc;
    }, {});
    setSelectedAnswer(initialAnswers);
  }, []);

  const handleOptionChange = (questionNumber, option) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [`q${questionNumber}`]: option,
    }));
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["listening-comprehension-container"]}>
      <h2>Part2 Listening Comprehension</h2>
      <section>
        <h3>Section A</h3>
        <p>
          Directions: In this section, you will hear three news reports. At the
          end of each news report, you will hear two or three questions. Both
          the news report and the questions will be spoken only once. After you
          hear a question, you must choose the best answer from the four choices
          marked A), B), C) and D). Then mark the corresponding letter on Answer
          Sheet 1 with a single line through the centre.
        </p>
      </section>
      
      <AudioPlayer src="path-to-your-audio-file" />
      <p>Questions 1 and 2 are based on the news report you have just heard.</p>
      <QuestionList
        questions={questions.slice(0,2)}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleOptionChange}
      />

    </div>
  );
};

export default ListeningComprehension;
