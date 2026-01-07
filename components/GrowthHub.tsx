
import React, { useState } from 'react';
import { 
  Target, 
  Compass, 
  BookOpen, 
  ChevronRight, 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  Award, 
  MessageSquare, 
  Users, 
  Star, 
  Briefcase,
  Layers,
  Search,
  BookMarked,
  ArrowRight
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

// 个人能力画像数据
const CAPABILITY_DATA = [
  { subject: '技术广度', A: 85, fullMark: 100 },
  { subject: '业务理解', A: 92, fullMark: 100 },
  { subject: '项目管控', A: 78, fullMark: 100 },
  { subject: '创新思维', A: 88, fullMark: 100 },
  { subject: '团队协作', A: 95, fullMark: 100 },
  { subject: '应急响应', A: 70, fullMark: 100 },
];

// 成长记录：学习记录
const LEARNING_LOGS = [
  { id: 'L1', title: '《深度学习在流量预测中的应用》', category: '视频课程', duration: '45min', date: '2024-06-12', status: '已完成' },
  { id: 'L2', title: '云原生架构师进阶系列-K8s网络详解', category: '技术文档', duration: '12min', date: '2024-06-10', status: '阅读中' },
  { id: 'L3', title: '网格化经营策略深度解析案例', category: '内部分享', duration: '30min', date: '2024-06-08', status: '已完成' },
];

// 成长记录：项目参与
const PROJECT_LOGS = [
  { id: 'P1', name: '智慧网格V3.0 架构升级', role: '核心参与者', contribution: '负责数据治理层逻辑设计', date: '2024.03 - 至今' },
  { id: 'P2', name: '某省分政企专线自动化开通项目', role: '技术支持', contribution: '完成API接口适配与联调', date: '2023.11 - 2024.01' },
];

const GrowthHub: React.FC = () => {
  const [activeLogTab, setActiveLogTab] = useState<'learning' | 'project'>('learning');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-700">
      {/* 1. 个人成长首页：顶部个人概览 & 业绩数据 */}
      <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img 
                src="https://picsum.photos/200/200?random=20" 
                className="w-32 h-32 rounded-[40px] border-4 border-white/10 shadow-2xl object-cover" 
                alt="avatar" 
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-2xl shadow-lg border-4 border-slate-900">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <h2 className="text-4xl font-black tracking-tight">李瑞雪</h2>
                <span className="bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-2xl text-xs font-black border border-blue-500/30 uppercase tracking-widest">
                  L4 资深专家
                </span>
              </div>
              <p className="text-slate-400 font-bold mb-6 flex items-center justify-center md:justify-start gap-2 italic">
                <Briefcase className="w-4 h-4" /> 创新实验室 · AI研发中心
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">年度积分</p>
                  <p className="text-2xl font-black text-white">12,400</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">支撑评价</p>
                  <p className="text-2xl font-black text-emerald-400">4.95</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">成果沉淀</p>
                  <p className="text-2xl font-black text-blue-400">24 <span className="text-xs">份</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full lg:w-auto">
            <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-3xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-xl">
              <Compass className="w-5 h-5" /> 智能诊断成长路径
            </button>
            <button className="px-8 py-4 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40">
              <Layers className="w-5 h-5" /> 导出年度成长周报
            </button>
          </div>
        </div>
        
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧：能力画像与快速入口 (Col 4) */}
        <div className="lg:col-span-4 space-y-8">
          {/* 能力画像画像 */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" /> 网格人员能力画像
              </h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update: June</span>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={CAPABILITY_DATA}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                  <Radar
                    name="能力值"
                    dataKey="A"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.5}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-xs text-slate-400 leading-relaxed font-medium text-center">
              您的“团队协作”能力非常突出，但在“应急响应”方面仍有进步空间。建议参加下个月的网格突发应急演练。
            </p>
          </div>

          {/* 快速进入入口 */}
          <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-200/50 space-y-4">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">快捷操作中心</h3>
             <button className="w-full bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Users className="w-6 h-6" />
                   </div>
                   <div className="text-left">
                      <p className="text-sm font-black text-slate-800">我的找专家记录</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Pending: 2 Requests</p>
                   </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-blue-500 transition-colors" />
             </button>

             <button className="w-full bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <MessageSquare className="w-6 h-6" />
                   </div>
                   <div className="text-left">
                      <p className="text-sm font-black text-slate-800">我的提问列表</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">New Replies: 3</p>
                   </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-indigo-500 transition-colors" />
             </button>
          </div>
        </div>

        {/* 右侧：成长计划与轨迹 (Col 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 2. 成长计划生成：智能推荐 */}
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-amber-500" /> AI 智能成长计划
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 推荐学习方向 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  <BookOpen className="w-4 h-4 text-blue-500" /> 推荐学习方向
                </div>
                <div className="space-y-4">
                  {[
                    { title: '分布式云原生架构进阶', level: '高级', trend: '+15%' },
                    { title: '大数据实时分析处理技术', level: '中级', trend: '+12%' },
                    { title: '网格化经营数字化赋能模版', level: '进阶', trend: '+20%' },
                  ].map((study, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg transition-all">
                      <div>
                        <h4 className="text-sm font-black text-slate-800">{study.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400">{study.level}课程</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black">
                          <TrendingUp className="w-3 h-3" /> {study.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 推荐跟随专家 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  <Users className="w-4 h-4 text-indigo-500" /> 推荐导师建议
                </div>
                <div className="space-y-4">
                  {[
                    { name: '张建立', title: '首席架构师', match: '98%', avatar: 'https://picsum.photos/40/40?random=1' },
                    { name: '陈芳', title: '网络安全专家', match: '85%', avatar: 'https://picsum.photos/40/40?random=4' },
                  ].map((expert, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-white hover:shadow-lg transition-all">
                      <img src={expert.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={expert.name} />
                      <div className="flex-1">
                        <h4 className="text-sm font-black text-slate-800">{expert.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{expert.title}</p>
                      </div>
                      <div className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-[10px] font-black border border-indigo-100">
                         匹配度 {expert.match}
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-xs font-black text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                     <Search className="w-4 h-4" /> 搜索更多同领域专家
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 成长轨迹记录：学习与项目 */}
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <BookMarked className="w-6 h-6 text-indigo-500" /> 成长轨迹档案库
              </h3>
              <div className="flex p-1.5 bg-slate-50 rounded-[20px] gap-1">
                 <button 
                   onClick={() => setActiveLogTab('learning')}
                   className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${
                     activeLogTab === 'learning' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                   }`}
                 >
                   学习记录
                 </button>
                 <button 
                   onClick={() => setActiveLogTab('project')}
                   className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${
                     activeLogTab === 'project' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                   }`}
                 >
                   项目参与记录
                 </button>
              </div>
            </div>

            <div className="space-y-6">
               {activeLogTab === 'learning' ? (
                 <div className="space-y-4">
                   {LEARNING_LOGS.map(log => (
                     <div key={log.id} className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                              <BookOpen className="w-6 h-6" />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800 text-base">{log.title}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.category}</span>
                                 <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.duration}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-200/50">
                           <div className="text-right">
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">学习日期</p>
                              <p className="text-sm font-bold text-slate-700">{log.date}</p>
                           </div>
                           <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                             log.status === '已完成' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                           }`}>
                             {log.status}
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PROJECT_LOGS.map(proj => (
                     <div key={proj.id} className="p-8 rounded-[40px] border border-slate-100 bg-slate-50/30 flex flex-col h-full hover:bg-white hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                              <Briefcase className="w-5 h-5" />
                           </div>
                           <span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">{proj.date}</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-800 mb-2 leading-tight">{proj.name}</h4>
                        <p className="text-xs text-blue-600 font-bold mb-6 uppercase tracking-widest">{proj.role}</p>
                        
                        <div className="bg-white/60 p-4 rounded-3xl border border-slate-100 flex-1">
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">项目贡献</p>
                           <p className="text-sm text-slate-600 font-medium leading-relaxed">{proj.contribution}</p>
                        </div>
                        
                        <button className="mt-8 flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-colors">
                           查看详细里程碑 <ChevronRight className="w-4 h-4" />
                        </button>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            <button className="w-full py-5 mt-10 border-t border-slate-50 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.3em]">
               下载完整的职业成长报告 (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthHub;
