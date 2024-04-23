import axios from "axios";

const apiKey = process.env.REACT_APP_MOONSHOT_API_KEY; // 确保通过环境变量来设置API密钥

const getMoonshotResponse = async (messages) => {
  const response = await axios.post(
    "https://api.moonshot.cn/v1/chat/completions",
    {
      model: "moonshot-v1-8k",
      messages: messages,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data;
};

export default getMoonshotResponse;
