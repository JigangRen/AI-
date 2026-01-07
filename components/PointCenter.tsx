
import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  History, 
  HelpCircle, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus,
  Briefcase,
  MessageSquare,
  Calendar,
  ChevronRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 模拟数据：积分变化趋势
const POINTS_TREND = [
  { month: '1月', points: 1200 },
  { month: '2月', points: 1850 },
  { month: '3月', points: 2400 },
  { month: '4月', points: 3100 },
  { month: '5月', points: 3900 },
  { month: '6月', points: 4500 },
];

// 模拟数据：积分规则
const POINT_RULES = [
  { id: 1, action: '完成项目支撑申请', category: '项目支撑', points: '+100', detail: '成功响应并完成一次专家调用' },
  { id: 2, action: '支撑评价获得五星', category: '评价奖励', points: '+50', detail: '项目支撑完成后获得五星好评' },
  { id: 3, action: '回答一条业务咨询', category: '问答支撑', points: '+20', detail: '在问答模块回答用户提问' },
  { id: 4, action: '回答被标记为优质', category: '问答支撑', points: '+100', detail: '答案被管理员收录至专家成果库' },
  { id: 5, action: '分享原创技术方法论', category: '知识沉淀', points: '+200', detail: '在成果库上传高质量原创文档' },
];

// 模拟数据：积分记录
const POINT_HISTORY = [
  { id: 'h1', type: 'project', title: '核心业务双活架构优化', points: +150, date: '2024-06-12', status: '已到账' },
  { id: 'h2', type: 'qa', title: '解答：K8s网络隔离配置', points: +20, date: '2024-06-11', status: '已到账' },
  { id: 'h3', type: 'qa', title: '解答：MySQL慢日志分析', points: +120, date: '2024-06-10', status: '优质奖励' },
  { id: 'h4', type: 'project', title: '智能网格营销平台方案', points: +100, date: '2024-06-05', status: '已到账' },
];

// 模拟数据：排行榜
const RANKINGS = {
  monthly: [
    { rank: 1, name: '张建立', score: 1450, change: 'up', avatar: 'https://picsum.photos/40/40?random=1' },
    { rank: 2, name: '李瑞雪', score: 1280, change: 'up', avatar: 'https://picsum.photos/40/40?random=2' },
    { rank: 3, name: '陈芳', score: 1100, change: 'same', avatar: 'https://picsum.photos/40/40?random=3' },
    { rank: 4, name: '王振华', score: 950, change: 'down', avatar: 'https://picsum.photos/40/40?random=4' },
    { rank: 5, name: '周杰明', score: 820, change: 'up', avatar: 'https://picsum.photos/40/40?random=5' },
  ],
  yearly: [
    { rank: 1, name: '李瑞雪', score: 12400, change: 'up', avatar: 'https://picsum.photos/40/40?random=2' },
    { rank: 2, name: '张建立', score: 11800, change: 'down', avatar: 'https://picsum.photos/40/40?random=1' },
    { rank: 3, name: '王振华', score: 10500, change: 'same', avatar: 'https://picsum.photos/40/40?random=4' },
    { rank: 4, name: '陈芳', score: 9800, change: 'up', avatar: 'https://picsum.photos/40/40?random=3' },
    { rank: 5, name: '林静', score: 9200, change: 'up', avatar: 'https://picsum.photos/40/40?random=6' },
  ]
};

