
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Users, 
  PhoneCall, 
  Award, 
  Map as MapIcon, 
  TrendingUp, 
  ChevronUp, 
  Clock,
  LayoutDashboard
} from 'lucide-react';

// 配色方案：科技蓝、青色、金黄、翠绿
const COLORS = ['#00E5FF', '#0091FF', '#FFB300', '#00D68F', '#8B5CF6', '#F43F5E'];

// 1. 人员岗位分布数据
const educationData = [
  { name: '网格长', value: 450 },
  { name: '网格经理', value: 1200 },
  { name: '商客经理', value: 850 },
  { name: '市场营销专员', value: 418 },
  { name: '支撑专家', value: 73 },
];

const specializedData = [
  { name: '网格统筹', value: 2185 },
  { name: '数字化经营', value: 893 },
  { name: '商客关系', value: 303 },
  { name: '市场分析', value: 160 },
  { name: '渠道管理', value: 651 },
  { name: '应急支撑', value: 136 },
  { name: '存量运营', value: 102 },
  { name: '活动策划', value: 521 },
];

const promotionData = [
  { name: '网格长', total: 679, up: 98, down: 53 },
  { name: '网格经理', total: 741, up: 120, down: 28 },
  { name: '商客经理', total: 422, up: 47, down: 15 },
  { name: '市场营销', total: 125, up: 16, down: 6 },
  { name: '后台支撑', total: 318, up: 54, down: 11 },
  { name: '综合管理', total: 503, up: 77, down: 26 },
];

// 2. 趋势数据 (近5年)
const trendData = [
  { year: '2022', '网格长': 100, '网格经理': 80, '商客经理': 60, '市场营销': 40, '综合': 120 },
  { year: '2023', '网格长': 110, '网格经理': 150, '商客经理': 90, '市场营销': 80, '综合': 130 },
  { year: '2024', '网格长': 180, '网格经理': 250, '商客经理': 120, '市场营销': 150, '综合': 220 },
  { year: '2025', '网格长': 350, '网格经理': 450, '商客经理': 200, '市场营销': 280, '综合': 420 },
  { year: '2026', '网格长': 450, '网格经理': 680, '商客经理': 300, '市场营销': 420, '综合': 710 },
];

// 3. 调用排行
const rankingData = [
  { name: '华北中心', value: 447 },
  { name: '华东中心', value: 191 },
  { name: '华南中心', value: 121 },
  { name: '浙江分部', value: 100 },
  { name: '四川分部', value: 90 },
  { name: '河南分部', value: 86 },
  { name: '广东分部', value: 85 },
  { name: '山西分部', value: 84 },
  { name: '河北分部', value: 81 },
  { name: '江苏分部', value: 74 },
];

// 4. 地域分布数据
const geoPoints = [
  { x: 105, y: 35, z: 100, name: '北京' },
  { x: 115, y: 32, z: 80, name: '江苏' },
  { x: 113, y: 23, z: 90, name: '广东' },
  { x: 103, y: 30, z: 60, name: '成都' },
  { x: 110, y: 34, z: 50, name: '西安' },
  { x: 117, y: 39, z: 40, name: '天津' },
];

