
import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  History, 
  HelpCircle, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  Briefcase,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const POINTS_TREND = [
  { month: '1月', points: 1200 },
  { month: '2月', points: 1850 },
  { month: '3月', points: 2400 },
  { month: '4月', points: 3100 },
  { month: '5月', points: 3900 },
  { month: '6月', points: 4500 },
];

const POINT_RULES = [
  { id: 1, action: '跨网格统筹支撑', category: '网格长职责', points: '+150', detail: '成功协调跨网格大型进场/建设任务' },
  { id: 2, action: '存量用户价值激活', category: '经理履职', points: '+100', detail: '月度存量高价值用户保有量达成Top1' },
  { id: 3, action: '签约千万级商客', category: '商客公关', points: '+500', detail: '成功签约单一客户年度金额超千万项目' },
  { id: 4, action: '营销方案全网格推广', category: '营销沉淀', points: '+300', detail: '原创策划案被省中心采纳并全省下发' },
  { id: 5, action: '网格化实战答疑', category: '知识贡献', points: '+20', detail: '在问答中心有效回复一线提问' },
];

const RANKINGS = {
  monthly: [
    { rank: 1, name: '张建立', role: '资深网格长', score: 1450, change: 'up', avatar: 'https://picsum.photos/40/40?random=1' },
    { rank: 2, name: '李瑞雪', role: '网格经理', score: 1280, change: 'up', avatar: 'https://picsum.photos/40/40?random=2' },
    { rank: 3, name: '陈芳', role: '营销专员', score: 1100, change: 'same', avatar: 'https://picsum.photos/40/40?random=3' },
    { rank: 4, name: '王振华', role: '商客经理', score: 950, change: 'down', avatar: 'https://picsum.photos/40/40?random=4' },
    { rank: 5, name: '周杰明', role: '统筹专家', score: 820, change: 'up', avatar: 'https://picsum.photos/40/40?random=5' },
  ],
  yearly: [
    { rank: 1, name: '李瑞雪', role: '网格经理', score: 12400, change: 'up', avatar: 'https://picsum.photos/40/40?random=2' },
    { rank: 2, name: '张建立', role: '资深网格长', score: 11800, change: 'down', avatar: 'https://picsum.photos/40/40?random=1' },
    { rank: 3, name: '王振华', role: '商客经理', score: 10500, change: 'same', avatar: 'https://picsum.photos/40/40?random=4' },
  ]
};

const PointCenter: React.FC = () => {
  const [rankTab, setRankTab] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">网格运营价值积分</h1>
          <p className="text-slate-500 mt-1 font-medium italic">量化网格经营成果，记录每一份实战贡献</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-100">
             <Star className="w-4 h-4" /> 积分兑换中心
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden h-56 group">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">当前累计总分</p>
             <h2 className="text-5xl font-black tracking-tighter">12,400</h2>
             <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <ArrowUpRight className="w-4 h-4" /> 岗位排名 +3
             </div>
             <Award className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10" />
          </div>
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm h-56 flex flex-col justify-between">
             <div>
                <Briefcase className="w-10 h-10 text-blue-600 mb-4" />
                <p className="text-[10px] text-slate-400 font-bold uppercase">网格支撑积分</p>
                <h3 className="text-3xl font-black text-slate-800">8,500</h3>
             </div>
             <p className="text-xs text-slate-400">来自 124 项跨岗支援</p>
          </div>
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm h-56 flex flex-col justify-between">
             <div>
                <MessageSquare className="w-10 h-10 text-indigo-600 mb-4" />
                <p className="text-[10px] text-slate-400 font-bold uppercase">知识共享积分</p>
                <h3 className="text-3xl font-black text-slate-800">3,900</h3>
             </div>
             <p className="text-xs text-slate-400">获评精品案例 12 份</p>
          </div>
        </div>
        <div className="lg:col-span-4 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col h-56">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest"><Zap className="w-4 h-4 text-amber-500" /> 增长动力曲线</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={POINTS_TREND}>
                  <Area type="monotone" dataKey="points" stroke="#3b82f6" strokeWidth={3} fill="#3b82f6" fillOpacity={0.1} />
               </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2"><HelpCircle className="w-6 h-6 text-blue-600" /> 岗位积分规则</h3>
            <div className="space-y-4">
               {POINT_RULES.map((rule) => (
                 <div key={rule.id} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-500 transition-all">
                    <div className="flex items-center justify-between gap-4">
                       <div>
                          <h4 className="font-bold text-slate-800 flex items-center gap-3">{rule.action} <span className="text-[9px] bg-blue-100 text-blue-700 px-2 rounded uppercase">{rule.category}</span></h4>
                          <p className="text-xs text-slate-400 mt-1">{rule.detail}</p>
                       </div>
                       <div className="text-xl font-black text-blue-600">{rule.points}</div>
                    </div>
                  </div>
               ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
           <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm h-full flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-indigo-500" /> 岗位排名看板</h3>
              <div className="flex p-1 bg-slate-100 rounded-2xl gap-1 mb-8">
                 <button onClick={() => setRankTab('monthly')} className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${rankTab === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>月度</button>
                 <button onClick={() => setRankTab('yearly')} className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${rankTab === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>年度</button>
              </div>
              <div className="space-y-6 flex-1">
                 {RANKINGS[rankTab].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${idx < 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{item.rank}</div>
                      <img src={item.avatar} className="w-10 h-10 rounded-2xl object-cover" />
                      <div className="flex-1">
                         <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase">{item.role}</p>
                      </div>
                      <div className="text-right"><p className="text-sm font-black text-slate-800">{item.score.toLocaleString()}</p></div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PointCenter;
