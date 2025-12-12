import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Calendar as CalendarIcon, Users, Settings, 
  Bell, Search, Plus, Send, MoreVertical, CheckCircle2, Circle
} from 'lucide-react';
import { Button } from './Button';
import { ScheduleItem } from '../types';
import { generateSmartSchedule, sendMessageToAI } from '../services/geminiService';

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState<ScheduleItem[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Xin chào! Tôi là trợ lý TeamFlow. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial data load simulation
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoadingTasks(true);
      try {
        const initialTasks = await generateSmartSchedule("Họp daily đầu giờ, review code PR #123, cập nhật document API, team building lúc 4h chiều");
        setTasks(initialTasks);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingTasks(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsLoadingChat(true);

    try {
      const response = await sendMessageToAI(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: "Xin lỗi, đã có lỗi xảy ra." }]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-2 text-white font-bold text-xl cursor-pointer" onClick={onBack}>
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          TeamFlow
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Tổng quan" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<CalendarIcon size={20} />} label="Lịch trình" active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
          <NavItem icon={<Users size={20} />} label="Đội nhóm" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
          <NavItem icon={<Settings size={20} />} label="Cài đặt" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/200" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-600" />
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium border border-indigo-100 hidden sm:inline-block">
              Thứ Hai, 20/10/2025
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Button size="sm" onClick={onBack} variant="outline" className="md:hidden">Back</Button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Stats & Schedule */}
          <div className="flex-1 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard title="Công việc hôm nay" value={tasks.length.toString()} trend="+2" trendUp={true} />
              <StatCard title="Hiệu suất tuần" value="85%" trend="+5%" trendUp={true} />
              <StatCard title="Thành viên online" value="8/12" trend="Active" trendUp={true} />
            </div>

            {/* Smart Schedule */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-indigo-600" />
                  Lịch trình AI đề xuất
                </h3>
                <Button size="sm" variant="secondary" onClick={() => setIsLoadingTasks(true)}>
                   Làm mới
                </Button>
              </div>
              <div className="divide-y divide-slate-100">
                {isLoadingTasks ? (
                  <div className="p-8 text-center text-slate-500">Đang tải lịch trình...</div>
                ) : (
                  tasks.map((task, idx) => (
                    <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                      <div className="min-w-[80px] text-sm font-medium text-slate-500 pt-1">
                        {task.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-slate-900 font-medium">{task.task}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            task.priority === 'High' ? 'bg-red-100 text-red-700' :
                            task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {task.assignee}
                        </p>
                      </div>
                      <button className="text-slate-400 hover:text-indigo-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: AI Chat Assistant */}
          <div className="w-full lg:w-96 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px] lg:h-auto">
            <div className="p-4 border-b border-slate-100 bg-indigo-600 text-white rounded-t-xl flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                TeamFlow AI
              </h3>
              <span className="text-xs text-indigo-200 bg-indigo-700 px-2 py-1 rounded">Beta</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoadingChat && (
                 <div className="flex justify-start">
                   <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1">
                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                   </div>
                 </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Hỏi AI về lịch trình..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="sm" onClick={handleSendMessage} disabled={isLoadingChat || !chatMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }> = ({ 
  icon, label, active, onClick 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StatCard: React.FC<{ title: string, value: string, trend: string, trendUp?: boolean }> = ({ 
  title, value, trend, trendUp 
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
        trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        {trend}
      </span>
    </div>
  </div>
);
