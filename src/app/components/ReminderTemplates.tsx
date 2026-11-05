import { useState } from "react";
import { Plus, Edit2, Trash2, X, Copy, MessageSquare, Check } from "lucide-react";
import { reminderTemplates as initialTemplates } from "./data";
import type { ReminderTemplate } from "./data";

const variables = [
  { key: '{{nombre}}', label: 'Nombre del paciente' },
  { key: '{{fecha}}', label: 'Fecha de la cita' },
  { key: '{{hora}}', label: 'Hora de la cita' },
  { key: '{{profesional}}', label: 'Profesional asignado' },
  { key: '{{servicio}}', label: 'Servicio' },
];

const typeLabels = { reminder: 'Recordatorio', confirmation: 'Confirmación', followup: 'Seguimiento' };
const typeColors = { reminder: '#C4956A', confirmation: '#2D5F4A', followup: '#7B6FA0' };

function renderPreview(msg: string) {
  return msg
    .replace(/{{nombre}}/g, 'Sofía Alvarez')
    .replace(/{{fecha}}/g, '15 de junio, 2026')
    .replace(/{{hora}}/g, '10:30')
    .replace(/{{profesional}}/g, 'Dra. Valentina Ríos')
    .replace(/{{servicio}}/g, 'Botox Preventivo');
}

interface TemplateFormProps {
  template: Partial<ReminderTemplate> | null;
  onClose: () => void;
  onSave: (t: ReminderTemplate) => void;
}

function TemplateForm({ template, onClose, onSave }: TemplateFormProps) {
  const [form, setForm] = useState({
    name: template?.name || '',
    message: template?.message || '',
    type: template?.type || 'reminder' as ReminderTemplate['type'],
  });

  const insertVariable = (v: string) => {
    setForm(f => ({ ...f, message: f.message + v }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl shadow-xl" style={{ background: '#FFFFFF' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)' }}>
          <h3 className="text-base" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>
            {template?.id ? 'Editar Plantilla' : 'Nueva Plantilla'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><X size={15} /></button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Nombre de la plantilla</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ej: Recordatorio 24hs"
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Tipo de mensaje</label>
              <div className="flex gap-2">
                {(['reminder', 'confirmation', 'followup'] as const).map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                    className="flex-1 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: form.type === t ? typeColors[t] : '#F0EDE8',
                      color: form.type === t ? '#FFFFFF' : '#8A8476',
                    }}>
                    {typeLabels[t]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Variables disponibles</label>
              <div className="space-y-1">
                {variables.map(v => (
                  <button key={v.key} onClick={() => insertVariable(v.key)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                    style={{ background: '#F8F7F5', color: '#1C1917' }}>
                    <span style={{ color: '#8A8476' }}>{v.label}</span>
                    <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: '#EDE9E3', color: '#2D5F4A' }}>{v.key}</code>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Mensaje</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={6}
                placeholder="Escribe el mensaje aquí..."
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }}
              />
              <p className="text-xs mt-1" style={{ color: '#8A8476' }}>{form.message.length} caracteres</p>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Vista previa (WhatsApp)</label>
              <div className="rounded-xl p-4" style={{ background: '#E8F5E9', minHeight: '100px' }}>
                <div className="inline-block max-w-full rounded-xl rounded-tl-none px-3 py-2" style={{ background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  <p className="text-sm whitespace-pre-wrap" style={{ color: '#1C1917' }}>
                    {form.message ? renderPreview(form.message) : <span style={{ color: '#8A8476' }}>El mensaje aparecerá aquí...</span>}
                  </p>
                  <p className="text-xs mt-1 text-right" style={{ color: '#8A8476' }}>10:30 ✓✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pb-5 flex gap-2 justify-end border-t pt-4" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs border" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476' }}>
            Cancelar
          </button>
          <button onClick={() => { onSave({ id: template?.id || `rt${Date.now()}`, ...form }); onClose(); }}
            className="px-4 py-2 rounded-xl text-xs text-white" style={{ background: '#2D5F4A' }}>
            Guardar plantilla
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReminderTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [editing, setEditing] = useState<Partial<ReminderTemplate> | null | undefined>(undefined);
  const [copied, setCopied] = useState<string | null>(null);

  const handleDelete = (id: string) => setTemplates(t => t.filter(x => x.id !== id));
  const handleSave = (t: ReminderTemplate) => {
    setTemplates(prev => {
      const i = prev.findIndex(x => x.id === t.id);
      if (i >= 0) { const next = [...prev]; next[i] = t; return next; }
      return [...prev, t];
    });
  };

  const handleCopy = (id: string, msg: string) => {
    navigator.clipboard.writeText(msg).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Plantillas de Recordatorios</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>Mensajes automáticos para WhatsApp</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4 max-w-4xl">
          {templates.map(t => (
            <div key={t.id} className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${typeColors[t.type]}15` }}>
                    <MessageSquare size={16} style={{ color: typeColors[t.type] }} />
                  </div>
                  <div>
                    <h3 className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>{t.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${typeColors[t.type]}15`, color: typeColors[t.type] }}>
                      {typeLabels[t.type]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleCopy(t.id, t.message)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" style={{ color: copied === t.id ? '#2D5F4A' : '#8A8476' }}>
                    {copied === t.id ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                  <button onClick={() => setEditing(t)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs mb-1.5" style={{ color: '#8A8476' }}>Mensaje</p>
                  <div className="px-3 py-2.5 rounded-xl text-sm" style={{ background: '#F8F7F5', color: '#8A8476', lineHeight: 1.5 }}>
                    {t.message}
                  </div>
                </div>
                <div>
                  <p className="text-xs mb-1.5" style={{ color: '#8A8476' }}>Vista previa</p>
                  <div className="rounded-xl p-3" style={{ background: '#E8F5E9' }}>
                    <div className="inline-block rounded-xl rounded-tl-none px-3 py-2 max-w-full" style={{ background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                      <p className="text-xs whitespace-pre-wrap" style={{ color: '#1C1917' }}>{renderPreview(t.message)}</p>
                      <p className="text-xs mt-1 text-right" style={{ color: '#8A8476' }}>10:30 ✓✓</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-1.5 flex-wrap">
                {variables.filter(v => t.message.includes(v.key)).map(v => (
                  <span key={v.key} className="px-2 py-0.5 rounded-full text-xs" style={{ background: '#EDE9E3', color: '#2D5F4A' }}>
                    {v.key}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing !== undefined && (
        <TemplateForm template={editing} onClose={() => setEditing(undefined)} onSave={handleSave} />
      )}
    </div>
  );
}
