import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { LoginPage } from "./components/LoginPage";
import { AdminSidebar, ProfessionalSidebar } from "./components/Sidebar";
import { CalendarView } from "./components/CalendarView";
import { ProfessionalsManagement } from "./components/ProfessionalsManagement";
import { ReminderTemplates } from "./components/ReminderTemplates";
import { CampaignsPage } from "./components/CampaignsPage";
import { ClientDatabase } from "./components/ClientDatabase";
import { ReportsPage } from "./components/ReportsPage";
import { ProfessionalCalendar } from "./components/ProfessionalCalendar";
import { AvailabilityPage } from "./components/AvailabilityPage";
import { MyPatientsPage } from "./components/MyPatientsPage";


type UserRole = 'admin' | 'professional';
type AdminView = 'calendar' | 'professionals' | 'templates' | 'campaigns' | 'clients' | 'reports' | 'whatsapp';
type ProfessionalView = 'my-calendar' | 'availability' | 'my-patients';

const PROFESSIONAL_ID = 'p1';


export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  /* MARKER-MAKE-KIT-DISCOVERY-READ */
  const [user, setUser] = useState<{ role: UserRole; name: string } | null>(null);
  const [adminView, setAdminView] = useState<AdminView>('calendar');
  const [profView, setProfView] = useState<ProfessionalView>('my-calendar');

  const handleLogin = (role: UserRole, name: string) => setUser({ role, name });
  const handleLogout = () => { setUser(null); setAdminView('calendar'); setProfView('my-calendar'); };

  if (!user) {
    return (
      <div className="size-full" style={{ fontFamily: 'var(--font-sans)' }}>
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  if (user.role === 'admin') {
    return (
      <div className="size-full flex flex-col" style={{ fontFamily: 'var(--font-sans)', background: '#F8F7F5' }}>
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar currentView={adminView} onNavigate={setAdminView} onLogout={handleLogout} userName={user.name} />
          <main className="flex-1 overflow-hidden flex flex-col">
            {adminView === 'calendar' && <CalendarView />}
            {adminView === 'professionals' && <ProfessionalsManagement />}
            {adminView === 'templates' && <ReminderTemplates />}
            {adminView === 'campaigns' && <CampaignsPage />}
            {adminView === 'clients' && <ClientDatabase />}
          </main>
        </div>
        <button
          onClick={() => setAdminView('whatsapp')}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-30"
          style={{ background: '#25D366' }}
          title="Integración WhatsApp">
          <MessageCircle size={22} className="text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col" style={{ fontFamily: 'var(--font-sans)', background: '#F8F7F5' }}>
      <div className="flex flex-1 overflow-hidden">
        <ProfessionalSidebar currentView={profView} onNavigate={setProfView} onLogout={handleLogout} userName={user.name} />
        <main className="flex-1 overflow-hidden flex flex-col">
          {profView === 'my-calendar' && <ProfessionalCalendar professionalId={PROFESSIONAL_ID} />}
          {profView === 'availability' && <AvailabilityPage />}
          {profView === 'my-patients' && <MyPatientsPage professionalId={PROFESSIONAL_ID} />}
        </main>
      </div>
    </div>
  );
}
