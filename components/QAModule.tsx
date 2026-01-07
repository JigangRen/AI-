
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
  isHighQuality: boolean;
  content: string;
  likes: number;
  bookmarks: number;
  tags: string[];
  replyList?: Reply[];
}

const INITIAL_QUESTIONS: Question[] = [
  { 
    id: '1', 
    title: '针对新建楼宇，网格长该如何统筹三家运营商的进场协调？', 
    content: '在新建智慧园区项目中，物业要求收取出场费，目前网格内的协调资源有限，想听听资深网格长如何处理这种资源博弈。',
    author: '网格经理-小李', 
    date: '1小时前', 
    replies: 12, 
    category: '网格统筹', 
    isHot: true, 
    isHighQuality: true, 
    likes: 45, 
    bookmarks: 12,
    tags: ['资源博弈', '楼宇攻坚', '网格协调'],
    targetExpert: '张建立',
    replyList: [
      { id: 'rep1', author: '张建立', avatar: 'https://picsum.photos/40/40?random=11', date: '30分钟前', content: '网格长的核心在于“借力”。建议联合当地街道办通过智慧城市共建的名义进入，而非单一的商业洽谈。', likes: 28 }
    ]
  },
  { 
    id: '2', 
    title: '商客经理在面对千万级单体大客户时，如何进行利益关系建模？', 
    content: '正在跟进一家大型制造企业的全业务入网，对方核心关注点在运维响应速度，我们的“一户一案”该如何突出这个差异化优势？',
    author: '商客经理-老周', 
    date: '3小时前', 
    replies: 8, 
    category: '客户拓展', 
    isHot: false, 
    isHighQuality: true, 
    likes: 22, 
    bookmarks: 5,
    tags: ['大客户公关', '差异化服务'],
    targetExpert: '王振华'
  },
  { 
    id: '3', 
    title: '市场营销专员如何利用网格存量用户进行高效的“邻里合伙人”裂变？', 
    content: '希望能从活动规则设计和话术转化两个维度给出可复制的模板。',
    author: '营销专员-陈芳', 
    date: '昨天', 
    replies: 24, 
    category: '市场营销', 
    isHot: true, 
    isHighQuality: true, 
    likes: 89, 
    bookmarks: 34,
    tags: ['存量裂变', '社群营销'],
    targetExpert: '陈芳专家'
  }
];

const EXPERTS_LIST = ['张建立 (网格长)', '李瑞雪 (网格经理)', '王振华 (商客经理)', '陈芳 (营销专员)', '周杰明 (统筹专家)'];

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
      const matchesTab = activeTab === 'all' ? true : (activeTab === 'featured' ? q.isHighQuality : q.author.includes('网格员'));
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchTerm, selectedCategory, activeTab, questions]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">网格业务实战问答</h1>
          <p className="text-slate-500 mt-1 font-medium italic">汇聚四类岗位智慧，解决网格一线的真实疑难</p>
        </div>
        <button 
          onClick={() => setShowSubmitModal(true)}
          className="px-8 py-4 bg-blue-600 text-white font-black rounded-[24px] shadow-xl shadow-blue-100 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" /> 发起实战提问
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4" /> 岗位分类筛选
            </h3>
            <div className="space-y-2">
              {['全部问题', '网格统筹', '客户拓展', '市场营销', '经理实务'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all flex justify-between items-center ${
                    selectedCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <Award className="w-5 h-5 text-amber-400" /> 管理员精选案例
            </h3>
            <div className="space-y-6 relative z-10">
              {questions.filter(q => q.isHighQuality).slice(0, 3).map(q => (
                <div key={q.id} className="group cursor-pointer border-b border-white/10 pb-4 last:border-0" onClick={() => setViewingQuestion(q)}>
                  <h4 className="text-sm font-bold text-slate-200 line-clamp-2 group-hover:text-blue-400">{q.title}</h4>
                  <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
                    <span>{q.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="text" placeholder="搜索实战案例、岗位技能或专家回答..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none text-sm font-medium" />
            </div>
            <div className="flex p-1 bg-slate-50 rounded-2xl gap-1">
              {[{ id: 'all', label: '全部问答' }, { id: 'featured', label: '精选辑录' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map(q => (
              <div key={q.id} className="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all group cursor-pointer" onClick={() => setViewingQuestion(q)}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {q.isHighQuality && <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-2.5 py-1 rounded-lg">精品案例</span>}
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">{q.category}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 mb-4">{q.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">{q.content}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span>{q.author}</span>
                    <span>{q.date}</span>
                    <span className="text-blue-500">{q.replies} 个回答</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2.5 hover:bg-blue-50 text-slate-300 hover:text-blue-500 rounded-2xl"><ThumbsUp className="w-4 h-4" /></button>
                    <button className="p-2.5 hover:bg-amber-50 text-slate-300 hover:text-amber-500 rounded-2xl"><Bookmark className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-2xl rounded-[48px] p-10 shadow-2xl animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">发起专家提问</h2>
                <p className="text-sm text-slate-400 font-medium italic">选择指定专家岗位可获得更专业的回复</p>
              </div>
              <button onClick={() => setShowSubmitModal(false)} className="p-3 bg-slate-50 rounded-full"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase px-1">提问标题</label>
                <input required type="text" placeholder="简洁概括您的业务难题..." className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-1">涉及岗位</label>
                  <select className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 outline-none font-bold">
                    <option>网格长 (统筹)</option>
                    <option>网格经理 (执行)</option>
                    <option>商客经理 (客户)</option>
                    <option>市场营销专员 (流量)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-1">指定专家</label>
                  <select className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 outline-none font-bold">
                    <option>系统智能匹配</option>
                    {EXPERTS_LIST.map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase px-1">详情背景</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> 提交实战申请
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QAModule;
