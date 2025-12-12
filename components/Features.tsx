import React from 'react';
import { Calendar, Users, BarChart3, Zap, Smartphone, Shield } from 'lucide-react';
import { FeatureCardProps } from '../types';

const features: FeatureCardProps[] = [
  {
    title: "Lập lịch thông minh",
    description: "Tự động sắp xếp công việc dựa trên mức độ ưu tiên và thời gian trống của bạn.",
    icon: <Calendar className="w-6 h-6 text-white" />,
  },
  {
    title: "Đồng bộ đội nhóm",
    description: "Xem ai đang làm gì trong thời gian thực. Tránh chồng chéo công việc.",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    title: "Báo cáo chi tiết",
    description: "Phân tích năng suất làm việc của cá nhân và cả nhóm qua các biểu đồ trực quan.",
    icon: <BarChart3 className="w-6 h-6 text-white" />,
  },
  {
    title: "Tự động hóa AI",
    description: "Sử dụng Gemini AI để tóm tắt cuộc họp và gợi ý danh sách việc cần làm.",
    icon: <Zap className="w-6 h-6 text-white" />,
  },
  {
    title: "Đa nền tảng",
    description: "Truy cập từ mọi thiết bị: Web, Mobile (iOS/Android), Tablet.",
    icon: <Smartphone className="w-6 h-6 text-white" />,
  },
  {
    title: "Bảo mật tuyệt đối",
    description: "Dữ liệu của bạn được mã hóa đầu cuối và tuân thủ các tiêu chuẩn an toàn.",
    icon: <Shield className="w-6 h-6 text-white" />,
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Tính năng nổi bật</h2>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
            Mọi thứ bạn cần để quản lý thời gian
          </p>
          <p className="mt-4 text-xl text-slate-600">
            Không còn nỗi lo trễ hạn hay quên việc. TeamFlow mang đến giải pháp toàn diện.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};