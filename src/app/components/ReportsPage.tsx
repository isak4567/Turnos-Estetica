import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { TrendingUp, Users, Calendar, XCircle } from "lucide-react";
import { reportData } from "./data";

const kpis = [
  { label: 'Turnos este mes', value: '251', change: '+12%', icon: Calendar, color: '#2D5F4A' },
  { label: 'Pacientes nuevos', value: '24', change: '+8%', icon: Users, color: '#C4956A' },
  { label: 'Tasa de retención', value: '78%', change: '+3%', icon: TrendingUp, color: '#7B6FA0' },
  { label: 'Cancelaciones', value: '3', change: '-40%', icon: XCircle, color: '#B05A7A' },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 shadow-lg" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
      {label && <p className="text-xs mb-1" style={{ color: '#8A8476' }}>{label}</p>}
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: entry.color || '#1C1917', fontWeight: 500 }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function ReportsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(28,25,23,0.08)', background: '#FFFFFF' }}>
        <div>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Reportes</h1>
          <p className="text-xs mt-0.5" style={{ color: '#8A8476' }}>Período: Enero – Junio 2026</p>
        </div>
        <div className="flex gap-2">
          {(['sem', 'mes', 'trim', 'año'] as const).map((p, i) => (
            <button key={p} className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: i === 1 ? '#2D5F4A' : '#F0EDE8', color: i === 1 ? '#FFFFFF' : '#8A8476' }}>
              {p === 'sem' ? 'Semana' : p === 'mes' ? 'Mes' : p === 'trim' ? 'Trimestre' : 'Año'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${k.color}12` }}>
                  <k.icon size={16} style={{ color: k.color }} />
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: k.change.startsWith('+') ? 'rgba(45,95,74,0.1)' : 'rgba(192,57,43,0.1)', color: k.change.startsWith('+') ? '#2D5F4A' : '#C0392B' }}>
                  {k.change}
                </span>
              </div>
              <p className="text-2xl mb-0.5" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>{k.value}</p>
              <p className="text-xs" style={{ color: '#8A8476' }}>{k.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-3 gap-4">
          {/* Appointments by professional */}
          <div className="col-span-2 rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <h3 className="text-sm mb-4" style={{ color: '#1C1917', fontWeight: 500 }}>Turnos por profesional</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={reportData.appointmentsByProfessional} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(28,25,23,0.04)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8A8476' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8A8476' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Turnos" radius={[6,6,0,0]}>
                  {reportData.appointmentsByProfessional.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top services */}
          <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <h3 className="text-sm mb-4" style={{ color: '#1C1917', fontWeight: 500 }}>Servicios más solicitados</h3>
            <div className="space-y-3">
              {reportData.topServices.map((s, i) => {
                const max = reportData.topServices[0].count;
                const pct = (s.count / max) * 100;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs truncate" style={{ color: '#8A8476', maxWidth: '140px' }}>{s.name}</span>
                      <span className="text-xs" style={{ color: '#1C1917', fontWeight: 500 }}>{s.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F0EDE8' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: i === 0 ? '#2D5F4A' : i === 1 ? '#C4956A' : i === 2 ? '#7B6FA0' : '#B05A7A' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Monthly patients */}
          <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <h3 className="text-sm mb-4" style={{ color: '#1C1917', fontWeight: 500 }}>Pacientes nuevos vs recurrentes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={reportData.monthlyPatients}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(28,25,23,0.04)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8A8476' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8A8476' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#8A8476' }} />
                <Line type="monotone" dataKey="nuevos" name="Nuevos" stroke="#C4956A" strokeWidth={2} dot={{ r: 3, fill: '#C4956A' }} />
                <Line type="monotone" dataKey="recurrentes" name="Recurrentes" stroke="#2D5F4A" strokeWidth={2} dot={{ r: 3, fill: '#2D5F4A' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cancellations + pie */}
          <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid rgba(28,25,23,0.08)' }}>
            <h3 className="text-sm mb-4" style={{ color: '#1C1917', fontWeight: 500 }}>Distribución por profesional</h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="55%" height={160}>
                <PieChart>
                  <Pie data={reportData.appointmentsByProfessional} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                    {reportData.appointmentsByProfessional.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {reportData.appointmentsByProfessional.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-xs truncate" style={{ color: '#8A8476' }}>{d.name}</span>
                    <span className="text-xs ml-auto" style={{ color: '#1C1917', fontWeight: 500 }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
