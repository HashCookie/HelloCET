import React from "react";
import styles from "../../styles/ReadingComprehension.module.css";

const ReadingComprehension = () => {
  // 假设文章文本和问题已经定义在某处
  const passageA = [
    "Trust is fundamental to life. If you can’t trust anything, life becomes intolerable. You can’t have relationships without trust, let alone good ones.",
    'In the workplace, too, trust is 26 . An organization without trust will be full of fear and 27 . If you work for a boss who doesn’t trust their employees to do things right, you’ll have a 28 time. They’ll be checking up on you all the time, correcting "mistakes" and 29 reminding you to do this or that.',
    "Organizations are always trying to cut costs. Think of all the additional tasks caused by lack of trust. Audit (审计) departments only exist because of it. Companies keep large volumes of 31 because they don't trust their suppliers, their contractors or their customers. Probably more than half of all administrative work is only there because of an ever-existing sense that “you can't trust anyone these days.” If even a small part of such valueless work could be 32, the savings would run into millions of dollars.",
  ];
  const options = {
    A: "constantly",
    B: "credible",
    C: "essential",
    D: "exploring",
    E: "gather",
    F: "load",
    G: "miserable",
    H: "pressure",
    I: "properly",
    J: "records",
    K: "removed",
    L: "stacks",
    M: "suspicion",
    N: "tracked",
    O: "watching",
  };
  const questionsA = [
    // 每个问题是一个对象，包含问题编号和选项
    {
      number: 26,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 27,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 28,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 29,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 30,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 31,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 32,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 33,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 34,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
    {
      number: 35,
      options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
    },
  ];

  const passageB = {
    A: "This is the land of opportunity. If that weren't already imp lied by the landscape—rolling green hills, palm trees, sun-kissed flowers—then it's evident in the many stories of people who grew up poor in these sleepy neighborhoods and rose to enormous success. People like Tri Tran, who fled Vietnam on a boat in 1986, showed up in San Jose with nothing, made it to MIT, and then founded the food-delivery start-up Munchery, which is valued at $300 million.",
    B: "Indeed, data suggests that this is one of the best places to grow up poor in America. A child born in the early 1980s into a low-income family in San Jose had a 12.9 percent chance of becoming a high earner as an adult, according to a landmark study released in 2014 by the economist Raj Chetty and his colleagues from Harvard and Berkeley. That number—12.9 percent—may not seem remarkable, but it was: Kids in San Jose whose families fell in the bottom quintile (五分位数) of income nationally had the best shot in the country at reaching the top quintile.",
    C: "By contrast, just 4.4 percent of poor kids in Charlotte moved up to the top; in Detroit the figure was 5.5 percent. San Jose had social mobility comparable to Denmark's and Canada's and higher than other progressive cities such as Boston and Minneapolis.",
    D: "The reasons kids in San Jose performed so well might seem obvious. Some of the world's most innovative companies are located here, providing opportunities such as the one seized by a 12-year-old Mountain View resident named Steve Jobs when he called William Hewlett to ask for spare parts and subsequently received a summer job. This is a city of immigrants—38 percent of the city's population today is foreign-born—and immigrants and their children have historically experienced significant upward mobility in America. The city has long had a large foreign-born population (26.5 percent in 1990), leading to broader diversity, which, the Harvard and Berkeley economists say, is a good predictor of mobility.",
    E: "Indeed, the streets of San Jose seem, in some ways, to embody the best of America. It's possible to drive in a matter of minutes from sleek (光亮的) office towers near the airport where people pitch ideas to investors, to single-family homes with orange trees in their yards, or to a Vietnamese mall. The libraries here offer programs in 17 languages, and there are areas filled with small businesses owned by Vietnamese immigrants, Mexican immigrants, Korean immigrants, and Filipino immigrants, to name a few.",
    F: "But researchers aren't sure exactly why poor kids in San Jose did so well. The city has a low prevalence of children growing up in single-parent families, and a low level of concentrated poverty, both factors that usually mean a city allows for good intergenerational mobility. But San Jose also performs poorly on some of the measures correlated with good mobility. It is one of the most unequal places out of the 741 that the researchers measured, and it has high degrees of racial and economic segregation (隔离). Its schools underperform based on how much money there is in the area, said Ben Scuderi, a predoctoral fellow at the Equality of Opportunity Project at Harvard, which uses big data to study how to improve economic opportunities for low-income children. “There's a lot going on here which we don't totally understand,” he said. “It's interesting, because it kind of defies our expectations.”",
    G: "The Chetty data shows that neighborhoods and places mattered for children born in the San Jose area of the 1980s. Whether the city still allows for upward mobility of poor kids today, though, is up for debate. Some of the indicators such as income inequality, measured by the Equality of Opportunity Project for the year 2000, have only worsened in the past 16 years.",
    H: "Some San Jose residents say that as inequality has grown in recent years, upward mobility has become much more difficult to achieve. As Silicon Valley has become home to more successful companies, the flood of people to the area has caused housing prices to skyrocket. By most measures, San Jose is no longer a place where low-income, or even middle-income families, can afford to live. Rents in San Jose grew 42.6 percent between 2006 and 2014, which was the largest increase in the country during that time period. The city has a growing homelessness problem, which it tried to address by shutting down “The Jungle,” one of the largest homeless encampments (临时住地) in the nation, in 2014. Inequality is extreme: The Human Development Index—a measure of life expectancy, education and per capita (人均的) income—gives East San Jose a score of 4.85 out of 10, while nearby Cupertino, where Apple's headquarters sits, receives a 9.26. San Jose used to have a happy mix of factors—cheap housing, closeness to a rapidly developing industry, tightly-knit immigrant communities—that together opened up the possibility of prosperity for even its poorest residents. But in recent years, housing prices have skyrocketed, the region's rich and poor have segregated, and middle-class jobs have disappeared. Given this, the future for the region's poor doesn't look nearly as bright as it once did.",
    I: "Leaders in San Jose are determined to make sure that the city regains its status as a place where even poor kids can access the resources to succeed. With Silicon Valley in its backyard, it certainly has the chance to do so. “I think there is a broad consciousness in the Valley that we can do better than to leave thousands of our neighbors behind through a period of extraordinary success,” San Jose Mayor Sam Liccardo said.",
    J: "But in today's America—a land of rising inequality, increasing segregation, and stagnating (不增长的) middle-class wages—can the San Jose region really once again become a place of opportunity?",
    K: "The idea that those at the bottom can rise to the top is central to America's ideas about itself. That such mobility has become more difficult in San Jose raises questions about the endurance of that foundational belief. After all, if the one-time land of opportunity can't be fixed, what does that say for the rest of America?",
  };

  const questionsB = [
    {
      Number: 36,
      Statement:
        "According to some people living in San Jose, it has become much harder for the poor to get ahead due to the increased inequality.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 37,
      Statement:
        "In American history, immigrants used to have a good chance to move upward in society.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 38,
      Statement:
        "If the problems of San Jose can't be solved, one of America's fundamental beliefs about itself can be shaken.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 39,
      Statement:
        "San Jose was among the best cities in America for poor kids to move up the social ladder.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 40,
      Statement:
        "Whether poor kids in San Jose today still have the chance to move upward is questionable.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 41,
      Statement:
        "San Jose's officials are resolved to give poor kids access to the resources necessary for success in life.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 42,
      Statement:
        "San Jose appears to manifest some of the best features of America.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 43,
      Statement:
        "As far as social mobility is concerned, San Jose beat many other progressive cities in America.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 44,
      Statement:
        "Due to some changes like increases in housing prices in San Jose, the prospects for its poor people have dimmed.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
    {
      Number: 45,
      Statement:
        "Researchers do not have a clear idea why poor children in San Jose achieved such great success several decades ago.",
      Options: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ],
    },
  ];

  return (
    <div className={styles.comprehensionContainer}>
      {/* Section A */}
      <h1>Part3 Reading Comprehension</h1>
      <section className={styles.section}>
        <h2>Section A</h2>
        {passageA.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        <div className={styles.optionsContainer}>
          {Object.entries(options).map(([key, value]) => (
            <p key={key} className={styles.optionItem}>
              {key}) {value}
            </p>
          ))}
        </div>
        {questionsA.map((question) => (
          <div key={question.number} className={styles.questionContainer}>
            <p className={styles.questionTitle}>Question {question.number}</p>
            {question.options.map((option) => (
              <button key={option}>{option}</button>
            ))}
          </div>
        ))}
      </section>

      {/* Section B */}
      <section className={styles.section}>
        <h2>Section B</h2>
        {Object.entries(passageB).map(([key, paragraph], index) => (
          <p key={key} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        {questionsB.map((question) => (
          <div key={question.Number} className={styles.questionContainer}>
            <p className={styles.questionTitle}>Question {question.Number}</p>
            <div className={styles.optionsContainer}>
              {question.Options.map((optionKey) => (
                <button key={optionKey} className={styles.optionButton}>
                  {optionKey}) {options[optionKey]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReadingComprehension;
