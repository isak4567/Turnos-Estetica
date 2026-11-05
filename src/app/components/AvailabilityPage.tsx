import { useState } from "react";
import { Plus, X, Calendar, Clock, Sun, Moon } from "lucide-react";

const daysOptions = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

interface TimeBlock {
  id: string;
  start: string;
  end: string;
  label: string;
}

interface VacationPeriod {
  id: string;
  from: string;
  to: string;
  note: string;
}

export function AvailabilityPage() {
  const [workDays, setWorkDays] = useState(['Lun', 'Mar', 'Mié', 'Jue', 'Vie']);
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('18:00');
  const [breaks, setBreaks] = useState<TimeBlock[]>([
    { id: 'b1', start: '13:00', end: '14:00', label: 'Almuerzo' },
  ]);
  const [vacations, setVacations] = useState<VacationPeriod[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleDay = (d: string) => {
    setWorkDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  const addBreak = () => {
    setBreaks(prev => [...prev, { id: `b${Date.now()}`, start: '12:00', end: '13:00', label: 'Descanso' }]);
  };
  const removeBreak = (id: string) => setBreaks(prev => prev.filter(b => b.id !== id));

  const addVacation = () => {
    setVacations(prev => [...prev, { id: `v${Date.now()}`, from: '2026-07-01', to: '2026-07-15', note: '' }]);
  };
  const removeVacation = (id: string) => setVacations(prev => prev.filter(v => v.id !== id));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Mi Disponibilidad</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>Sincronizada con el agente de WhatsApp en tiempo real</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'rgba(45,95,74,0.1)', color: '#2D5F4A' }}>
              ✓ Cambios guardados
            </span>
          )}
          <button onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs text-white hover:opacity-90"
            style={{ background: '#2D5F4A' }}>
            Guardar cambios
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl space-y-5">
          {/* WhatsApp sync notice */}
          <div className="rounded-2xl p-4 flex items-start gap-3"
            style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,211,102,0.15)' }}>
              💬
            </div>
            <div>
              <p className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>Sincronización con WhatsApp activa</p>
              <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>
                El agente de IA solo ofrecerá los horarios disponibles según tu configuración. Cualquier bloqueo o descanso se reflejará automáticamente.
              </p>
            </div>
          </div>

          {/* Work days */}
          <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} style={{ color: '#2D5F4A' }} />
              <h3 className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>Días laborales</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {daysOptions.map(d => (
                <button key={d} onClick={() => toggleDay(d)}
                  className="px-4 py-2 rounded-xl text-sm transition-all"
                  style={{
                    background: workDays.includes(d) ? '#2D5F4A' : '#F0EDE8',
                    color: workDays.includes(d) ? '#FFFFFF' : '#8A8476',
                    fontWeight: workDays.includes(d) ? 500 : 400,
                  }}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Work hours */}
          <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} style={{ color: '#2D5F4A' }} />
              <h3 className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>Horario laboral</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1.5 flex items-center gap-1.5" style={{ color: '#8A8476' }}>
                  <Sun size={11} /> Hora de inicio
                </label>
                <input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
              </div>
              <div>
                <label className="block text-xs mb-1.5 flex items-center gap-1.5" style={{ color: '#8A8476' }}>
                  <Moon size={11} /> Hora de fin
                </label>
                <input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
              </div>
            </div>
            {/* Visual timeline */}
            <div className="mt-4 relative h-10 rounded-xl overflow-hidden" style={{ background: '#F0EDE8' }}>
              <div className="absolute top-0 h-full rounded-xl transition-all"
                style={{
                  left: `${(parseInt(workStart) - 7) / 14 * 100}%`,
                  right: `${100 - (parseInt(workEnd) - 7) / 14 * 100}%`,
                  background: 'rgba(45,95,74,0.2)',
                  border: '2px solid #2D5F4A',
                }} />
              {breaks.map(b => (
                <div key={b.id} className="absolute top-0 h-full"
                  style={{
                    left: `${(parseInt(b.start) - 7) / 14 * 100}%`,
                    right: `${100 - (parseInt(b.end) - 7) / 14 * 100}%`,
                    background: 'rgba(196,149,106,0.35)',
                  }} />
              ))}
              <div className="absolute inset-0 flex items-center px-3 justify-between">
                {Array.from({ length: 15 }, (_, i) => i + 7).filter(h => h % 2 === 0).map(h => (
                  <span key={h} className="text-xs" style={{ color: '#8A8476', fontSize: '10px' }}>{h}h</span>
                ))}
              </div>
            </div>
            <p className="text-xs mt-2" style={{ color: '#8A8476' }}>
              Verde: disponible · Naranja: descanso
            </p>
          </div>

          {/* Breaks */}
          <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: 'rgba(196,149,106,0.5)' }} />
                <h3 className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>Bloques de descanso</h3>
              </div>
              <button onClick={addBreak} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50"
                style={{ color: '#2D5F4A', border: '1px solid rgba(45,95,74,0.3)' }}>
                <Plus size={12} /> Agregar
              </button>
            </div>
            {breaks.length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: '#8A8476' }}>Sin bloques de descanso configurados</p>
            ) : (
              <div className="space-y-2">
                {breaks.map(b => (
                  <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8F7F5' }}>
                    <input value={b.label} onChange={e => setBreaks(p => p.map(x => x.id === b.id ? { ...x, label: e.target.value } : x))}
                      className="flex-1 text-xs bg-transparent outline-none" style={{ color: '#1C1917' }} />
                    <input type="time" value={b.start} onChange={e => setBreaks(p => p.map(x => x.id === b.id ? { ...x, start: e.target.value } : x))}
                      className="px-2 py-1 rounded-lg border text-xs outline-none"
                      style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917', width: '90px' }} />
                    <span className="text-xs" style={{ color: '#8A8476' }}>–</span>
                    <input type="time" value={b.end} onChange={e => setBreaks(p => p.map(x => x.id === b.id ? { ...x, end: e.target.value } : x))}
                      className="px-2 py-1 rounded-lg border text-xs outline-none"
                      style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917', width: '90px' }} />
                    <button onClick={() => removeBreak(b.id)} className="p-1 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vacations */}
          <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>Vacaciones y días no laborables</h3>
              <button onClick={addVacation} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50"
                style={{ color: '#2D5F4A', border: '1px solid rgba(45,95,74,0.3)' }}>
                <Plus size={12} /> Agregar período
              </button>
            </div>
            {vacations.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs" style={{ color: '#8A8476' }}>No hay períodos de ausencia configurados</p>
              </div>
            ) : (
              <div className="space-y-2">
                {vacations.map(v => (
                  <div key={v.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8F7F5' }}>
                    <input type="date" value={v.from}
                      onChange={e => setVacations(p => p.map(x => x.id === v.id ? { ...x, from: e.target.value } : x))}
                      className="px-2 py-1 rounded-lg border text-xs outline-none" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
                    <span className="text-xs" style={{ color: '#8A8476' }}>hasta</span>
                    <input type="date" value={v.to}
                      onChange={e => setVacations(p => p.map(x => x.id === v.id ? { ...x, to: e.target.value } : x))}
                      className="px-2 py-1 rounded-lg border text-xs outline-none" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
                    <input value={v.note} onChange={e => setVacations(p => p.map(x => x.id === v.id ? { ...x, note: e.target.value } : x))}
                      placeholder="Nota opcional"
                      className="flex-1 px-2 py-1 rounded-lg border text-xs outline-none" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
                    <button onClick={() => removeVacation(v.id)} className="p-1 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