const PointCenter: React.FC = () => {
  const [rankTab, setRankTab] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">专家积分权益中心</h1>
          <p className="text-slate-500 mt-1 font-medium italic">量化技术价值，激励专家成长与知识贡献</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100">
             <Star className="w-4 h-4" /> 积分兑换商城
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
             <TrendingUp className="w-4 h-4" /> 我的成长值
           </button>
        </div>
      </div>

      {/* 第一部分：专家积分看板 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 核心积分信息 */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between h-56 group">
             <div className="relative z-10">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">当前总积分</p>
                <h2 className="text-5xl font-black tracking-tighter">12,400</h2>
             </div>
             <div className="relative z-10 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <ArrowUpRight className="w-4 h-4" /> 较上月增加 12.5%
             </div>
             <Award className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between h-56">
             <div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                   <Briefcase className="w-5 h-5" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">项目支撑积分</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">8,500</h3>
             </div>
             <p className="text-xs text-slate-400 font-medium">累计完成支撑 <span className="text-blue-600 font-bold">85</span> 次</p>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between h-56">
             <div>
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                   <MessageSquare className="w-5 h-5" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">问答支撑积分</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">3,900</h3>
             </div>
             <p className="text-xs text-slate-400 font-medium">优质回答占比 <span className="text-indigo-600 font-bold">42%</span></p>
          </div>
        </div>

        {/* 积分趋势图 */}
        <div className="lg:col-span-4 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <Zap className="w-5 h-5 text-amber-500" /> 积分增长趋势 (半年)
          </h3>
          <div className="flex-1 h-32">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={POINTS_TREND}>
                  <defs>
                    <linearGradient id="pointGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="points" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#pointGrad)" />
               </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 第二部分：积分规则展示 & 历史记录 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 积分规则 */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-600" /> 积分规则展示
               </h3>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rules V2.1</span>
            </div>
            <div className="space-y-4">
               {POINT_RULES.map((rule) => (
                 <div key={rule.id} className="group p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-500 transition-all cursor-default">
                    <div className="flex items-center justify-between gap-4">
                       <div className="flex-1">
                          <div className="flex items-center gap-3">
                             <h4 className="font-bold text-slate-800 text-base">{rule.action}</h4>
                             <span className="text-[10px] font-black px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md uppercase tracking-tighter">
                                {rule.category}
                             </span>
                          </div>
                          <p className="text-xs text-slate-400 font-medium mt-1">{rule.detail}</p>
                       </div>
                       <div className="text-xl font-black text-blue-600">{rule.points}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* 积分记录 */}
        <div className="lg:col-span-5">
           <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm h-full flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                 <History className="w-6 h-6 text-indigo-500" /> 积分记录明细
              </h3>
              <div className="space-y-6 flex-1">
                 {POINT_HISTORY.map((log) => (
                   <div key={log.id} className="flex items-center gap-5 group cursor-default">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        log.type === 'project' ? 'bg-blue-50 text-blue-500 group-hover:bg-blue-600 group-hover:text-white' : 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white'
                      }`}>
                         {log.type === 'project' ? <Briefcase className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-slate-800 text-sm truncate">{log.title}</h4>
                         <p className="text-[10px] text-slate-400 font-medium mt-0.5">{log.date} · {log.status}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-base font-black text-slate-800">+{log.points}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Points</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 mt-8 border-t border-slate-50 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">
                 查看完整流水清单
              </button>
           </div>
        </div>
      </div>

      {/* 第三部分：专家积分排行榜 */}
      <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-amber-500" /> 专家荣耀排行榜
               </h3>
               <p className="text-sm text-slate-400 font-medium mt-1">记录那些为网格化支撑作出杰出贡献的智慧大脑</p>
            </div>
            <div className="flex p-1.5 bg-slate-100 rounded-[20px] gap-1">
               <button 
                  onClick={() => setRankTab('monthly')}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${
                    rankTab === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
               >
                  月度排行
               </button>
               <button 
                  onClick={() => setRankTab('yearly')}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${
                    rankTab === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
               >
                  年度总榜
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RANKINGS[rankTab].map((item, idx) => (
              <div key={idx} className={`relative p-8 rounded-[40px] border transition-all duration-500 group ${
                idx === 0 ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-200' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'
              }`}>
                 {/* Rank Badge */}
                 <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-[20px] flex items-center justify-center font-black text-xl shadow-lg border-4 border-white ${
                   idx === 0 ? 'bg-amber-400 text-white' : 
                   idx === 1 ? 'bg-slate-300 text-slate-600' :
                   idx === 2 ? 'bg-orange-300 text-white' : 'bg-white text-slate-400'
                 }`}>
                    {item.rank}
                 </div>

                 <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                       <img 
                          src={item.avatar} 
                          className={`w-24 h-24 rounded-[32px] object-cover shadow-xl border-4 ${idx === 0 ? 'border-blue-400' : 'border-white'}`} 
                          alt={item.name} 
                       />
                       {item.change === 'up' && <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-full border-2 border-white"><ArrowUpRight className="w-3 h-3 text-white" /></div>}
                       {item.change === 'down' && <div className="absolute -bottom-2 -right-2 bg-red-500 p-1.5 rounded-full border-2 border-white"><ArrowDownRight className="w-3 h-3 text-white" /></div>}
                    </div>
                    
                    <h4 className={`text-xl font-bold mb-1 ${idx === 0 ? 'text-white' : 'text-slate-800'}`}>{item.name}</h4>
                    <p className={`text-xs font-bold mb-6 ${idx === 0 ? 'text-blue-100' : 'text-slate-400'}`}>高级技术专家</p>
                    
                    <div className={`w-full p-4 rounded-3xl flex justify-between items-center ${
                      idx === 0 ? 'bg-white/10 border border-white/20' : 'bg-white border border-slate-100'
                    }`}>
                       <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'text-blue-100' : 'text-slate-400'}`}>积分值</span>
                       <span className={`text-2xl font-black ${idx === 0 ? 'text-white' : 'text-blue-600'}`}>{item.score.toLocaleString()}</span>
                    </div>
                    
                    <button className={`mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                      idx === 0 ? 'text-white hover:translate-x-1' : 'text-blue-600 hover:text-blue-700'
                    }`}>
                       查看成长详情 <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
         </div>
         
         <div className="mt-16 bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10">
               <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-blue-400" /> 2024 年度积分英雄榜
               </h3>
               <p className="text-slate-400 font-medium max-w-lg">
                  年度排行榜前三名专家将获得由网格支撑中心颁发的“年度数字化转型智囊”奖章，并享有专属的高端技术峰会参与名额及定制化研修福利。
               </p>
            </div>
            <div className="relative z-10 flex gap-4">
               <button className="px-8 py-4 bg-blue-600 rounded-[20px] font-black text-sm shadow-xl shadow-blue-900/40 hover:scale-105 transition-all">
                  查看奖励细则
               </button>
               <button className="px-8 py-4 bg-white/10 border border-white/10 rounded-[20px] font-black text-sm hover:bg-white/20 transition-all">
                  往届英雄榜
               </button>
            </div>
            <Trophy className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 text-white" />
         </div>
      </div>
    </div>
  );
};

export default PointCenter;
