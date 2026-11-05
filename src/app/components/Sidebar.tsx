import { Leaf, Calendar, Users, MessageSquare, Megaphone, Database, BarChart2, LogOut, ChevronRight, Bell, Search, MessageCircle } from "lucide-react";

type AdminView = 'calendar' | 'professionals' | 'templates' | 'campaigns' | 'clients' | 'reports' | 'whatsapp';
type ProfessionalView = 'my-calendar' | 'availability' | 'my-patients';

interface AdminSidebarProps {
  currentView: AdminView;
  onNavigate: (view: AdminView) => void;
  onLogout: () => void;
  userName: string;
}

interface ProfessionalSidebarProps {
  currentView: ProfessionalView;
  onNavigate: (view: ProfessionalView) => void;
  onLogout: () => void;
  userName: string;
}

const adminNav = [
  { id: 'calendar', label: 'Calendario General', icon: Calendar },
  { id: 'professionals', label: 'Profesionales', icon: Users },
  { id: 'templates', label: 'Recordatorios', icon: MessageSquare },
  { id: 'campaigns', label: 'Campañas', icon: Megaphone },
  { id: 'clients', label: 'Base de Clientes', icon: Database },
] as const;

const professionalNav = [
  { id: 'my-calendar', label: 'Mi Calendario', icon: Calendar },
  { id: 'availability', label: 'Disponibilidad', icon: Bell },
  { id: 'my-patients', label: 'Mis Pacientes', icon: Users },
] as const;

function SidebarShell({ children, onLogout, userName, role }: {
  children: React.ReactNode;
  onLogout: () => void;
  userName: string;
  role: 'admin' | 'professional';
}) {
  return (
    <aside className="flex flex-col h-full" style={{ background: '#FFFFFF', borderRight: '1px solid rgba(28,25,23,0.08)', width: '240px', minWidth: '240px' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#2D5F4A' }}>
            <Leaf size={15} className="text-white" />
          </div>
          <div>
            <div className="text-sm" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Aura Clinic</div>
            <div className="text-xs" style={{ color: '#8A8476' }}>{role === 'admin' ? 'Administración' : 'Portal Profesional'}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        {children}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white" style={{ background: '#2D5F4A' }}>
            {userName.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate" style={{ color: '#1C1917', fontWeight: 500 }}>{userName}</p>
            <p className="text-xs" style={{ color: '#8A8476' }}>{role === 'admin' ? 'Administrador' : 'Profesional'}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors hover:bg-red-50"
          style={{ color: '#8A8476' }}
        >
          <LogOut size={13} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: {
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all mb-0.5"
      style={{
        background: active ? 'rgba(45,95,74,0.08)' : 'transparent',
        color: active ? '#2D5F4A' : '#8A8476',
        fontWeight: active ? 500 : 400,
      }}
    >
      <Icon size={15} />
      <span className="flex-1 text-left">{label}</span>
      {active && <ChevronRight size={12} style={{ color: '#2D5F4A' }} />}
    </button>
  );
}

export function AdminSidebar({ currentView, onNavigate, onLogout, userName }: AdminSidebarProps) {
  return (
    <SidebarShell onLogout={onLogout} userName={userName} role="admin">
      <p className="px-3 py-1 text-xs mb-1" style={{ color: '#8A8476', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '10px' }}>Gestión</p>
      {adminNav.map(item => (
        <NavItem
          key={item.id}
          active={currentView === item.id}
          icon={item.icon}
          label={item.label}
          onClick={() => onNavigate(item.id as AdminView)}
        />
      ))}
    </SidebarShell>
  );
}

export function ProfessionalSidebar({ currentView, onNavigate, onLogout, userName }: ProfessionalSidebarProps) {
  return (
    <SidebarShell onLogout={onLogout} userName={userName} role="professional">
      <p className="px-3 py-1 text-xs mb-1" style={{ color: '#8A8476', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '10px' }}>Mi Panel</p>
      {professionalNav.map(item => (
        <NavItem
          key={item.id}
          active={currentView === item.id}
          icon={item.icon}
          label={item.label}
          onClick={() => onNavigate(item.id as ProfessionalView)}
        />
      ))}
    </SidebarShell>
  );
}
