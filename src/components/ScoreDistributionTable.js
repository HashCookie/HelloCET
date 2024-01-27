const ScoreDistributionTable = () => {
  const data = [
    {
      category: "总计",
      subCategories: [
        {
          name: "-",
          proportion: "100%",
          number: 57,
          average: "-",
          total: "710分",
        },
      ],
    },
    {
      category: "作文",
      subCategories: [
        {
          name: "作文",
          proportion: "15%",
          number: 1,
          average: "106.5分",
          total: "106.5分",
        },
      ],
    },
    {
      category: "听力",
      subCategories: [
        {
          name: "长篇新闻",
          proportion: "7%",
          number: 7,
          average: "7.1分",
          total: "49.7分",
        },
        {
          name: "长对话",
          proportion: "8%",
          number: 8,
          average: "7.1分",
          total: "56.8分",
        },
        {
          name: "听力综合",
          proportion: "20%",
          number: 10,
          average: "14.2分",
          total: "142分",
        },
      ],
    },
    {
      category: "阅读",
      subCategories: [
        {
          name: "选词填空",
          proportion: "5%",
          number: 10,
          average: "3.55分",
          total: "35.5分",
        },
        {
          name: "长篇阅读",
          proportion: "10%",
          number: 10,
          average: "7.1分",
          total: "71分",
        },
        {
          name: "仔细阅读",
          proportion: "20%",
          number: 10,
          average: "14.2分",
          total: "142分",
        },
      ],
    },
    {
      category: "翻译",
      subCategories: [
        {
          name: "汉译英",
          proportion: "15%",
          number: 1,
          average: "106.5分",
          total: "106.5分",
        },
      ],
    },
  ];

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold text-center my-4">分值分布</h2>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
              分类
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
              细分
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
              占比
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
              数量
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
              每小题
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">
              总分
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((section, sectionIndex) =>
            section.subCategories.map((sub, subIndex) => (
              <tr key={sectionIndex + "-" + subIndex} className="bg-white">
                {subIndex === 0 && (
                  <td
                    rowSpan={section.subCategories.length}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border text-center align-middle"
                  >
                    {section.category}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border text-center align-middle">
                  {sub.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border text-center align-middle">
                  {sub.proportion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border text-center align-middle">
                  {sub.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border text-center align-middle">
                  {sub.average}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border text-center align-middle">
                  {sub.total}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreDistributionTable;
