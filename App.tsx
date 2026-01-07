
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  Award, 
  MessageSquare, 
  TrendingUp, 
  FolderKanban,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { ViewType } from './types';
import ExpertDashboard from './components/ExpertDashboard';
import ExpertDirectory from './components/ExpertDirectory';
import CallRequest from './components/CallRequest';
import QAModule from './components/QAModule';
import GrowthHub from './components/GrowthHub';
import ResultLibrary from './components/ResultLibrary';
import PointCenter from './components/PointCenter';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: ViewType.DASHBOARD, label: '专家大屏', icon: LayoutDashboard },
    { id: ViewType.EXPERT_DIRECTORY, label: '专家风采', icon: Users },
    { id: ViewType.CALL_REQUEST, label: '专家调用', icon: PhoneCall },
    { id: ViewType.POINT_CENTER, label: '积分模块', icon: Award },
    { id: ViewType.QA_CENTER, label: '问答模块', icon: MessageSquare },
    { id: ViewType.GROWTH_HUB, label: '千人千面', icon: TrendingUp },
    { id: ViewType.RESULT_LIBRARY, label: '成果沉淀', icon: FolderKanban },
  ];

  const renderView = () => {
    switch (activeView) {
      case ViewType.DASHBOARD: return <ExpertDashboard />;
      case ViewType.EXPERT_DIRECTORY: return <ExpertDirectory />;
      case ViewType.CALL_REQUEST: return <CallRequest />;
      case ViewType.POINT_CENTER: return <PointCenter />;
      case ViewType.QA_CENTER: return <QAModule />;
      case ViewType.GROWTH_HUB: return <GrowthHub />;
      case ViewType.RESULT_LIBRARY: return <ResultLibrary />;
      default: return <div className="p-8 text-center text-slate-500">此模块正在开发中...</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900 text-white flex flex-col`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          {sidebarOpen && <span className="font-bold text-lg whitespace-nowrap">专家管理平台</span>}
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg w-96">
            <Search className="text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索专家、问答、成果..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-600 hover:text-blue-600">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-semibold">管理员</p>
                <p className="text-xs text-slate-500">网格通后台</p>
              </div>
              <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
