import { GoogleGenAI, Type, Chat } from "@google/genai";
import { ScheduleItem } from "../types";

// Initialize Gemini API Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Keep a chat instance in memory (for this simple demo) or manage state in component
let chatSession: Chat | null = null;

export const getChatSession = () => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "Bạn là TeamFlow AI, một trợ lý quản lý dự án thông minh. Bạn giúp người dùng lên kế hoạch, giải quyết vấn đề đội nhóm và tối ưu hóa thời gian. Hãy trả lời ngắn gọn, súc tích và chuyên nghiệp.",
      },
    });
  }
  return chatSession;
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const response = await chat.sendMessage({ message });
    return response.text || "Xin lỗi, tôi không thể trả lời ngay lúc này.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Đã có lỗi xảy ra. Vui lòng thử lại.";
  }
};

export const generateSmartSchedule = async (inputTasks: string): Promise<ScheduleItem[]> => {
  try {
    const model = "gemini-2.5-flash"; 

    const prompt = `
      Bạn là một trợ lý AI quản lý dự án chuyên nghiệp.
      Dựa trên danh sách các công việc thô dưới đây, hãy tạo ra một lịch trình làm việc mẫu cho một ngày làm việc của một nhóm.
      Hãy phân bổ thời gian hợp lý, gán người phụ trách (ví dụ: Team Lead, Designer, Developer, Marketing) và xác định độ ưu tiên.
      
      Danh sách công việc đầu vào: "${inputTasks}"
      
      Nếu đầu vào quá ngắn hoặc không rõ ràng, hãy tự sáng tạo ra các công việc liên quan đến phát triển phần mềm để làm ví dụ.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING, description: "Thời gian (ví dụ: 09:00 - 10:00)" },
              task: { type: Type.STRING, description: "Tên công việc ngắn gọn" },
              assignee: { type: Type.STRING, description: "Vai trò người thực hiện" },
              priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
            },
            required: ["time", "task", "assignee", "priority"],
            propertyOrdering: ["time", "task", "assignee", "priority"]
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    return JSON.parse(jsonText) as ScheduleItem[];

  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    // Return dummy data on error to prevent app crash
    return [
      { time: "09:00 - 09:30", task: "Họp Daily Standup", assignee: "Toàn team", priority: "High" },
      { time: "09:30 - 11:00", task: "Phát triển tính năng mới", assignee: "Developer", priority: "High" },
      { time: "11:00 - 12:00", task: "Review thiết kế UI", assignee: "Designer", priority: "Medium" },
    ];
  }
};