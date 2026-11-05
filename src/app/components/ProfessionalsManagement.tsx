import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Phone, Mail, Clock } from "lucide-react";
import { professionals as initialProfessionals } from "./data";
import type { Professional } from "./data";

const specialties = ['Medicina Estética', 'Estética Corporal', 'Dermatología Clínica', 'Nutrición & Bienestar', 'Cosmetología', 'Masoterapia'];
const daysOptions = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function ProfessionalCard({ prof, onEdit, onDelete }: { prof: Professional; onEdit: () => void; onDelete: () => void }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="rounded-2xl p-5 relative group" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: prof.color }}>
            {prof.avatar}
          </div>
          <div>
            <h3 className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>{prof.name}</h3>
            <p className="text-xs mt-0.5" style={{ color: prof.color }}>{prof.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><Edit2 size={13} /></button>
          <button onClick={() => setShowDeleteConfirm(true)} className="p-1.5 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}><Trash2 size={13} /></button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Mail size={12} style={{ color: '#8A8476' }} />
          <span className="text-xs" style={{ color: '#8A8476' }}>{prof.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={12} style={{ color: '#8A8476' }} />
          <span className="text-xs" style={{ color: '#8A8476' }}>{prof.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} style={{ color: '#8A8476' }} />
          <span className="text-xs" style={{ color: '#8A8476' }}>{prof.schedule.start} – {prof.schedule.end}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 flex-wrap">
        {prof.schedule.days.map(d => (
          <span key={d} className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${prof.color}15`, color: prof.color }}>{d}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`px-2.5 py-1 rounded-full text-xs ${prof.active ? 'text-green-700' : 'text-gray-500'}`}
          style={{ background: prof.active ? 'rgba(45,95,74,0.1)' : '#F0EDE8' }}>
          {prof.active ? 'Activo' : 'Inactivo'}
        </span>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: prof.color }} />
      </div>

      {showDeleteConfirm && (
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 z-10"
          style={{ background: 'rgba(255,255,255,0.97)' }}>
          <p className="text-sm text-center mb-1" style={{ color: '#1C1917', fontWeight: 500 }}>¿Eliminar profesional?</p>
          <p className="text-xs text-center mb-4" style={{ color: '#8A8476' }}>Esta acción no se puede deshacer</p>
          <div className="flex gap-2">
            <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476' }}>
              Cancelar
            </button>
            <button onClick={() => { onDelete(); setShowDeleteConfirm(false); }} className="px-3 py-1.5 rounded-lg text-xs text-white" style={{ background: '#C0392B' }}>
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface ProfessionalFormProps {
  prof: Partial<Professional> | null;
  onClose: () => void;
  onSave: (p: Professional) => void;
}

function ProfessionalForm({ prof, onClose, onSave }: ProfessionalFormProps) {
  const [form, setForm] = useState({
    name: prof?.name || '',
    specialty: prof?.specialty || specialties[0],
    email: prof?.email || '',
    phone: prof?.phone || '',
    color: prof?.color || '#2D5F4A',
    avatar: prof?.avatar || '',
    active: prof?.active ?? true,
    schedule: {
      start: prof?.schedule?.start || '09:00',
      end: prof?.schedule?.end || '18:00',
      days: prof?.schedule?.days || ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    },
  });

  const toggleDay = (d: string) => {
    setForm(f => ({
      ...f,
      schedule: {
        ...f.schedule,
        days: f.schedule.days.includes(d) ? f.schedule.days.filter(x => x !== d) : [...f.schedule.days, d],
      },
    }));
  };

  const handleSave = () => {
    const initials = form.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    onSave({ id: prof?.id || `p${Date.now()}`, ...form, avatar: initials } as Professional);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl shadow-xl overflow-hidden" style={{ background: '#FFFFFF' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)' }}>
          <h3 className="text-base" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>
            {prof?.id ? 'Editar Profesional' : 'Nuevo Profesional'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><X size={15} /></button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Nombre completo</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Especialidad</label>
              <select value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }}>
                {specialties.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Email</label>
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                type="email" className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Teléfono</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Inicio jornada</label>
              <input type="time" value={form.schedule.start}
                onChange={e => setForm(f => ({ ...f, schedule: { ...f.schedule, start: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#8A8476' }}>Fin jornada</label>
              <input type="time" value={form.schedule.end}
                onChange={e => setForm(f => ({ ...f, schedule: { ...f.schedule, end: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-2" style={{ color: '#8A8476' }}>Días laborales</label>
              <div className="flex gap-1.5 flex-wrap">
                {daysOptions.map(d => (
                  <button key={d} onClick={() => toggleDay(d)}
                    className="px-3 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: form.schedule.days.includes(d) ? '#2D5F4A' : '#F0EDE8',
                      color: form.schedule.days.includes(d) ? '#FFFFFF' : '#8A8476',
                    }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-2" style={{ color: '#8A8476' }}>Color identificador</label>
              <div className="flex gap-2">
                {['#2D5F4A', '#C4956A', '#7B6FA0', '#B05A7A', '#3D7A8A', '#8B6914'].map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className="w-8 h-8 rounded-full transition-all"
                    style={{ background: c, outline: form.color === c ? `3px solid ${c}` : 'none', outlineOffset: '2px' }} />
                ))}
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <button onClick={() => setForm(f => ({ ...f, active: !f.active }))}
                className="relative w-10 h-5 rounded-full transition-all flex-shrink-0"
                style={{ background: form.active ? '#2D5F4A' : '#C8C2B8' }}>
                <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: form.active ? '22px' : '2px' }} />
              </button>
              <span className="text-sm" style={{ color: '#1C1917' }}>Profesional activo</span>
            </div>
          </div>
        </div>
        <div className="px-6 pb-5 flex gap-2 justify-end border-t pt-4" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs border" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476' }}>
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl text-xs text-white" style={{ background: '#2D5F4A' }}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProfessionalsManagement() {
  const [profs, setProfs] = useState(initialProfessionals);
  const [editingProf, setEditingProf] = useState<Partial<Professional> | null | undefined>(undefined);

  const handleDelete = (id: string) => setProfs(p => p.filter(x => x.id !== id));

  const handleSave = (p: Professional) => {
    setProfs(prev => {
      const existing = prev.findIndex(x => x.id === p.id);
      if (existing >= 0) { const next = [...prev]; next[existing] = p; return next; }
      return [...prev, p];
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Gestión de Profesionales</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>{profs.filter(p => p.active).length} profesionales activos</p>
        </div>
        <button onClick={() => setEditingProf({})}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs text-white hover:opacity-90"
          style={{ background: '#2D5F4A' }}>
          <Plus size={14} /> Nuevo profesional
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {profs.map(p => (
            <ProfessionalCard key={p.id} prof={p}
              onEdit={() => setEditingProf(p)}
              onDelete={() => handleDelete(p.id)} />
          ))}
          <button onClick={() => setEditingProf({})}
            className="rounded-2xl p-5 flex flex-col items-center justify-center gap-2 transition-all hover:border-primary border-dashed border-2"
            style={{ borderColor: 'rgba(28,25,23,0.15)', minHeight: '220px', color: '#8A8476' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F0EDE8' }}>
              <Plus size={18} style={{ color: '#8A8476' }} />
            </div>
            <span className="text-sm">Agregar profesional</span>
          </button>
        </div>
      </div>

      {editingProf !== undefined && (
        <ProfessionalForm prof={editingProf} onClose={() => setEditingProf(undefined)} onSave={handleSave} />
      )}
    </div>
  );
}
