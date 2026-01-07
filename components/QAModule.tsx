
import React, { useState, useMemo } from 'react';
import { 
  MessageCircle, 
  ThumbsUp, 
  Star, 
  Bookmark, 
  Share2, 
  Search, 
  Filter, 
  User, 
  Tag, 
  ChevronRight, 
  X, 
  Send, 
  CheckCircle2, 
  Award, 
  TrendingUp,
  Flame,
  Lightbulb
} from 'lucide-react';

interface Reply {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

interface Question {
  id: string;
  title: string;
  author: string;
  date: string;
  replies: number;
  category: string;
  targetExpert?: string;
  isHot: boolean;
  isHighQuality: boolean; // 管理员标记
  content: string;
  likes: number;
  bookmarks: number;
  tags: string[];
  replyList?: Reply[];
}

const INITIAL_QUESTIONS: Question[] = [
  { 
    id: '1', 
    title: '关于Kubernetes多租户网络隔离的最佳实践是什么？', 
    content: '在省分核心网迁云过程中，如何确保不同网格业务在同一套K8s集群下的网络强隔离？目前测试了Calico的Policy，想听听专家的深入建议。',
    author: '网格员-小李', 
    date: '1小时前', 
    replies: 12, 
    category: '技术类', 
    isHot: true, 
    isHighQuality: true, 
    likes: 45, 
    bookmarks: 12,
    tags: ['K8s', '网络安全', 'Calico'],
    targetExpert: '张建立',
    replyList: [
      { id: 'rep1', author: '张建立', avatar: 'https://picsum.photos/40/40?random=11', date: '30分钟前', content: 'Calico NetworkPolicy 是基础，建议配合 Hierarchical Namespace Controller (HNC) 进行资源隔离。同时，在核心业务区，建议开启 Egress Gateway 进行出站流量审计。', likes: 28 }
    ]
  },
  { 
    id: '2', 
    title: '在大规模数据迁移过程中如何保证零宕机？', 
    content: '业务要求RTO接近于0，迁移涉及数据量约50TB，目前考虑的是双写方案，是否有更优的增量同步策略？',
    author: '研发部-老周', 
    date: '3小时前', 
    replies: 8, 
    category: '运维类', 
    isHot: false, 
    isHighQuality: false, 
    likes: 22, 
    bookmarks: 5,
    tags: ['数据迁移', '高可用'],
    targetExpert: '张建立'
  },
  { 
    id: '3', 
    title: '2024年数字化转型项目的核心考核指标有哪些建议？', 
    content: '希望能从业务价值和技术成熟度两个维度给出量化的评估模版。',
    author: '管理部-陈芳', 
    date: '昨天', 
    replies: 24, 
    category: '管理类', 
    isHot: true, 
    isHighQuality: true, 
    likes: 89, 
    bookmarks: 34,
    tags: ['IT管理', 'KPI'],
    targetExpert: '王振华'
  }
];

const EXPERTS_LIST = ['张建立', '李瑞雪', '王振华', '陈芳', '周杰明'];

const QAModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'my'>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部问题');
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.title.includes(searchTerm) || q.content.includes(searchTerm);
      const matchesCategory = selectedCategory === '全部问题' || q.category === selectedCategory;
      const matchesTab = activeTab === 'all' ? true : (activeTab === 'featured' ? q.isHighQuality : q.author === '网格员-我');
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchTerm, selectedCategory, activeTab, questions]);

  const featuredQuestions = useMemo(() => questions.filter(q => q.isHighQuality), [questions]);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟提交
    setShowSubmitModal(false);
    alert('问题已提交至专家库！');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 顶部标题与操作 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">专家问答中心</h1>
          <p className="text-slate-500 mt-1 font-medium">通过交流沉淀智慧，每一个业务痛点都是创新的起点</p>
        </div>
        <button 
          onClick={() => setShowSubmitModal(true)}
          className="px-8 py-4 bg-blue-600 text-white font-black rounded-[24px] shadow-xl shadow-blue-100 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" /> 我要向专家提问
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧：分类与精选列表 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4" /> 知识分类
            </h3>
            <div className="space-y-2">
              {['全部问题', '技术类', '业务咨询', '管理类', '运维类'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all flex justify-between items-center ${
                    selectedCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <Award className="w-5 h-5 text-amber-400" /> 管理员精选问答
            </h3>
            <div className="space-y-6 relative z-10">
              {featuredQuestions.slice(0, 3).map(q => (
                <div 
                  key={q.id} 
                  className="group cursor-pointer border-b border-white/10 pb-4 last:border-0"
                  onClick={() => setViewingQuestion(q)}
                >
                  <h4 className="text-sm font-bold text-slate-200 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {q.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{q.author}</span>
                    <span className="flex items-center gap-1 text-[10px] text-blue-400 font-bold">
                      <TrendingUp className="w-3 h-3" /> 深度好评
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <Lightbulb className="w-48 h-48" />
            </div>
          </div>
        </div>

        {/* 右侧：主列表 */}
        <div className="lg:col-span-9 space-y-6">
          {/* 搜索与切换 */}
          <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="搜索标题、内容、标签或专家..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="flex p-1 bg-slate-50 rounded-2xl gap-1">
              {[
                { id: 'all', label: '全部问答', icon: MessageCircle },
                { id: 'featured', label: '精选辑录', icon: Star },
                { id: 'my', label: '我的提问', icon: User }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 问答列表记录 */}
          <div className="space-y-4">
            {filteredQuestions.map(q => (
              <div 
                key={q.id} 
                className="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-blue-500 hover:shadow-2xl hover:-translate-y-1 transition-all group cursor-pointer"
                onClick={() => setViewingQuestion(q)}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {q.isHighQuality && (
                    <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                      <Award className="w-3 h-3" /> 官方精选
                    </span>
                  )}
                  {q.isHot && (
                    <span className="bg-red-100 text-red-600 text-[10px] font-black px-2.5 py-1 rounded-lg border border-red-200 flex items-center gap-1">
                      <Flame className="w-3 h-3" /> 热度
                    </span>
                  )}
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tight">
                    {q.category}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                  {q.title}
                </h3>
                
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                  {q.content}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {q.author}</span>
                    <span>{q.date}</span>
                    <span className="text-blue-500 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" /> {q.replies} 个回答
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button className="p-2.5 hover:bg-blue-50 text-slate-300 hover:text-blue-500 rounded-2xl transition-all flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4" /> <span className="text-xs font-bold">{q.likes}</span>
                    </button>
                    <button className="p-2.5 hover:bg-amber-50 text-slate-300 hover:text-amber-500 rounded-2xl transition-all flex items-center gap-1.5">
                      <Bookmark className="w-4 h-4" /> <span className="text-xs font-bold">{q.bookmarks}</span>
                    </button>
                    <button className="p-2.5 hover:bg-slate-100 text-slate-300 hover:text-slate-600 rounded-2xl transition-all">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 提交问题弹窗 (指定专家/领域) */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-2xl rounded-[48px] p-10 shadow-2xl animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">发起专家问答</h2>
                <p className="text-sm text-slate-400 font-medium">精准的提问能更高效地获得专家反馈</p>
              </div>
              <button onClick={() => setShowSubmitModal(false)} className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">问题标题</label>
                <input 
                  required
                  type="text" 
                  placeholder="清晰、简洁地概括您的问题..."
                  className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">专业领域</label>
                  <select className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white outline-none font-bold text-slate-800">
                    <option>云计算 / 云原生</option>
                    <option>人工智能 / 算法</option>
                    <option>数字化转型</option>
                    <option>网络安全</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">指定专家 (可选)</label>
                  <select className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white outline-none font-bold text-slate-800">
                    <option value="">不指定 (系统自动匹配)</option>
                    {EXPERTS_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">详情描述</label>
                <textarea 
                  rows={4}
                  placeholder="提供背景信息、环境配置、已尝试的解决方法等..."
                  className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white outline-none font-medium text-slate-700 resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700">
                  <Send className="w-5 h-5" /> 提交问答申请
                </button>
                <button 
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-10 py-5 bg-slate-100 text-slate-400 font-bold rounded-3xl hover:bg-slate-200"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 问答记录详情浮窗 (问答记录功能) */}
      {viewingQuestion && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-3xl rounded-t-[48px] md:rounded-[48px] p-8 md:p-10 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                    {viewingQuestion.category}
                  </span>
                  {viewingQuestion.isHighQuality && <span className="bg-amber-100 text-amber-600 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">精品问答</span>}
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{viewingQuestion.title}</h2>
              </div>
              <button onClick={() => setViewingQuestion(null)} className="p-2 bg-slate-50 rounded-full">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <img src="https://picsum.photos/40/40?random=5" className="w-10 h-10 rounded-2xl object-cover" alt="avatar" />
                  <div>
                    <p className="text-sm font-black text-slate-800">{viewingQuestion.author}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{viewingQuestion.date} 提问</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {viewingQuestion.content}
                </p>
                <div className="flex gap-2 mt-6">
                  {viewingQuestion.tags.map(t => (
                    <span key={t} className="text-[9px] font-black text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded-lg">#{t}</span>
                  ))}
                </div>
              </div>

              {/* 回复记录列表 */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
                  专家及同仁回复 ({viewingQuestion.replies})
                </h3>
                
                {viewingQuestion.replyList?.map(rep => (
                   <div key={rep.id} className="relative pl-12">
                      <div className="absolute left-0 top-0">
                         <img src={rep.avatar} className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm" alt="avatar" />
                      </div>
                      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                         <div className="flex justify-between items-center mb-4">
                            <p className="text-sm font-black text-slate-800 flex items-center gap-2">
                               {rep.author} <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded font-black uppercase">Expert</span>
                            </p>
                            <span className="text-[10px] text-slate-400 font-bold">{rep.date}</span>
                         </div>
                         <p className="text-sm text-slate-600 leading-relaxed">{rep.content}</p>
                         <div className="mt-4 flex gap-4">
                            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors">
                               <ThumbsUp className="w-4 h-4" /> {rep.likes}
                            </button>
                         </div>
                      </div>
                   </div>
                ))}
              </div>

              {/* 我的回复框 */}
              <div className="relative pt-8">
                 <textarea 
                   placeholder="我有更好的见解，参与讨论..."
                   className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] outline-none focus:bg-white focus:border-blue-500 transition-all text-sm font-medium h-24"
                 ></textarea>
                 <button className="absolute right-4 bottom-4 p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors shadow-lg">
                    <Send className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QAModule;
