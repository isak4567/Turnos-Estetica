import { useState } from "react";
import { Plus, Edit2, Trash2, X, Send, Eye, Users, Calendar, Megaphone } from "lucide-react";
import { campaigns as initialCampaigns, services } from "./data";
import type { Campaign } from "./data";

const statusConfig = {
  draft: { label: 'Borrador', bg: '#F0EDE8', color: '#8A8476' },
  scheduled: { label: 'Programado', bg: 'rgba(196,149,106,0.12)', color: '#C4956A' },
  sent: { label: 'Enviado', bg: 'rgba(45,95,74,0.1)', color: '#2D5F4A' },
};

function renderPreview(msg: string) {
  return msg;
}

interface CampaignFormProps {
  campaign: Partial<Campaign> | null;
  onClose: () => void;
  onSave: (c: Campaign) => void;
}

function CampaignForm({ campaign, onClose, onSave }: CampaignFormProps) {
  const [form, setForm] = useState({
    name: campaign?.name || '',
    message: campaign?.message || '',
    segment: campaign?.segment || services[0],
    sendDate: campaign?.sendDate || '2026-06-25',
    status: campaign?.status || 'draft' as Campaign['status'],
    recipients: campaign?.recipients || 0,
  });
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl shadow-xl" style={{ background: '#FFFFFF' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)' }}>
          <h3 className="text-base" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>
            {campaign?.id ? 'Editar Campaña' : 'Nueva Campaña'}
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: showPreview ? '#2D5F4A' : '#F0EDE8', color: showPreview ? '#FFFFFF' : '#8A8476' }}>
              <Eye size={12} /> Vista previa
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><X size={15} /></button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Nombre de la campaña</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ej: Promo Invierno"
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Segmentación por servicio</label>
              <select value={form.segment} onChange={e => setForm(f => ({ ...f, segment: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }}>
                <option value="Todos los servicios">Todos los servicios</option>
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Fecha de envío</label>
              <input type="date" value={form.sendDate}
                onChange={e => setForm(f => ({ ...f, sendDate: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Estado</label>
              <div className="flex gap-2">
                {(['draft', 'scheduled'] as const).map(s => (
                  <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                    className="flex-1 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: form.status === s ? statusConfig[s].color : '#F0EDE8',
                      color: form.status === s ? '#FFFFFF' : '#8A8476',
                    }}>
                    {statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: '#F0EDE8' }}>
              <div className="flex items-center gap-2 mb-1">
                <Users size={13} style={{ color: '#8A8476' }} />
                <span className="text-xs" style={{ color: '#8A8476' }}>Destinatarios estimados</span>
              </div>
              <p className="text-lg" style={{ color: '#1C1917', fontWeight: 500 }}>~{form.segment === 'Todos los servicios' ? 120 : 45} contactos</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#8A8476' }}>Mensaje promocional</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={7}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none"
                style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }}
              />
              <p className="text-xs mt-1" style={{ color: '#8A8476' }}>{form.message.length} / 1000 caracteres</p>
            </div>
            {showPreview && (
              <div>
                <p className="text-xs mb-1.5" style={{ color: '#8A8476' }}>Vista previa WhatsApp</p>
                <div className="rounded-xl p-4" style={{ background: '#E8F5E9', minHeight: '100px' }}>
                  <div className="inline-block max-w-full rounded-xl rounded-tl-none px-3 py-2" style={{ background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    <p className="text-sm whitespace-pre-wrap" style={{ color: '#1C1917' }}>{form.message || <span style={{ color: '#8A8476' }}>Sin contenido</span>}</p>
                    <p className="text-xs mt-1 text-right" style={{ color: '#8A8476' }}>10:30 ✓</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 pb-5 flex gap-2 justify-end border-t pt-4" style={{ borderColor: 'rgba(28,25,23,0.06)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs border" style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476' }}>
            Cancelar
          </button>
          <button onClick={() => { onSave({ id: campaign?.id || `c${Date.now()}`, ...form, recipients: form.segment === 'Todos los servicios' ? 120 : 45 }); onClose(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs text-white" style={{ background: '#2D5F4A' }}>
            <Send size={12} /> Guardar campaña
          </button>
        </div>
      </div>
    </div>
  );
}

export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [editing, setEditing] = useState<Partial<Campaign> | null | undefined>(undefined);

  const handleDelete = (id: string) => setCampaigns(c => c.filter(x => x.id !== id));
  const handleSave = (c: Campaign) => {
    setCampaigns(prev => {
      const i = prev.findIndex(x => x.id === c.id);
      if (i >= 0) { const next = [...prev]; next[i] = c; return next; }
      return [...prev, c];
    });
  };

  const totalSent = campaigns.filter(c => c.status === 'sent').reduce((s, c) => s + c.recipients, 0);
  const scheduled = campaigns.filter(c => c.status === 'scheduled').length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Campañas Promocionales</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>Mensajes masivos por WhatsApp</p>
        </div>
        <button onClick={() => setEditing({})}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs text-white hover:opacity-90"
          style={{ background: '#2D5F4A' }}>
          <Plus size={14} /> Nueva campaña
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Campañas enviadas', value: campaigns.filter(c => c.status === 'sent').length, icon: Send, color: '#2D5F4A' },
            { label: 'Programadas', value: scheduled, icon: Calendar, color: '#C4956A' },
            { label: 'Mensajes enviados', value: totalSent, icon: Users, color: '#7B6FA0' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
                  <s.icon size={15} style={{ color: s.color }} />
                </div>
                <span className="text-xs" style={{ color: '#8A8476' }}>{s.label}</span>
              </div>
              <p className="text-2xl" style={{ color: '#1C1917', fontWeight: 500, fontFamily: 'var(--font-display)' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Campaign list */}
        <div className="space-y-3">
          {campaigns.map(c => {
            const sc = statusConfig[c.status];
            return (
              <div key={c.id} className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(196,149,106,0.1)' }}>
                      <Megaphone size={18} style={{ color: '#C4956A' }} />
                    </div>
                    <div>
                      <h3 className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>{c.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                        <span className="text-xs" style={{ color: '#8A8476' }}>• {c.segment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-2">
                      <p className="text-xs" style={{ color: '#8A8476' }}>Destinatarios</p>
                      <p className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>{c.recipients}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-xs" style={{ color: '#8A8476' }}>Fecha envío</p>
                      <p className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>{c.sendDate}</p>
                    </div>
                    {c.status !== 'sent' && (
                      <>
                        <button onClick={() => setEditing(c)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#8A8476' }}><Edit2 size={13} /></button>
                        <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}><Trash2 size={13} /></button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs line-clamp-2" style={{ color: '#8A8476', lineHeight: 1.6 }}>{c.message}</p>
              </div>
            );
          })}
        </div>
      </div>

      {editing !== undefined && (
        <CampaignForm campaign={editing} onClose={() => setEditing(undefined)} onSave={handleSave} />
      )}
    </div>
  );
}
