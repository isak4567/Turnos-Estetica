import { useState, useContext } from "react";
import { ChevronLeft, ChevronRight, Check, Clock, Phone, RefreshCw, CheckCircle } from "lucide-react";
import { appointments, professionals, patients } from "./data";
import type { Appointment } from "./data";
import { appointmentContext } from "../context";

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8);
const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

function getWeekDays(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const statusConfig = {
  confirmed: { label: 'Confirmado', bg: 'rgba(45,95,74,0.1)', color: '#2D5F4A' },
  pending: { label: 'Pendiente', bg: 'rgba(196,149,106,0.12)', color: '#C4956A' },
  completed: { label: 'Completado', bg: '#F0EDE8', color: '#8A8476' },
  cancelled: { label: 'Cancelado', bg: 'rgba(192,57,43,0.08)', color: '#C0392B' },
};

interface AppointmentDetailProps {
  appt: Appointment;
  onClose: () => void;
  onComplete: (id: string) => void;
  onConfirm: (id: string) => void;
}

function AppointmentDetail({ appt, onClose, onComplete, onConfirm }: AppointmentDetailProps) {
  const prof = professionals.find(p => p.id === appt.professionalId);
  const sc = statusConfig[appt.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl shadow-xl" style={{ background: '#FFFFFF' }} onClick={e => e.stopPropagation()}>
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ background: prof?.color || '#2D5F4A' }}>
                {appt.patientName.split(' ').map(w => w[0]).slice(0,2).join('')}
              </div>
              <div>
                <h3 className="text-base" style={{ color: '#1C1917', fontWeight: 500 }}>{appt.patientName}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Phone size={11} style={{ color: '#8A8476' }} />
                  <span className="text-xs" style={{ color: '#8A8476' }}>{appt.patientPhone}</span>
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
          </div>

          <div className="space-y-3 py-4 border-y" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#8A8476' }}>Servicio</span>
              <span className="text-xs" style={{ color: '#1C1917', fontWeight: 500 }}>{appt.service}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#8A8476' }}>Fecha</span>
              <span className="text-xs" style={{ color: '#1C1917', fontWeight: 500 }}>{appt.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#8A8476' }}>Hora</span>
              <span className="text-xs" style={{ color: '#1C1917', fontWeight: 500 }}>{appt.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#8A8476' }}>Duración</span>
              <span className="text-xs" style={{ color: '#1C1917', fontWeight: 500 }}>{appt.duration} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#8A8476' }}>Canal</span>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: appt.source === 'whatsapp' ? 'rgba(37,211,102,0.1)' : '#F0EDE8', color: appt.source === 'whatsapp' ? '#128C7E' : '#8A8476' }}>
                {appt.source === 'whatsapp' ? '💬 WhatsApp' : '✏️ Manual'}
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 flex gap-2">
          {appt.status === 'pending' && (
            <button onClick={() => { onConfirm(appt.id); onClose(); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs"
              style={{ background: 'rgba(45,95,74,0.1)', color: '#2D5F4A' }}>
              <Check size={12} /> Confirmar
            </button>
          )}
          {appt.status === 'confirmed' && (
            <button onClick={() => { onComplete(appt.id); onClose(); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs"
              style={{ background: 'rgba(45,95,74,0.1)', color: '#2D5F4A' }}>
              <CheckCircle size={12} /> Completada
            </button>
          )}
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs border"
            style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476' }}>
            <RefreshCw size={12} /> Reagendar
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProfessionalCalendar({ professionalId }: { professionalId: string }) {
    const {appoinmentList} = useContext(appointmentContext);
  
  const [view, setView] = useState<'day' | 'week'>('week');
  const [currentDate, setCurrentDate] = useState(new Date('2026-06-15'));
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [appts, setAppts] = useState(appoinmentList.filter(a => a.professionalId === professionalId));

  const prof = professionals.find(p => p.id === professionalId);
  const navigate = (dir: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + dir * (view === 'week' ? 7 : 1));
    setCurrentDate(d);
  };

  const handleComplete = (id: string) => {
    setAppts(prev => prev.map(a => a.id === id ? { ...a, status: 'completed' } : a));
  };
  const handleConfirm = (id: string) => {
    setAppts(prev => prev.map(a => a.id === id ? { ...a, status: 'confirmed' } : a));
  };

  const weekDays = getWeekDays(currentDate);
  const dateStr = currentDate.toISOString().split('T')[0];
  const todayAppts = appts.filter(a => a.date === dateStr);

  const getApptForDayTime = (date: Date, hour: number) => {
    const ds = date.toISOString().split('T')[0];
    return appts.filter(a => a.date === ds && parseInt(a.time.split(':')[0]) === hour);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Mi Calendario</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>
            {view === 'day' ? `${todayAppts.length} citas hoy` : `${appts.length} citas esta semana`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(28,25,23,0.12)' }}>
            {(['day','week'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-1.5 text-xs transition-all"
                style={{ background: view === v ? '#2D5F4A' : '#FFFFFF', color: view === v ? '#FFFFFF' : '#8A8476' }}>
                {v === 'day' ? 'Día' : 'Semana'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><ChevronLeft size={16} /></button>
            <span className="text-sm px-2" style={{ color: '#1C1917', fontWeight: 500, minWidth: '120px', textAlign: 'center' }}>
              {view === 'week' ? `${weekDays[0].getDate()} – ${weekDays[6].getDate()} ${monthNames[weekDays[6].getMonth()]}` : `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}`}
            </span>
            <button onClick={() => navigate(1)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {view === 'week' && (
          <div className="flex flex-col h-full">
            <div className="grid" style={{ gridTemplateColumns: '64px repeat(7,1fr)', borderBottom: '1px solid rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
              <div />
              {weekDays.map((d, i) => {
                const isToday = d.toISOString().split('T')[0] === '2026-06-15';
                return (
                  <div key={i} className="text-center py-3">
                    <div className="text-xs mb-1" style={{ color: '#8A8476' }}>{dayNames[i]}</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm"
                      style={{ background: isToday ? prof?.color || '#2D5F4A' : 'transparent', color: isToday ? '#FFFFFF' : '#1C1917' }}>
                      {d.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 overflow-auto">
              {HOURS.map(hour => (
                <div key={hour} className="grid" style={{ gridTemplateColumns: '64px repeat(7,1fr)', minHeight: '70px', borderBottom: '1px solid rgba(28,25,23,0.04)' }}>
                  <div className="flex items-start justify-end pr-3 pt-2">
                    <span className="text-xs" style={{ color: '#8A8476' }}>{hour}:00</span>
                  </div>
                  {weekDays.map((d, di) => {
                    const dayAppts = getApptForDayTime(d, hour);
                    return (
                      <div key={di} className="border-l p-1" style={{ borderColor: 'rgba(28,25,23,0.04)' }}>
                        {dayAppts.map(a => (
                          <button key={a.id} onClick={() => setSelectedAppt(a)}
                            className="w-full text-left rounded-lg px-2 py-1.5 mb-1 hover:opacity-80 transition-all"
                            style={{ background: `${prof?.color || '#2D5F4A'}18`, borderLeft: `3px solid ${prof?.color || '#2D5F4A'}` }}>
                            <p className="text-xs truncate" style={{ color: prof?.color, fontWeight: 500 }}>{a.patientName}</p>
                            <p className="text-xs" style={{ color: `${prof?.color}99` }}>{a.time}</p>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'day' && (
          <div className="p-4 max-w-2xl">
            {HOURS.map(hour => {
              const dayAppts = appts.filter(a => a.date === dateStr && parseInt(a.time.split(':')[0]) === hour);
              return (
                <div key={hour} className="flex gap-4 mb-2" style={{ minHeight: '72px' }}>
                  <div className="w-12 text-right pt-2 flex-shrink-0">
                    <span className="text-xs" style={{ color: '#8A8476' }}>{hour}:00</span>
                  </div>
                  <div className="flex-1 border-t pt-2" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
                    {dayAppts.length === 0 ? (
                      <div className="h-14 rounded-xl" style={{ background: 'rgba(28,25,23,0.02)' }} />
                    ) : (
                      dayAppts.map(a => {
                        const sc = statusConfig[a.status];
                        return (
                          <button key={a.id} onClick={() => setSelectedAppt(a)}
                            className="w-full text-left rounded-xl p-3 mb-2 hover:opacity-90 transition-all"
                            style={{ background: `${prof?.color}10`, border: `1px solid ${prof?.color}25` }}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm" style={{ color: prof?.color, fontWeight: 500 }}>{a.patientName}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                            </div>
                            <p className="text-xs" style={{ color: '#8A8476' }}>{a.service} · <Clock size={10} className="inline" /> {a.time} ({a.duration}min)</p>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedAppt && (
        <AppointmentDetail appt={selectedAppt} onClose={() => setSelectedAppt(null)}
          onComplete={handleComplete} onConfirm={handleConfirm} />
      )}
    </div>
  );
}
