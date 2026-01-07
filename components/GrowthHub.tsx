
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

// 个人能力画像数据 (针对网格岗位调整)
const CAPABILITY_DATA = [
  { subject: '网格统筹', A: 85, fullMark: 100 },
  { subject: '商客开发', A: 72, fullMark: 100 },
  { subject: '存量运营', A: 95, fullMark: 100 },
  { subject: '活动策划', A: 88, fullMark: 100 },
  { subject: '团队协作', A: 92, fullMark: 100 },
  { subject: '数字化工具', A: 80, fullMark: 100 },
];

// 成长记录：学习记录
const LEARNING_LOGS = [
  { id: 'L1', title: '《商客关系维护与千万级单体突破》', category: '商客进阶', duration: '45min', date: '2024-06-12', status: '已完成' },
  { id: 'L2', title: '网格化经营3.0：数字化看板全流程应用', category: '网格统筹', duration: '12min', date: '2024-06-10', status: '阅读中' },
  { id: 'L3', title: '市场营销专员的短视频裂变话术实操', category: '市场营销', duration: '30min', date: '2024-06-08', status: '已完成' },
];

// 成长记录：项目参与
const PROJECT_LOGS = [
  { id: 'P1', name: '智慧网格V3.0 运营体系搭建', role: '网格经理', contribution: '负责存量用户价值分层运营策略执行', date: '2024.03 - 至今' },
  { id: 'P2', name: '春季百日营销攻坚行动', role: '营销小组长', contribution: '完成华东区20个主要网格的活动落地', date: '2023.11 - 2024.01' },
];

const GrowthHub: React.FC = () => {
  const [activeLogTab, setActiveLogTab] = useState<'learning' | 'project'>('learning');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-700">
      {/* 1. 个人成长首页：顶部个人概览 */}
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
                <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-2xl text-xs font-black border border-emerald-500/30 uppercase tracking-widest">
                  资深网格经理
                </span>
              </div>
              <p className="text-slate-400 font-bold mb-6 flex items-center justify-center md:justify-start gap-2 italic">
                <Briefcase className="w-4 h-4" /> 华东中心 · 第二综合网格
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">年度积分</p>
                  <p className="text-2xl font-black text-white">12,400</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">活跃贡献</p>
                  <p className="text-2xl font-black text-emerald-400">Top 5%</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">覆盖商户</p>
                  <p className="text-2xl font-black text-blue-400">324 <span className="text-xs">家</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full lg:w-auto">
            <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-3xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-xl">
              <Compass className="w-5 h-5" /> 网格核心能力诊断
            </button>
            <button className="px-8 py-4 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40">
              <Layers className="w-5 h-5" /> 查看年度职业档案
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" /> 网格化经营核心画像
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={CAPABILITY_DATA}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                  <Radar name="我的能力" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-xs text-slate-400 leading-relaxed font-medium text-center">
              您在“存量运营”和“活动策划”表现优异。作为网格经理，建议加强“商客开发”能力的系统化学习。
            </p>
          </div>

          <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-200/50 space-y-4">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">快捷功能入口</h3>
             <button className="w-full bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <Users className="w-6 h-6 text-blue-600" />
                   <div className="text-left">
                      <p className="text-sm font-black text-slate-800">查看向网格长提问</p>
                   </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-blue-500 transition-colors" />
             </button>
             <button className="w-full bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <MessageSquare className="w-6 h-6 text-indigo-600" />
                   <div className="text-left">
                      <p className="text-sm font-black text-slate-800">商客开发支援请求</p>
                   </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-indigo-500 transition-colors" />
             </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-amber-500" /> 岗位定制化成长计划
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  <BookOpen className="w-4 h-4 text-blue-500" /> 推荐学习方向
                </div>
                <div className="space-y-4">
                  {[
                    { title: '大型商户关系攻坚实战', level: '高阶', trend: '+24%' },
                    { title: '网格存量客户防流失画像分析', level: '进阶', trend: '+18%' },
                    { title: '社群营销：从裂变到转化全链条', level: '实战', trend: '+15%' },
                  ].map((study, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg transition-all">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{study.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400">{study.level}课程</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
                        <TrendingUp className="w-3 h-3" /> {study.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  <Users className="w-4 h-4 text-indigo-500" /> 推荐跟随专家 (导师)
                </div>
                <div className="space-y-4">
                  {[
                    { name: '张建立', title: '资深网格长', match: '98%', avatar: 'https://picsum.photos/40/40?random=1' },
                    { name: '王振华', title: '金牌商客经理', match: '92%', avatar: 'https://picsum.photos/40/40?random=4' },
                  ].map((expert, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                      <img src={expert.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={expert.name} />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800">{expert.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold">{expert.title}</p>
                      </div>
                      <div className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-[10px] font-black border border-indigo-100">
                         匹配度 {expert.match}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <BookMarked className="w-6 h-6 text-indigo-500" /> 成长轨迹档案库
              </h3>
              <div className="flex p-1.5 bg-slate-50 rounded-[20px] gap-1">
                 <button onClick={() => setActiveLogTab('learning')} className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${activeLogTab === 'learning' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>学习轨迹</button>
                 <button onClick={() => setActiveLogTab('project')} className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${activeLogTab === 'project' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>履职记录</button>
              </div>
            </div>

            <div className="space-y-6">
               {activeLogTab === 'learning' ? (
                 <div className="space-y-4">
                   {LEARNING_LOGS.map(log => (
                     <div key={log.id} className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center"><BookOpen className="w-6 h-6" /></div>
                           <div>
                              <h4 className="font-bold text-slate-800 text-base">{log.title}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{log.category} · {log.duration}</p>
                           </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-[10px] font-black ${log.status === '已完成' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                          {log.status}
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {PROJECT_LOGS.map(proj => (
                     <div key={proj.id} className="p-8 rounded-[40px] border border-slate-100 bg-slate-50/30">
                        <div className="flex items-center gap-3 mb-4">
                           <Briefcase className="w-5 h-5 text-indigo-600" />
                           <span className="text-[10px] text-indigo-500 font-black uppercase">{proj.date}</span>
                        </div>
                        <h4 className="text-lg font-black text-slate-800 mb-1">{proj.name}</h4>
                        <p className="text-xs text-blue-600 font-bold mb-4">{proj.role}</p>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{proj.contribution}</p>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthHub;
