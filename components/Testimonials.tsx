import React from 'react';
import { TestimonialProps } from '../types';

const testimonials: TestimonialProps[] = [
  {
    name: "Nguyễn Văn A",
    role: "Project Manager tại TechSoft",
    quote: "TeamFlow đã thay đổi hoàn toàn cách team chúng tôi làm việc. Việc giao tiếp và theo dõi tiến độ trở nên dễ dàng hơn bao giờ hết.",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "Trần Thị B",
    role: "Marketing Lead",
    quote: "Tính năng AI gợi ý lịch trình thực sự ấn tượng. Tôi tiết kiệm được ít nhất 2 giờ mỗi ngày cho việc lên kế hoạch.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Lê Hoàng C",
    role: "Freelance Designer",
    quote: "Giao diện đẹp, trải nghiệm mượt mà. Là một freelancer, đây là công cụ không thể thiếu để tôi quản lý nhiều dự án cùng lúc.",
    avatar: "https://picsum.photos/100/100?random=3"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-16">
          Được tin dùng bởi hơn 10,000+ đội ngũ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex-1">
                <p className="text-slate-600 italic leading-relaxed mb-6">"{item.quote}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};