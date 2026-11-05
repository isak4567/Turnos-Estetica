import { useState, useContext } from "react";

import { ChevronLeft, ChevronRight, Plus, X, MessageCircle, Edit2, Trash2, Check, Clock } from "lucide-react";
import { professionals, services } from "./data";
import type { Appointment } from "./data";
import { appointmentContext } from "../context";

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8);

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

function getMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const cells: (number | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

const statusColors: Record<string, string> = {
  confirmed: '#2D5F4A',
  pending: '#C4956A',
  completed: '#8A8476',
  cancelled: '#C0392B',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmado',
  pending: 'Pendiente',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

interface AppointmentModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  isNew?: boolean;
}



function AppointmentModal({ appointment, onClose, isNew }: AppointmentModalProps) {

  const {setAppoinmentList} = useContext(appointmentContext);

  const [form, setForm] = useState({
    patientName: appointment?.patientName || '',
    patientPhone: appointment?.patientPhone || '',
    service: appointment?.service || services[0],
    professionalId: appointment?.professionalId || professionals[0].id,
    date: appointment?.date || '2026-06-15',
    time: appointment?.time || '09:00',
    notes: appointment?.notes || '',
  });

  const saveAppoinment = () => {
  //  console.log(appointmentData);
    if (isNew) {
      setAppoinmentList(prev => [...prev, form]);
    }
    else {
      setAppoinmentList(prev =>
        prev.map(item =>
          item.id === appointment?.id
            ? form
            : item
        )
      );
    }

    onClose();
  };


  const prof = professionals.find(p => p.id === form.professionalId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl shadow-xl" style={{ background: '#FFFFFF' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)' }}>
          <h3 className="text-base" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>
            {isNew ? 'Nueva Cita' : 'Detalle de Cita'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><X size={15} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Paciente</label>
              <input value={form.patientName} onChange={e => setForm(f => ({ ...f, patientName: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', background: '#FAFAF8', color: '#1C1917' }} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Teléfono</label>
              <input value={form.patientPhone} onChange={e => setForm(f => ({ ...f, patientPhone: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', background: '#FAFAF8', color: '#1C1917' }} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Servicio</label>
              <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', background: '#FAFAF8', color: '#1C1917' }}>
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Profesional</label>
              <select value={form.professionalId} onChange={e => setForm(f => ({ ...f, professionalId: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', background: '#FAFAF8', color: '#1C1917' }}>
                {professionals.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Fecha</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', background: '#FAFAF8', color: '#1C1917' }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Hora</label>
              <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', background: '#FAFAF8', color: '#1C1917' }} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Notas</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={2} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', background: '#FAFAF8', color: '#1C1917' }} />
            </div>
          </div>
        </div>
        <div className="px-6 pb-5 flex gap-2 justify-end">
          {!isNew && (
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs hover:bg-red-50 transition-colors" style={{ color: '#C0392B' }}>
              <Trash2 size={13} /> Cancelar cita
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs border" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476' }}>
            Cerrar
          </button>
          <button className="px-4 py-2 rounded-xl text-xs text-white" style={{ background: '#2D5F4A' }} onClick={()=> saveAppoinment()}>
            {isNew ? 'Crear cita' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CalendarView() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate, setCurrentDate] = useState(new Date('2026-06-15'));
  const [selectedProfessionals, setSelectedProfessionals] = useState<string[]>(professionals.map(p => p.id));
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);


  const {appoinmentList} = useContext(appointmentContext);
  
  const navigate = (dir: number) => {
    const d = new Date(currentDate);
    if (view === 'month') d.setMonth(d.getMonth() + dir);
    else if (view === 'week') d.setDate(d.getDate() + dir * 7);
    else d.setDate(d.getDate() + dir);
    setCurrentDate(d);
  };

  const filteredAppointments = appoinmentList.filter(a => selectedProfessionals.includes(a.professionalId));

  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);

  const toggleProfessional = (id: string) => {
    setSelectedProfessionals(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );


  };

  const getApptForDayTime = (date: Date, hour: number) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredAppointments.filter(a => {
      if (a.date !== dateStr) return false;
      const h = parseInt(a.time.split(':')[0]);
      return h === hour;
    });
  };

  const getApptForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return filteredAppointments.filter(a => a.date === dateStr);
  };

  const currentDateStr = currentDate.toISOString().split('T')[0];
  const todayAppts = filteredAppointments.filter(a => a.date === currentDateStr);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Calendario General</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>{filteredAppointments.length} citas este período</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Professional filter */}
          <div className="flex items-center gap-1.5">
            {professionals.map(p => (
              <button
                key={p.id}
                onClick={() => toggleProfessional(p.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: selectedProfessionals.includes(p.id) ? `${p.color}18` : '#F0EDE8',
                  color: selectedProfessionals.includes(p.id) ? p.color : '#8A8476',
                  border: `1px solid ${selectedProfessionals.includes(p.id) ? p.color + '40' : 'transparent'}`,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: selectedProfessionals.includes(p.id) ? p.color : '#C8C2B8' }} />
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </button>
            ))}
          </div>

          <div className="w-px h-6" style={{ background: 'rgba(28,25,23,0.08)' }} />

          {/* View toggle */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(28,25,23,0.12)' }}>
            {(['month','week','day'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-1.5 text-xs transition-all capitalize"
                style={{
                  background: view === v ? '#2D5F4A' : '#FFFFFF',
                  color: view === v ? '#FFFFFF' : '#8A8476',
                }}>
                {v === 'month' ? 'Mes' : v === 'week' ? 'Semana' : 'Día'}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><ChevronLeft size={16} /></button>
            <span className="text-sm px-2" style={{ color: '#1C1917', minWidth: '140px', textAlign: 'center', fontWeight: 500 }}>
              {view === 'month' ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                : view === 'week' ? `${weekDays[0].getDate()} – ${weekDays[6].getDate()} ${monthNames[weekDays[6].getMonth()]}`
                : `${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]}`}
            </span>
            <button onClick={() => navigate(1)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><ChevronRight size={16} /></button>
          </div>

          <button onClick={() => setShowNewModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs text-white transition-all hover:opacity-90"
            style={{ background: '#2D5F4A' }}>
            <Plus size={14} /> Nueva cita
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* WEEK VIEW */}
        {view === 'week' && (
          <div className="flex flex-col h-full">
            {/* Day headers */}
            <div className="grid" style={{ gridTemplateColumns: '64px repeat(7, 1fr)', borderBottom: '1px solid rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
              <div />
              {weekDays.map((d, i) => {
                const isToday = d.toISOString().split('T')[0] === '2026-06-15';
                return (
                  <div key={i} className="text-center py-3 px-2">
                    <div className="text-xs mb-1" style={{ color: '#8A8476' }}>{dayNames[i]}</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm ${isToday ? 'text-white' : ''}`}
                      style={{ background: isToday ? '#2D5F4A' : 'transparent', color: isToday ? '#FFFFFF' : '#1C1917', fontWeight: isToday ? 500 : 400 }}>
                      {d.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Time grid */}
            <div className="flex-1 overflow-auto">
              {HOURS.map(hour => (
                <div key={hour} className="grid" style={{ gridTemplateColumns: '64px repeat(7, 1fr)', minHeight: '72px', borderBottom: '1px solid rgba(28,25,23,0.04)' }}>
                  <div className="flex items-start justify-end pr-3 pt-2">
                    <span className="text-xs" style={{ color: '#8A8476' }}>{hour}:00</span>
                  </div>
                  {weekDays.map((d, di) => {
                    const appts = getApptForDayTime(d, hour);
                    return (
                      <div key={di} className="relative border-l p-1" style={{ borderColor: 'rgba(28,25,23,0.04)' }}>
                        {appts.map(a => {
                          const prof = professionals.find(p => p.id === a.professionalId);
                          return (
                            <button key={a.id} onClick={() => setSelectedAppointment(a)}
                              className="w-full text-left rounded-lg px-2 py-1.5 mb-1 transition-all hover:opacity-80"
                              style={{ background: `${prof?.color}18`, borderLeft: `3px solid ${prof?.color}` }}>
                              <p className="text-xs truncate" style={{ color: prof?.color, fontWeight: 500 }}>{a.patientName}</p>
                              <p className="text-xs truncate" style={{ color: `${prof?.color}99` }}>{a.time} · {a.service}</p>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MONTH VIEW */}
        {view === 'month' && (
          <div className="p-4">
            <div className="grid grid-cols-7 mb-2">
              {dayNames.map(d => (
                <div key={d} className="text-center py-2 text-xs" style={{ color: '#8A8476' }}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map((day, i) => {
                const appts = day ? getApptForDay(day) : [];
                const isToday = day === 15 && currentDate.getMonth() === 5;
                return (
                  <div key={i} className="min-h-[100px] rounded-xl p-2 transition-all"
                    style={{ background: day ? '#FFFFFF' : 'transparent', border: day ? (isToday ? '2px solid #2D5F4A' : '1px solid rgba(28,25,23,0.06)') : 'none' }}>
                    {day && (
                      <>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1 ${isToday ? 'text-white' : ''}`}
                          style={{ background: isToday ? '#2D5F4A' : 'transparent', color: isToday ? '#FFFFFF' : '#1C1917' }}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {appts.slice(0, 3).map(a => {
                            const prof = professionals.find(p => p.id === a.professionalId);
                            return (
                              <button key={a.id} onClick={() => setSelectedAppointment(a)}
                                className="w-full text-left rounded px-1.5 py-0.5 text-xs truncate"
                                style={{ background: `${prof?.color}18`, color: prof?.color }}>
                                {a.time} {a.patientName.split(' ')[0]}
                              </button>
                            );
                          })}
                          {appts.length > 3 && <p className="text-xs px-1" style={{ color: '#8A8476' }}>+{appts.length - 3} más</p>}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DAY VIEW */}
        {view === 'day' && (
          <div className="p-4">
            <div className="flex gap-4">
              {/* Timeline */}
              <div className="flex-1">
                {HOURS.map(hour => {
                  const appts = getApptForDayTime(currentDate, hour);
                  return (
                    <div key={hour} className="flex gap-3 mb-1" style={{ minHeight: '80px' }}>
                      <div className="w-12 text-right pt-2 flex-shrink-0">
                        <span className="text-xs" style={{ color: '#8A8476' }}>{hour}:00</span>
                      </div>
                      <div className="flex-1 border-t pt-2" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
                        {appts.length === 0 ? (
                          <div className="h-full min-h-[60px] rounded-xl" style={{ background: 'rgba(28,25,23,0.02)' }} />
                        ) : (
                          <div className="flex gap-2 flex-wrap">
                            {appts.map(a => {
                              const prof = professionals.find(p => p.id === a.professionalId);
                              return (
                                <button key={a.id} onClick={() => setSelectedAppointment(a)}
                                  className="flex-1 text-left rounded-xl p-3 min-w-[180px] hover:opacity-90 transition-all"
                                  style={{ background: `${prof?.color}12`, border: `1px solid ${prof?.color}30` }}>
                                  <div className="flex items-start justify-between mb-1">
                                    <p className="text-sm" style={{ color: prof?.color, fontWeight: 500 }}>{a.patientName}</p>
                                    <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: statusColors[a.status] }}>
                                      {statusLabels[a.status]}
                                    </span>
                                  </div>
                                  <p className="text-xs" style={{ color: '#8A8476' }}>{a.service}</p>
                                  <p className="text-xs mt-1" style={{ color: '#8A8476' }}>
                                    <Clock size={10} className="inline mr-1" />{a.time} · {a.duration}min · {prof?.name}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedAppointment && (
        <AppointmentModal appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
      )}
      {showNewModal && (
        <AppointmentModal appointment={null} onClose={() => setShowNewModal(false)} isNew />
      )}
    </div>
  );
}
