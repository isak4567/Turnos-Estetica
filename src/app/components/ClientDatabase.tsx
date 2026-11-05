import { useState, useMemo } from "react";
import { Search, Filter, Download, ChevronUp, ChevronDown, Phone, User } from "lucide-react";
import { patients, professionals } from "./data";
import type { Patient } from "./data";

type SortKey = keyof Patient;

export function ClientDatabase() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [professionalFilter, setProfessionalFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    return patients
      .filter(p => {
        const q = search.toLowerCase();
        const matchSearch = !q || p.name.toLowerCase().includes(q) || p.phone.includes(q) || p.service.toLowerCase().includes(q);
        const matchProf = professionalFilter === 'all' || p.professionalId === professionalFilter;
        return matchSearch && matchProf;
      })
      .sort((a, b) => {
        const av = String(a[sortKey] || '');
        const bv = String(b[sortKey] || '');
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, statusFilter, professionalFilter, sortKey, sortDir]);

  const toggleSelect = (id: string) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map(p => p.id));
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronUp size={11} style={{ color: '#C8C2B8' }} />;
    return sortDir === 'asc' ? <ChevronUp size={11} style={{ color: '#2D5F4A' }} /> : <ChevronDown size={11} style={{ color: '#2D5F4A' }} />;
  };

  const handleExport = () => {
    const rows = [
      ['Nombre', 'Teléfono', 'Servicio', 'Última visita', 'Profesional', 'Visitas'],
      ...filtered.map(p => {
        const prof = professionals.find(x => x.id === p.professionalId);
        return [p.name, p.phone, p.service, p.lastVisit, prof?.name || '', p.totalVisits];
      }),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'clientes-aura.csv'; a.click();
  };

  const cols = [
    { key: 'name' as SortKey, label: 'Paciente', width: '200px' },
    { key: 'phone' as SortKey, label: 'Teléfono', width: '150px' },
    { key: 'service' as SortKey, label: 'Servicio', width: '180px' },
    { key: 'lastVisit' as SortKey, label: 'Última visita', width: '130px' },
    { key: 'professionalId' as SortKey, label: 'Profesional', width: '180px' },
    { key: 'totalVisits' as SortKey, label: 'Visitas', width: '80px' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Base de Clientes</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>{filtered.length} pacientes {search || statusFilter !== 'all' ? 'filtrados' : 'en total'}</p>
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <span className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'rgba(45,95,74,0.1)', color: '#2D5F4A' }}>
              {selected.length} seleccionados
            </span>
          )}
          <button onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs border hover:bg-gray-50 transition-colors"
            style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476' }}>
            <Download size={13} /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 px-6 py-3 border-b" style={{ borderColor: 'rgba(28,25,23,0.06)', background: '#FFFFFF' }}>
        <div className="flex items-center gap-2 flex-1 max-w-xs px-3 py-2 rounded-xl" style={{ background: '#F0EDE8' }}>
          <Search size={13} style={{ color: '#8A8476' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar paciente, teléfono, servicio..."
            className="flex-1 text-xs bg-transparent outline-none" style={{ color: '#1C1917' }} />
        </div>

        <div className="flex items-center gap-1">
          <Filter size={13} style={{ color: '#8A8476' }} />
          {(['all', 'active', 'inactive'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: statusFilter === s ? '#2D5F4A' : '#F0EDE8',
                color: statusFilter === s ? '#FFFFFF' : '#8A8476',
              }}>
              {s === 'all' ? 'Todos' : s === 'active' ? 'Activos' : 'Inactivos'}
            </button>
          ))}
        </div>

        <select value={professionalFilter} onChange={e => setProfessionalFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl text-xs border outline-none"
          style={{ borderColor: 'rgba(28,25,23,0.12)', color: '#8A8476', background: '#FFFFFF' }}>
          <option value="all">Todos los profesionales</option>
          {professionals.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead style={{ background: '#FAFAF8', position: 'sticky', top: 0, zIndex: 10 }}>
            <tr style={{ borderBottom: '1px solid rgba(28,25,23,0.06)' }}>
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleAll} className="rounded" />
              </th>
              {cols.map(c => (
                <th key={c.key} className="px-3 py-3 text-left" style={{ width: c.width }}>
                  <button onClick={() => handleSort(c.key)}
                    className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
                    style={{ color: '#8A8476', fontWeight: 500 }}>
                    {c.label} <SortIcon k={c.key} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const prof = professionals.find(x => x.id === p.professionalId);
              const isSelected = selected.includes(p.id);
              return (
                <tr key={p.id}
                  className="transition-colors hover:bg-gray-50 cursor-pointer"
                  style={{
                    borderBottom: '1px solid rgba(28,25,23,0.04)',
                    background: isSelected ? 'rgba(45,95,74,0.04)' : i % 2 === 0 ? '#FFFFFF' : '#FAFAF8',
                  }}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(p.id)} className="rounded" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0"
                        style={{ background: prof?.color || '#8A8476' }}>
                        {p.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                      </div>
                      <span className="text-sm" style={{ color: '#1C1917', fontWeight: 500 }}>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <Phone size={11} style={{ color: '#8A8476' }} />
                      <span className="text-xs" style={{ color: '#8A8476' }}>{p.phone}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: prof ? `${prof.color}15` : '#F0EDE8', color: prof?.color || '#8A8476' }}>
                      {p.service}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs" style={{ color: '#8A8476' }}>{p.lastVisit}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: prof?.color || '#C8C2B8' }} />
                      <span className="text-xs" style={{ color: '#8A8476' }}>{prof?.name || '—'}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs" style={{ color: '#1C1917', fontWeight: 500 }}>{p.totalVisits}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#F0EDE8' }}>
              <User size={20} style={{ color: '#8A8476' }} />
            </div>
            <p className="text-sm" style={{ color: '#8A8476' }}>No se encontraron pacientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
