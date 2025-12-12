import React, { useState } from 'react';
import { Sparkles, CalendarCheck, Clock, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { generateSmartSchedule } from '../services/geminiService';
import { ScheduleItem } from '../types';

export const AIDemo: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setSchedule(null); // Clear previous result
    try {
      const result = await generateSmartSchedule(input);
      setSchedule(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Explanation & Input */}
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Trải nghiệm sức mạnh AI</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Lập kế hoạch trong vài giây
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Chỉ cần nhập danh sách các đầu việc lộn xộn, AI của chúng tôi sẽ tự động sắp xếp thành một lịch trình làm việc khoa học, phân chia vai trò và mức độ ưu tiên cho cả đội.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label htmlFor="tasks" className="block text-sm font-medium text-slate-700 mb-2">
                Nhập công việc của bạn (hoặc copy-paste từ chat):
              </label>
              <textarea
                id="tasks"
                rows={4}
                className="w-full p-4 rounded-xl border-slate-300 border focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-all text-slate-900"
                placeholder="Ví dụ: Họp team lúc sáng, Dev cần fix bug login, Design hoàn thiện banner marketing, chiều gửi báo cáo cho khách hàng..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <Button 
                    onClick={handleGenerate} 
                    isLoading={loading}
                    disabled={!input.trim()}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Tạo lịch trình mẫu
                </Button>
              </div>
            </div>
            
            <p className="mt-4 text-xs text-slate-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Sử dụng mô hình Gemini 2.5 Flash mới nhất từ Google.
            </p>
          </div>

          {/* Right Side: Output Visualization */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[400px]">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-indigo-600" />
                  Lịch trình đề xuất
                </h3>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-20 h-4 bg-slate-200 rounded"></div>
                        <div className="flex-1 h-16 bg-slate-100 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                ) : schedule ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {schedule.map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-24 pt-3 flex-shrink-0 text-right">
                          <span className="text-sm font-semibold text-slate-500 block">{item.time}</span>
                        </div>
                        <div className="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all relative">
                          <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r ${
                            item.priority === 'High' ? 'bg-red-500' : 
                            item.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                          }`}></div>
                          <div className="pl-3">
                            <h4 className="font-medium text-slate-900">{item.task}</h4>
                            <div className="mt-2 flex items-center gap-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                    {item.assignee}
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    item.priority === 'High' ? 'bg-red-50 text-red-700' :
                                    item.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                                }`}>
                                    {item.priority} Priority
                                </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center">
                    <Clock className="w-12 h-12 mb-3 opacity-20" />
                    <p>Lịch trình sẽ xuất hiện ở đây sau khi bạn nhấn "Tạo lịch trình mẫu"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};