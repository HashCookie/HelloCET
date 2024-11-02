import { useRouter } from "next/navigation";

interface SubmitButtonProps {
  section: "writing" | "listening" | "reading" | "translation";
}

const SubmitButton = ({ section }: SubmitButtonProps) => {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // TODO: 在这里实现答案提交的逻辑
      console.log(`提交${section}答案`);
      
      // 提交成功后跳转到成绩页面
      router.push("/scores");
    } catch (error) {
      console.error("提交答案失败:", error);
    }
  };

  return (
    <div className="flex justify-end mt-8">
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        提交答案
      </button>
    </div>
  );
};

export default SubmitButton;
