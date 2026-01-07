
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Award, 
  ArrowLeft, 
  MapPin, 
  Tag as TagIcon, 
  Briefcase, 
  Star, 
  MessageSquare, 
  Globe, 
  PlayCircle, 
  Video, 
  FileText, 
  Lightbulb, 
  Zap, 
  Users as UsersIcon, 
  TrendingUp, 
  Radar 
} from 'lucide-react';
import { 
  Radar as ReRadar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface SupportRecord {
  id: string;
  projectName: string;
  date: string;
  content: string;
  evaluation: string;
  rating: number;
}

interface Capability {
  subject: string;
  value: number;
  fullMark: number;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface Expert {
  id: string;
  name: string;
  title: string;
  field: string;
  grid: string;
  tags: string[];
  avatar: string;
  score: number;
  org: string;
  bio: string;
  responseRate: number;
  capabilities: Capability[];
  growthTimeline: TimelineEvent[];
  highlights: string[];
  media: { type: 'video' | 'image'; title: string; url: string; cover: string }[];
  methods: { title: string; summary: string }[];
  supportRecords: SupportRecord[];
}

const EXPERTS_DATA: Expert[] = [
  { 
    id: '1', 
    name: '张建立', 
    title: '资深网格长 / 运营指挥官', 
    field: '网格化经营', 
    grid: '华北网格',
    tags: ['战略统筹', '网格治理', '资源协调'],
    avatar: 'https://picsum.photos/400/400?random=101', 
    score: 980, 
    org: '网格运营支撑部',
    bio: '张建立专家拥有超过15年的基层一线网格管理与统筹经验。作为首批网格化经营模式的探索者，他主导制定的“三位一体”网格治理模型已被广泛推广，擅长复杂网格环境下的资源博弈与战略闭环落地。',
    responseRate: 98.5,
    capabilities: [
      { subject: '管理跨度', value: 98, fullMark: 100 },
      { subject: '策略制定', value: 95, fullMark: 100 },
      { subject: '资源整合', value: 92, fullMark: 100 },
      { subject: '危机处理', value: 90, fullMark: 100 },
      { subject: '业务洞察', value: 88, fullMark: 100 },
      { subject: '团队激励', value: 96, fullMark: 100 },
    ],
    growthTimeline: [
      { year: '2024', title: '获评“全国卓越网格长”', description: '表彰在华北网格数字化转型中的卓越领导力。' },
      { year: '2022', title: '主导网格智慧看板上线', description: '实现了全区网格经营指标的分钟级监控。' },
      { year: '2019', title: '网格化2.0模式先行者', description: '率先在管辖区推行“动态网格”管理机制。' },
    ],
    highlights: [
      '管辖网格年度业绩达成率连续5年保持110%以上。',
      '主导编制《网格化经营标准化作业手册》，成为行业范本。',
      '成功处理特大突发服务纠纷，获得“客户服务金盾奖”。'
    ],
    media: [
      { type: 'video', title: '网格长视角：如何打造高凝聚力单元', url: '#', cover: 'https://picsum.photos/300/200?random=201' },
      { type: 'video', title: '实战纪实：华北网格攻坚战', url: '#', cover: 'https://picsum.photos/300/200?random=202' }
    ],
    methods: [
      { title: '《网格长在数字化转型中的角色错位与修正》', summary: '探讨管理职能如何从单一指挥向赋能型转变。' },
      { title: '《末梢渠道的精细化运营地图》', summary: '手把手教你如何绘制网格价值热力图。' }
    ],
    supportRecords: [
      { id: 'r1', projectName: '某省网格化标准化建设', date: '2024-03-12', content: '指导该省网格长核心能力素质模型构建。', evaluation: '实战性极强，解决了我们管理动作变形的问题。', rating: 5 },
    ]
  },
  { 
    id: '2', 
    name: '李瑞雪', 
    title: '网格经理 / 数字化执行官', 
    field: '业务支撑', 
    grid: '华东网格',
    tags: ['数据挖掘', '流程优化', '执行落地'],
    avatar: 'https://picsum.photos/400/400?random=102', 
    score: 965, 
    org: '业务运营室',
    bio: '李瑞雪专家专注于网格经营数据的深度挖掘 with 分析。她擅长利用数字化工具对网格业绩进行“体检”，通过流程再造解决一线网格经理在业务流中的卡点，是典型的“数智化”执行专家。',
    responseRate: 99.2,
    capabilities: [
      { subject: '数据分析', value: 98, fullMark: 100 },
      { subject: '执行效率', value: 95, fullMark: 100 },
      { subject: '流程优化', value: 92, fullMark: 100 },
      { subject: '工具应用', value: 90, fullMark: 100 },
      { subject: '需求拆解', value: 85, fullMark: 100 },
      { subject: '细致程度', value: 94, fullMark: 100 },
    ],
    growthTimeline: [
      { year: '2024', title: '上线“秒级支撑”系统', description: '网格经理响应时延缩短了60%。' },
      { year: '2022', title: '获评“数字化转型标兵”', description: '在集团内部推广其自研的网格经营分析脚本。' },
    ],
    highlights: [
      '自主研发“网格智眼”数据看板，覆盖全省3000余名网格经理。',
      '通过流程重构，将网格开户平均时长由15分钟降至3分钟。'
    ],
    media: [
      { type: 'video', title: '网格经理的数据化生存指南', url: '#', cover: 'https://picsum.photos/300/200?random=203' }
    ],
    methods: [
      { title: '《数据驱动的网格精细化管理策略》', summary: '从0到1教你建立网格业绩预测模型。' }
    ],
    supportRecords: [
      { id: 'r3', projectName: '全省网格看板优化工程', date: '2024-02-20', content: '核心指标逻辑重构与UI交互设计指导。', evaluation: '工具极其好用，一线反馈极佳。', rating: 5 }
    ]
  },
  { 
    id: '3', 
    name: '王振华', 
    title: '商客经理 / 首席客户官', 
    field: '客户拓展', 
    grid: '华南网格',
    tags: ['政企关系', '定制方案', '服务营销'],
    avatar: 'https://picsum.photos/400/400?random=103', 
    score: 958, 
    org: '商客经营中心',
    bio: '王振华在商客领域深耕多年，具备极其敏锐的政企客户洞察力。他擅长为不同行业的网格商户提供“一户一案”的定制化解决方案，在维护存量客户关系的同时，具备极强的“以老带新”裂变能力。',
    responseRate: 97.8,
    capabilities: [
      { subject: '客户洞察', value: 96, fullMark: 100 },
      { subject: '方案宣贯', value: 93, fullMark: 100 },
      { subject: '谈判技巧', value: 95, fullMark: 100 },
      { subject: '关系维护', value: 98, fullMark: 100 },
      { subject: '抗压能力', value: 85, fullMark: 100 },
      { subject: '资源调配', value: 88, fullMark: 100 },
    ],
    growthTimeline: [
      { year: '2023', title: '主导某大型智慧园区项目', description: '合同金额突破亿元大关。' },
      { year: '2021', title: '服务满意度连续三年TOP1', description: '获得“全省商客服务之星”称号。' },
    ],
    highlights: [
      '累计签单大中型园区专线项目50余个。',
      '独创“商客服务三循环”理论，客户流失率保持在1%以内。'
    ],
    // Fix: Added missing media property to satisfy Expert interface
    media: [
      { type: 'video', title: '商客服务三循环实战演示', url: '#', cover: 'https://picsum.photos/300/200?random=204' }
    ],
    methods: [
      { title: '《商客关系维护的“度”与“术”》', summary: '如何在高压环境下保持健康的客群关系。' }
    ],
    supportRecords: [
      { id: 'r4', projectName: '某新兴产业园招商支撑', date: '2024-04-05', content: '提供全业务融合接入方案建议。', evaluation: '方案非常专业，顺利拿下了核心标段。', rating: 5 }
    ]
  },
  { 
    id: '4', 
    name: '陈芳', 
    title: '市场营销专员 / 增长极专家', 
    field: '市场营销', 
    grid: '西南网格',
    tags: ['存量运营', '裂变传播', '活动策划'],
    avatar: 'https://picsum.photos/400/400?random=104', 
    score: 952, 
    org: '市场营销部',
    bio: '陈芳是资深的市场营销实战派，精通各种互联网营销工具。她擅长针对网格内的存量客户进行“画像式”精准营销，多次策划出刷爆朋友圈的爆款营销活动，是网格业绩增长的“流量密码”。',
    responseRate: 98.0,
    capabilities: [
      { subject: '创意策划', value: 97, fullMark: 100 },
      { subject: '内容营销', value: 94, fullMark: 100 },
      { subject: '活动执行', value: 90, fullMark: 100 },
      { subject: '转化追踪', value: 92, fullMark: 100 },
      { subject: '跨界合作', value: 88, fullMark: 100 },
      { subject: '社群运营', value: 95, fullMark: 100 },
    ],
    growthTimeline: [
      { year: '2024', title: '策划“网格嘉年华”活动', description: '实现单月获客环比增长300%。' },
      { year: '2022', title: '获评“年度创新营销奖”', description: '其短视频引流方案在全网格推广。' },
    ],
    highlights: [
      '主导策划的“邻里合伙人”计划，实现10万人次的老拉新转化。',
      '个人原创营销软文单篇阅读量突破50万。'
    ],
    // Fix: Added missing media property to satisfy Expert interface
    media: [
      { type: 'video', title: '爆款营销活动背后的逻辑', url: '#', cover: 'https://picsum.photos/300/200?random=205' }
    ],
    methods: [
      { title: '《低成本下网格社群的高频互动秘籍》', summary: '不花钱也能做活社群的实战案例。' }
    ],
    supportRecords: [
      { id: 'r5', projectName: '某网格五一大型促销', date: '2024-05-01', content: '活动引流路径规划与话术提炼。', evaluation: '现场气氛火爆，转化率远超预期。', rating: 5 }
    ]
  }
];

const ExpertDirectory: React.FC = () => {
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('全部领域');
  const [filterGrid, setFilterGrid] = useState('全部网格');

  const selectedExpert = useMemo(() => 
    EXPERTS_DATA.find(e => e.id === selectedExpertId), 
    [selectedExpertId]
  );

  const relatedExperts = useMemo(() => 
    EXPERTS_DATA.filter(e => e.id !== selectedExpertId).slice(0, 3), 
    [selectedExpertId]
  );

  const filteredExperts = useMemo(() => {
    return EXPERTS_DATA.filter(expert => {
      const matchesSearch = expert.name.includes(searchTerm) || 
                           expert.title.includes(searchTerm) || 
                           expert.tags.some(t => t.includes(searchTerm));
      const matchesField = filterField === '全部领域' || expert.field === filterField;
      const matchesGrid = filterGrid === '全部网格' || expert.grid === filterGrid;
      return matchesSearch && matchesField && matchesGrid;
    });
  }, [searchTerm, filterField, filterGrid]);

  if (selectedExpert) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setSelectedExpertId(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <div className="p-2 rounded-xl group-hover:bg-blue-50 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold">返回专家大厅</span>
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm">
              分享名片
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              立即预约支撑
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm text-center">
              <div className="relative inline-block mb-6">
                <img 
                  src={selectedExpert.avatar} 
                  className="w-40 h-40 rounded-[48px] object-cover shadow-2xl border-4 border-white ring-1 ring-slate-100" 
                  alt={selectedExpert.name} 
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2.5 rounded-2xl border-4 border-white shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">{selectedExpert.name}</h2>
              <p className="text-blue-600 font-bold mt-2 text-lg">{selectedExpert.title}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {selectedExpert.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-xs rounded-full font-bold border border-slate-100">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">覆盖网格</p>
                  <p className="text-sm font-bold text-slate-700">{selectedExpert.grid}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">响应率</p>
                  <p className="text-lg font-bold text-emerald-500">{selectedExpert.responseRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Radar className="w-5 h-5 text-indigo-500" /> 专业能力矩阵
              </h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedExpert.capabilities}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                    <ReRadar name={selectedExpert.name} dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-blue-500" /> 相关专家推荐
              </h3>
              <div className="space-y-4">
                {relatedExperts.map(expert => (
                  <div key={expert.id} onClick={() => setSelectedExpertId(expert.id)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <img src={expert.avatar} className="w-12 h-12 rounded-xl object-cover" alt={expert.name} />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{expert.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{expert.title}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">专家风采与履职评价</h3>
                  <p className="text-slate-500 mt-1">深耕专业领域，以经验赋能网格成长</p>
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-lg shadow-blue-100">
                  TOP CONTRIBUTOR
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg mb-8 italic border-l-4 border-blue-500 pl-6">
                  “ {selectedExpert.bio} ”
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> 核心业务亮点
                  </h4>
                  <ul className="space-y-3">
                    {selectedExpert.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" /> 支撑概况
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">累计支撑项目</span>
                      <span className="text-base font-bold text-slate-800">128 个</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">支撑好评率</span>
                      <span className="text-base font-bold text-emerald-600">99.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">成果库贡献</span>
                      <span className="text-base font-bold text-blue-600">32 份</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-10 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-500" /> 个人成长轨迹
              </h3>
              <div className="relative space-y-12 before:absolute before:inset-0 before:left-[11px] before:border-l-2 before:border-slate-100 pb-4">
                {selectedExpert.growthTimeline.map((event, idx) => (
                  <div key={idx} className="relative pl-12 group">
                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-all ${
                      idx === 0 ? 'bg-blue-600 scale-125' : 'bg-slate-200'
                    }`}>
                      {idx === 0 && <Star className="w-3 h-3 text-white fill-white" />}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                      <span className="text-lg font-black text-slate-300 group-hover:text-blue-500 transition-colors w-16">{event.year}</span>
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group-hover:bg-white group-hover:shadow-xl transition-all flex-1">
                        <h4 className="font-bold text-slate-800">{event.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-amber-400" /> 实战经验与方法总结
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedExpert.methods.map((method, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all group cursor-pointer">
                      <FileText className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-lg mb-2">{method.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{method.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5">
                <Briefcase className="w-64 h-64" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">专家风采展示</h2>
          <p className="text-slate-500 mt-1 font-medium italic">汇聚一线实战专家，驱动网格业务高质量发展</p>
        </div>
        <div className="flex flex-1 w-full max-w-2xl gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="搜索专家姓名、职位、网格关键词..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] focus:ring-8 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all shadow-sm text-sm font-medium"
            />
          </div>
          <button className="px-6 py-4 bg-slate-900 text-white rounded-[24px] font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] w-24">专业领域</div>
          <div className="flex flex-wrap gap-2">
            {['全部领域', '网格化经营', '业务支撑', '客户拓展', '市场营销'].map(field => (
              <button 
                key={field}
                onClick={() => setFilterField(field)}
                className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  filterField === field ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] w-24">覆盖网格</div>
          <div className="flex flex-wrap gap-2">
            {['全部网格', '华北网格', '华东网格', '华南网格', '华中网格', '西南网格'].map(grid => (
              <button 
                key={grid}
                onClick={() => setFilterGrid(grid)}
                className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  filterGrid === grid ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                }`}
              >
                {grid}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredExperts.map(expert => (
          <div 
            key={expert.id}
            onClick={() => setSelectedExpertId(expert.id)}
            className="bg-white rounded-[40px] p-6 border border-slate-100 hover:shadow-2xl hover:-translate-y-3 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="relative mb-6">
                <img src={expert.avatar} className="w-full h-56 rounded-[32px] object-cover shadow-lg" alt={expert.name} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-1.5 border border-white/50 shadow-sm">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-black text-slate-800">{expert.score}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                  {expert.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-slate-900/70 backdrop-blur-md text-white px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border border-white/10">
                     {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{expert.name}</h3>
                  <div className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg border border-blue-100 uppercase">
                    {expert.field}
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-bold tracking-tight">{expert.title}</p>
                <div className="flex items-center gap-2 pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{expert.grid}</span>
                  </div>
                  <div className="flex-1"></div>
                  <button className="text-blue-600 font-black text-[10px] flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase">
                    查看详情 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertDirectory;
