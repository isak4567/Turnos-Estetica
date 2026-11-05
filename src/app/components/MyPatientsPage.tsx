import { useState } from "react";
import { Search, Phone, Calendar, ChevronRight } from "lucide-react";
import { patients, professionals } from "./data";

export function MyPatientsPage({ professionalId }: { professionalId: string }) {
  const [search, setSearch] = useState("");
  const myPatients = patients.filter(p => p.professionalId === professionalId);
  const prof = professionals.find(p => p.id === professionalId);

  const filtered = myPatients.filter(p => {
    const q = search.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.phone.includes(q) || p.service.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Mis Pacientes</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>{myPatients.filter(p => p.status === 'active').length} pacientes activos</p>
        </div>
      </div>

      <div className="px-6 py-3 border-b" style={{ borderColor: 'rgba(28,25,23,0.06)', background: '#FFFFFF' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl max-w-sm" style={{ background: '#F0EDE8' }}>
          <Search size={13} style={{ color: '#8A8476' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre, servicio..."
            className="flex-1 text-xs bg-transparent outline-none" style={{ color: '#1C1917' }} />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#F0EDE8' }}>
              <Search size={20} style={{ color: '#8A8476' }} />
            </div>
            <p className="text-sm" style={{ color: '#8A8476' }}>No se encontraron pacientes</p>
          </div>
        ) : (
          <div className="space-y-3 max-w-2xl">
            {filtered.map(p => (
              <div key={p.id} className="rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:shadow-sm transition-all"
                style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm text-white flex-shrink-0"
                  style={{ background: prof?.color || '#2D5F4A' }}>
                  {p.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm truncate" style={{ color: '#1C1917', fontWeight: 500 }}>{p.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: p.status === 'active' ? 'rgba(45,95,74,0.1)' : '#F0EDE8', color: p.status === 'active' ? '#2D5F4A' : '#8A8476' }}>
                      {p.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#8A8476' }}>
                      <Phone size={10} /> {p.phone}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${prof?.color}15`, color: prof?.color }}>
                      {p.service}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs mb-0.5" style={{ color: '#8A8476' }}>
                    <Calendar size={10} /> Última visita
                  </div>
                  <p className="text-xs" style={{ color: '#1C1917', fontWeight: 500 }}>{p.lastVisit}</p>
                  {p.nextAppointment && (
                    <p className="text-xs mt-0.5" style={{ color: prof?.color }}>Próx: {p.nextAppointment}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs mb-0.5" style={{ color: '#8A8476' }}>Visitas</div>
                  <p className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>{p.totalVisits}</p>
                </div>
                <ChevronRight size={14} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#8A8476' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
