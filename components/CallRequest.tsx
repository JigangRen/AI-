
import React, { useState, useMemo } from 'react';
import { 
  Send, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ClipboardList, 
  UserCheck, 
  Star, 
  MessageSquare, 
  ArrowRight,
  Filter,
  MoreVertical,
  Clock,
  Zap
} from 'lucide-react';

// 模拟已有的调用记录数据
const INITIAL_RECORDS = [
  { 
    id: 'REC-001', 
    projectName: '某重点网格效能提升诊断', 
    expertName: '张建立', 
    field: '网格化经营',
    date: '2024-05-10', 
    status: '已完成',
    content: '针对该网格存量客户流失严重问题，实地考察并输出了“三维触点回复”方案。',
    evaluation: '张网格长经验极其老到，一眼就看出了我们管理上的盲区。',
    rating: 5
  },
  { 
    id: 'REC-002', 
    projectName: '数字化看板应用实战培训', 
    expertName: '李瑞雪', 
    field: '业务支撑',
    date: '2024-05-15', 
    status: '支撑中',
    content: '正在进行网格经理层面的自动化工具应用培训。',
    evaluation: '',
    rating: 0
  }
];

const EXPERTS_FOR_MATCHING = [
  { id: '1', name: '张建立', field: '网格化经营', matchRate: 98, tags: ['战略统筹', '网格治理'], avatar: 'https://picsum.photos/100/100?random=11' },
  { id: '2', name: '李瑞雪', field: '业务支撑', matchRate: 92, tags: ['数据挖掘', '执行落地'], avatar: 'https://picsum.photos/100/100?random=12' },
  { id: '3', name: '王振华', field: '客户拓展', matchRate: 85, tags: ['政企关系', '定制方案'], avatar: 'https://picsum.photos/100/100?random=14' },
];

const CallRequest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'request' | 'management'>('request');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [evaluationModal, setEvaluationModal] = useState<{ isOpen: boolean; recordId: string | null }>({ isOpen: false, recordId: null });

  // 1. 发起调用申请视图
  const RequestView = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isSubmitted ? (
        <div className="max-w-2xl mx-auto py-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-xl px-10">
          <div className="w-24 h-24 bg-emerald-100 rounded-[32px] flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">调用申请已提交</h2>
          <p className="text-slate-500 mb-10 leading-relaxed font-medium">
            系统已将您的需求推送给匹配专家 <span className="text-blue-600 font-bold">“张建立”</span>。专家将在2个工作时内完成响应。
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('management')}
              className="px-8 py-4 bg-slate-900 text-white rounded-[24px] font-bold shadow-xl shadow-slate-200 hover:scale-105 transition-transform"
            >
              前往过程管理
            </button>
            <button 
              onClick={() => { setIsSubmitted(false); setSelectedExpert(null); }}
              className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-[24px] font-bold hover:bg-slate-50"
            >
              继续发起申请
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">填写项目支撑信息</h3>
                <p className="text-sm text-slate-400 font-medium">清晰的问题描述能帮助系统更精准地匹配专家</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">项目名称</label>
                  <input 
                    type="text" 
                    placeholder="例如：2024年某网格化管理提升诊断" 
                    className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-50 outline-none transition-all font-bold text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">需求领域</label>
                    <select className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white outline-none font-bold text-slate-800">
                      <option>网格化经营</option>
                      <option>业务支撑</option>
                      <option>客户拓展</option>
                      <option>市场营销</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">紧急程度</label>
                    <select className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white outline-none font-bold text-slate-800">
                      <option>普通支撑 (3个工作日)</option>
                      <option>重要项目 (1个工作日)</option>
                      <option className="text-red-500 font-black">特急/故障响应 (2小时内)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">详细需求描述</label>
                  <textarea 
                    rows={5}
                    placeholder="请详细描述需要专家解决的具体业务痛点或管理难题..."
                    className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-50 outline-none transition-all font-medium text-slate-700 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100/50 flex gap-4">
                <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div className="text-xs text-blue-800/70 leading-relaxed font-medium">
                  <strong className="text-blue-900 block mb-1 font-black">智能匹配说明：</strong>
                  系统将提取您填写的关键词，在“专家人才库”中进行语义搜索，优先匹配同网格或同领域的资深专家。
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <Zap className="text-amber-400 w-6 h-6" /> 智能匹配专家
                </h3>
                
                <div className="space-y-4">
                  {EXPERTS_FOR_MATCHING.map((expert) => (
                    <div 
                      key={expert.id}
                      onClick={() => setSelectedExpert(expert.id)}
                      className={`p-6 rounded-[32px] border transition-all cursor-pointer group relative ${
                        selectedExpert === expert.id 
                          ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-900/40' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img src={expert.avatar} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20" alt={expert.name} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-lg">{expert.name}</h4>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                              selectedExpert === expert.id ? 'bg-white text-blue-600' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              匹配度 {expert.matchRate}%
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors font-medium mt-1">{expert.field} · 专家</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  disabled={!selectedExpert}
                  onClick={() => setIsSubmitted(true)}
                  className={`w-full py-5 rounded-[24px] font-black text-lg mt-8 transition-all flex items-center justify-center gap-3 ${
                    selectedExpert 
                      ? 'bg-white text-blue-600 shadow-2xl shadow-white/10 hover:scale-105 active:scale-95' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-6 h-6" /> 立即发起申请
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ManagementView = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">调用支撑全记录</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">管理、查询与评价所有的专家支撑服务</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索项目或专家..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:border-blue-500"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">项目信息</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">调用专家</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态/日期</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">支撑评价</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {INITIAL_RECORDS.map((rec) => (
              <tr key={rec.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 max-w-md">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 text-base">{rec.projectName}</span>
                    <span className="text-[10px] font-black text-blue-500 uppercase mt-1 tracking-tighter">{rec.field}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <img src={`https://picsum.photos/40/40?seed=${rec.expertName}`} className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm" alt="avatar" />
                    <span className="text-xs font-bold text-slate-700">{rec.expertName}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full w-fit ${
                      rec.status === '已完成' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {rec.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold mt-2">{rec.date}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  {rec.rating > 0 ? (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rec.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium italic line-clamp-1">“{rec.evaluation}”</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setEvaluationModal({ isOpen: true, recordId: rec.id })}
                      className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100"
                    >
                      立即评价
                    </button>
                  )}
                </td>
                <td className="px-8 py-6 text-right">
                   <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 bg-white p-1.5 rounded-[24px] border border-slate-100 shadow-sm">
          <button onClick={() => setActiveTab('request')} className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'request' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:text-slate-600'}`}>发起调用申请</button>
          <button onClick={() => setActiveTab('management')} className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'management' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}>调用过程管理</button>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
           <ClipboardList className="w-5 h-5" />
           <span className="text-[11px] font-black uppercase tracking-[0.2em]">Expert Call Center</span>
        </div>
      </div>
      {activeTab === 'request' ? RequestView() : ManagementView()}
    </div>
  );
};

export default CallRequest;
