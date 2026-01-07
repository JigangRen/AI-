
import React from 'react';
import { FileText, Download, Layout, ShieldCheck, Share2 } from 'lucide-react';

const RESULTS = [
  { id: '1', title: '《省分核心网业务迁云方法论总结》', author: '张建立', type: '方法论', date: '2024.05.12', downloads: 428 },
  { id: '2', title: '《金融行业大模型落地实战案例集》', author: '李瑞雪', type: '项目案例', date: '2024.04.28', downloads: 312 },
  { id: '3', title: '《网格自动化支撑工具V3.2操作手册》', author: '王振华', type: '工具手册', date: '2024.03.15', downloads: 856 },
  { id: '4', title: '《多云架构下的网络安全加固模板》', author: '陈芳', type: '模版工具', date: '2024.02.20', downloads: 219 },
];

const ResultLibrary: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">专家成果沉淀库</h2>
          <p className="text-slate-500">沉淀专家经验，便于复用，赋能网格一线</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold">按领域分类</button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-100">上传成果</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESULTS.map((res) => (
          <div key={res.id} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                <FileText className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">{res.type}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{res.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{res.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={`https://picsum.photos/24/24?random=${res.id}`} className="w-6 h-6 rounded-full" alt="avatar" />
                    <span className="text-xs text-slate-600 font-medium">{res.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" /> {res.downloads}
                    </button>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-4">
            <ShieldCheck className="w-5 h-5" />
            官方推荐·方法论总结
          </div>
          <h2 className="text-3xl font-bold mb-4">网格化支撑标准操作手册 v4.0</h2>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">集合了近三年300+个真实支撑案例，提炼出15种通用解法，是每位新晋专家的必备参考资料。</p>
          <button className="px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all flex items-center gap-2">
            点击下载/查看 <Download className="w-5 h-5" />
          </button>
        </div>
        <div className="relative z-10 hidden md:block">
           <Layout className="w-48 h-48 text-slate-800 opacity-50" />
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default ResultLibrary;
