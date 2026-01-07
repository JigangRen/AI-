
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

// 1. 人员结构数据
const educationData = [
  { name: '博士研究生', value: 22 },
  { name: '硕士研究生', value: 1460 },
  { name: '研究生同等学历', value: 7 },
  { name: '大学本科', value: 1429 },
  { name: '其他', value: 73 },
];

const specializedData = [
  { name: 'IT运维', value: 2185 },
  { name: '大数据', value: 893 },
  { name: '信息安全', value: 303 },
  { name: '全域', value: 160 },
  { name: '云计算', value: 651 },
  { name: '前沿技术', value: 136 },
  { name: '区块链', value: 102 },
  { name: '人工智能', value: 521 },
];

const promotionData = [
  { name: 'IT运维', total: 679, up: 98, down: 53 },
  { name: 'IT研发', total: 741, up: 120, down: 28 },
  { name: 'IT运营', total: 422, up: 47, down: 15 },
  { name: '信息安全', total: 125, up: 16, down: 6 },
  { name: '中台运营', total: 318, up: 54, down: 11 },
  { name: '架构/数据', total: 503, up: 77, down: 26 },
];

// 2. 趋势数据 (近5年)
const trendData = [
  { year: '2022', 'IT运维': 100, 'IT研发': 80, 'IT运营': 60, '信息安全': 40, '架构/规划': 120 },
  { year: '2023', 'IT运维': 110, 'IT研发': 150, 'IT运营': 90, '信息安全': 80, '架构/规划': 130 },
  { year: '2024', 'IT运维': 180, 'IT研发': 250, 'IT运营': 120, '信息安全': 150, '架构/规划': 220 },
  { year: '2025', 'IT运维': 350, 'IT研发': 450, 'IT运营': 200, '信息安全': 280, '架构/规划': 420 },
  { year: '2026', 'IT运维': 450, 'IT研发': 680, 'IT运营': 300, '信息安全': 420, '架构/规划': 710 },
];

