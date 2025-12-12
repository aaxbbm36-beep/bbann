import React from 'react';
import { Button } from './Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Phiên bản 2.0 đã ra mắt với tính năng AI
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Quản lý thời gian <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Đơn giản. Thông minh. Hiệu quả.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10">
          TeamFlow giúp bạn và đội ngũ đồng bộ hóa công việc, tối ưu hóa lịch trình và đạt được mục tiêu nhanh hơn với sự hỗ trợ từ AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-12">
          <Button size="lg" className="shadow-xl shadow-indigo-200" onClick={onStart}>
            Dùng thử miễn phí
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="secondary" size="lg">
            Xem video giới thiệu
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Không cần thẻ tín dụng</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Dùng thử 14 ngày</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Hỗ trợ 24/7</span>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <div className="mt-16 relative w-full max-w-5xl mx-auto rounded-xl shadow-2xl border border-slate-200 bg-white p-2 md:p-4 overflow-hidden">
             <img 
               src="https://picsum.photos/1200/800" 
               alt="Dashboard Preview" 
               className="rounded-lg w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
               onClick={onStart} 
               style={{cursor: 'pointer'}}
             />
        </div>
      </div>
    </section>
  );
};