const ExpertDashboard: React.FC = () => {
  const currentTime = new Date().toLocaleString('zh-CN', { hour12: false });

  return (
    <div className="min-h-screen bg-[#061022] text-white p-4 font-sans overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/20 border border-blue-500/40 rounded-full">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">Mesh Operation Analysis</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 text-center">
            网格化储备人才及专家资源分析大屏
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2"></div>
        </div>

        <div className="text-right font-mono text-blue-300 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {currentTime}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8 relative z-10">
        {[
          { label: '网格化储备专家人数', value: 2991, up: true },
          { label: '网格支撑项目总数', value: 1056, up: true },
          { label: '专家人才服务响应人次', value: 1755, up: true },
          { label: '网格知识库沉淀成果量', value: 9953, up: true },
        ].map((item, i) => (
          <div key={i} className="bg-gradient-to-r from-blue-900/30 to-blue-800/10 border border-blue-500/30 p-4 rounded-xl flex flex-col items-center justify-center group hover:border-blue-400 transition-all">
            <p className="text-xs text-blue-300/80 mb-2 font-bold uppercase tracking-tighter">{item.label}</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-cyan-400">{item.value}</span>
              {item.up && <ChevronUp className="w-6 h-6 text-cyan-500 mb-1" />}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6 relative z-10">
        <div className="col-span-3 space-y-6">
          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl shadow-inner relative">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-6 border-l-4 border-blue-500 pl-2">
              <Users className="w-4 h-4 text-blue-400" /> 岗位结构分布
            </h3>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={educationData} innerRadius={55} outerRadius={75} dataKey="value" stroke="none">
                    {educationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white">2991</span>
                <span className="text-[10px] text-blue-400 uppercase font-bold">总数</span>
              </div>
            </div>
            <div className="space-y-1 mt-4">
              {educationData.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div> {item.name}</span>
                  <span className="text-blue-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
            <h3 className="text-xs font-bold mb-4">业务专长覆盖 (TOP8)</h3>
            <div className="h-44 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={specializedData} innerRadius={45} outerRadius={65} dataKey="value" stroke="none">
                    {specializedData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
              {specializedData.slice(0, 6).map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] font-bold">
                  <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div> {item.name}</span>
                  <span className="text-blue-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
            <h3 className="text-xs font-bold mb-4">核心岗位晋升态势</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={promotionData}>
                  <XAxis dataKey="name" hide />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0b1b36', border: '1px solid #1e40af'}} />
                  <Bar dataKey="total" fill="#1e3a8a" barSize={12} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="up" fill="#22c55e" barSize={12} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col space-y-6">
          <div className="flex-1 bg-gradient-to-b from-[#0b1b36] to-transparent border border-blue-500/10 rounded-2xl relative p-6">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
              <MapIcon className="w-5 h-5 text-blue-500" /> 网格专家地域分布
            </h3>
            <div className="h-80 w-full relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/China_map_blank.svg/1000px-China_map_blank.svg.png')] bg-contain bg-no-repeat bg-center"></div>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" hide domain={[73, 135]} />
                  <YAxis type="number" dataKey="y" hide domain={[18, 54]} />
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                  <Scatter data={geoPoints} fill="#00E5FF">
                    {geoPoints.map((entry, index) => (
                      <Cell key={index} fillOpacity={0.6} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="absolute top-4 right-4 bg-blue-900/40 border border-blue-500/30 p-4 rounded-xl backdrop-blur-md w-48">
                <h4 className="text-[10px] font-bold text-blue-400 mb-2 italic">中心储备排名</h4>
                <div className="space-y-1">
                  {rankingData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[8px] w-12 truncate text-slate-300">{item.name}</span>
                      <div className="flex-1 h-1.5 bg-blue-900/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{width: `${(item.value / 447) * 100}%`}}></div>
                      </div>
                      <span className="text-[8px] text-cyan-300">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-64 bg-[#0b1b36]/40 border border-blue-500/10 p-5 rounded-xl">
             <h3 className="text-xs font-bold text-center mb-6">近5年网格人才梯队趋势</h3>
             <div className="h-44">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={trendData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                   <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                   <Tooltip contentStyle={{backgroundColor: '#0b1b36', border: 'none', borderRadius: '8px'}} />
                   <Legend iconType="circle" wrapperStyle={{fontSize: '9px', bottom: -10}} />
                   <Line type="monotone" dataKey="网格长" stroke={COLORS[0]} strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="网格经理" stroke={COLORS[1]} strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="商客经理" stroke={COLORS[2]} strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="市场营销" stroke={COLORS[3]} strokeWidth={2} dot={false} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-6">
              <PhoneCall className="w-4 h-4 text-blue-400" /> 项目调用分类
            </h3>
            <div className="h-44 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[
                    {name: '统筹级', value: 452},
                    {name: '执行级', value: 457},
                    {name: '应急级', value: 147},
                  ]} innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                    {COLORS.slice(0, 3).map((c, i) => <Cell key={i} fill={c} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-4">
              {[
                {label: '统筹项目', val: 452, col: COLORS[0]},
                {label: '执行项目', val: 457, col: COLORS[1]},
                {label: '应急响应', val: 147, col: COLORS[2]},
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.col}}></div> {item.label}</span>
                  <span className="text-blue-300">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
             <h3 className="text-xs font-bold border-l-4 border-blue-500 pl-2 mb-4">履职积分看板</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/10">
                   <p className="text-[9px] text-blue-400 mb-1">活跃网格长人数</p>
                   <p className="text-lg font-black text-white">1137</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/10">
                   <p className="text-[9px] text-blue-400 mb-1">活跃经理占比</p>
                   <p className="text-lg font-black text-cyan-400">82.7%</p>
                </div>
             </div>
          </div>

          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
             <h3 className="text-[10px] font-bold text-blue-300 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> 卓越网格人才榜 (TOP5)
             </h3>
             <div className="space-y-3">
                {[
                  { name: '温明媚', role: '资深网格长', score: 191.86 },
                  { name: '田国良', role: '优秀经理', score: 164.04 },
                  { name: '胡炜', role: '商客专家', score: 120.12 },
                  { name: '张佳榕', role: '营销尖兵', score: 112.86 },
                  { name: '赵医博', role: '网格统筹', score: 109.33 },
                ].map((user, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-300 font-bold">{user.name} ({user.role})</span>
                      <span className="text-cyan-400 font-bold">{user.score}</span>
                    </div>
                    <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-400" style={{width: `${(user.score / 191.86) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