// 3. 调用排行
const rankingData = [
  { name: 'IT公司', value: 447 },
  { name: '中移在线', value: 191 },
  { name: '设计院', value: 121 },
  { name: '浙江', value: 100 },
  { name: '四川', value: 90 },
  { name: '河南', value: 86 },
  { name: '广东', value: 85 },
  { name: '山西', value: 84 },
  { name: '河北', value: 81 },
  { name: '江苏', value: 74 },
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
  const currentTime = "2026年01月06日 09:50:27";

  return (
    <div className="min-h-screen bg-[#061022] text-white p-4 font-sans overflow-x-hidden relative">
      {/* 顶部标题装饰 */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
      
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/20 border border-blue-500/40 rounded-full">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">Global Analysis System</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400">
            中国移动 IT 条线储备卓越工程师分析大屏
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2"></div>
        </div>

        <div className="text-right font-mono text-blue-300 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {currentTime}
        </div>
      </div>

      {/* 核心指标汇总 */}
      <div className="grid grid-cols-4 gap-6 mb-8 relative z-10">
        {[
          { label: 'IT条线储备卓越工程师', value: 2991, up: true },
          { label: '项目总数', value: 1056, up: true },
          { label: '调用专家人才总数', value: 1755, up: true },
          { label: '调用专家人才总人次', value: 9953, up: true },
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

      {/* 主展示区：三栏布局 */}
      <div className="grid grid-cols-12 gap-6 relative z-10">
        
        {/* 左侧：人员结构 & 晋升 */}
        <div className="col-span-3 space-y-6">
          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl shadow-inner relative">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-6 border-l-4 border-blue-500 pl-2">
              <Users className="w-4 h-4 text-blue-400" /> 人员结构情况
            </h3>
            <div className="flex justify-center mb-4">
              <div className="flex bg-blue-900/40 p-1 rounded-md">
                <button className="px-3 py-1 text-[10px] bg-blue-600 rounded text-white font-bold">学历分布</button>
                <button className="px-3 py-1 text-[10px] text-blue-400 font-bold">年龄段</button>
                <button className="px-3 py-1 text-[10px] text-blue-400 font-bold">政治面貌</button>
              </div>
            </div>
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
             <div className="flex justify-center gap-2 mb-6">
               <button className="px-2 py-1 text-[9px] bg-blue-600 rounded text-white">专业领域</button>
               <button className="px-2 py-1 text-[9px] border border-blue-500/30 rounded text-blue-400">专业方向</button>
               <button className="px-2 py-1 text-[9px] border border-blue-500/30 rounded text-blue-400">专家级别</button>
             </div>
             <div className="h-44 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={specializedData} innerRadius={45} outerRadius={65} dataKey="value" stroke="none">
                    {specializedData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-white">4951</span>
                <span className="text-[8px] text-blue-400">总数</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
              {specializedData.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] font-bold">
                  <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div> {item.name}</span>
                  <span className="text-blue-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
            <h3 className="text-xs font-bold mb-4 flex justify-between">
              <span>各专业方向晋升概况</span>
              <span className="text-blue-400 cursor-pointer">出库率</span>
            </h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={promotionData}>
                  <XAxis dataKey="name" hide />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0b1b36', border: '1px solid #1e40af'}} />
                  <Bar dataKey="total" fill="#1e3a8a" barSize={12} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="up" fill="#22c55e" barSize={12} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="down" fill="#ef4444" barSize={12} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 中间：地图 & 趋势线 */}
        <div className="col-span-6 flex flex-col space-y-6">
          <div className="flex-1 bg-gradient-to-b from-[#0b1b36] to-transparent border border-blue-500/10 rounded-2xl relative p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-blue-500" /> 人员分布情况
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-[10px] bg-blue-600 rounded text-white font-bold">省公司</button>
                <button className="px-3 py-1 text-[10px] border border-blue-500/30 text-blue-400 font-bold rounded">专直单位</button>
              </div>
            </div>

            {/* 模拟地图层 */}
            <div className="h-80 w-full relative">
              {/* 中国地图背景模拟 (简化版) */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/China_map_blank.svg/1000px-China_map_blank.svg.png')] bg-contain bg-no-repeat bg-center"></div>
              
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" hide domain={[73, 135]} />
                  <YAxis type="number" dataKey="y" hide domain={[18, 54]} />
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={geoPoints} fill="#00E5FF">
                    {geoPoints.map((entry, index) => (
                      <Cell key={index} fillOpacity={0.6} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>

              {/* TOP 10 悬浮条形图 (对齐参考图) */}
              <div className="absolute top-4 right-4 bg-blue-900/40 border border-blue-500/30 p-4 rounded-xl backdrop-blur-md w-48">
                <h4 className="text-[10px] font-bold text-blue-400 mb-2 italic">TOP 10 / 专家人才选拔</h4>
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
            <div className="text-[10px] text-blue-400/60 mt-2 italic">注：排名前六城市定位</div>
          </div>

          <div className="h-64 bg-[#0b1b36]/40 border border-blue-500/10 p-5 rounded-xl">
             <h3 className="text-xs font-bold text-center mb-6">近5年专家人才趋势图</h3>
             <div className="h-44">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={trendData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                   <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                   <Tooltip contentStyle={{backgroundColor: '#0b1b36', border: 'none', borderRadius: '8px'}} />
                   <Legend iconType="circle" wrapperStyle={{fontSize: '9px', bottom: -10}} />
                   <Line type="monotone" dataKey="IT运维" stroke={COLORS[0]} strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="IT研发" stroke={COLORS[1]} strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="IT运营" stroke={COLORS[2]} strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="信息安全" stroke={COLORS[3]} strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="架构/规划" stroke={COLORS[4]} strokeWidth={2} dot={false} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* 右侧：调用情况 & 积分排行 */}
        <div className="col-span-3 space-y-6">
          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-6">
              <PhoneCall className="w-4 h-4 text-blue-400" /> 调用情况
            </h3>
            <div className="flex flex-wrap gap-1 mb-6">
              {['项目级别', '项目类型', '专业方向', '类型分布'].map(btn => (
                <button key={btn} className="px-2 py-1 text-[8px] border border-blue-500/30 rounded text-blue-400">{btn}</button>
              ))}
            </div>
            <div className="h-44 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[
                    {name: '集团级', value: 452},
                    {name: '公司级', value: 457},
                    {name: '国家级', value: 2},
                    {name: '不分级', value: 145},
                  ]} innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                    {COLORS.slice(0, 4).map((c, i) => <Cell key={i} fill={c} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold">1056</span>
                <span className="text-[8px] text-blue-400">总数</span>
              </div>
            </div>
            <div className="space-y-1 mt-4">
              {[
                {label: '集团级', val: 452, col: COLORS[0]},
                {label: '公司级', val: 457, col: COLORS[1]},
                {label: '国家级', val: 2, col: COLORS[2]},
                {label: '不分级', val: 145, col: COLORS[3]},
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.col}}></div> {item.label}</span>
                  <span className="text-blue-300">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xs font-bold border-l-4 border-blue-500 pl-2">调用积分概括</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/10">
                   <p className="text-[9px] text-blue-400 mb-1">获得调用积分人数</p>
                   <p className="text-lg font-black text-white">1137</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/10">
                   <p className="text-[9px] text-blue-400 mb-1">调用积分均值</p>
                   <p className="text-lg font-black text-cyan-400">12.79</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/10">
                   <p className="text-[9px] text-blue-400 mb-1">调用积分中位数</p>
                   <p className="text-lg font-black text-cyan-400">7.4</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/10">
                   <p className="text-[9px] text-blue-400 mb-1">高于均值人数</p>
                   <p className="text-lg font-black text-white">354</p>
                </div>
             </div>
          </div>

          <div className="bg-[#0b1b36] border border-blue-500/20 p-5 rounded-xl">
             <h3 className="text-[10px] font-bold text-blue-300 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> 调用总积分个人排行榜 <span className="text-amber-500 text-[8px] font-black italic">TOP5</span>
             </h3>
             <div className="space-y-3">
                {[
                  { name: '温明媚', score: 191.86 },
                  { name: '田国良', score: 164.04 },
                  { name: '胡炜', score: 120.12 },
                  { name: '张佳榕', score: 112.86 },
                  { name: '赵医博', score: 109.33 },
                ].map((user, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-300 font-bold">TOP{i+1} {user.name}</span>
                      <span className="text-cyan-400 font-bold">{user.score}</span>
                    </div>
                    <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden relative">
                       <div className="h-full bg-cyan-400" style={{width: `${(user.score / 191.86) * 100}%`}}></div>
                       <div className="absolute top-0 right-0 h-full w-2 bg-white/20 blur-sm"></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>

      {/* 底部悬浮信息 (右下角装饰) */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none opacity-40">
        <img src="https://picsum.photos/100/100?random=1000" className="w-20 h-20 rounded-full border-4 border-blue-500/30 grayscale" alt="decoration" />
      </div>
    </div>
  );
};

export default ExpertDashboard;
