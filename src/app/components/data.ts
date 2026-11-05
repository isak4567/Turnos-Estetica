export type UserRole = 'admin' | 'professional';

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  color: string;
  avatar: string;
  active: boolean;
  schedule: { start: string; end: string; days: string[] };
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  service: string;
  professionalId: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
  source: 'whatsapp' | 'manual';
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  service: string;
  lastVisit: string;
  nextAppointment?: string;
  professionalId: string;
  status: 'active' | 'inactive';
  totalVisits: number;
}

export interface ReminderTemplate {
  id: string;
  name: string;
  message: string;
  type: 'reminder' | 'confirmation' | 'followup';
}

export interface Campaign {
  id: string;
  name: string;
  message: string;
  segment: string;
  sendDate: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipients: number;
}

export const professionals: Professional[] = [
  {
    id: 'p1',
    name: 'Dra. Valentina Ríos',
    specialty: 'Medicina Estética',
    email: 'v.rios@aura.clinic',
    phone: '+54 9 11 4521-8890',
    color: '#2D5F4A',
    avatar: 'VR',
    active: true,
    schedule: { start: '09:00', end: '18:00', days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'] },
  },
  {
    id: 'p2',
    name: 'Lic. Camila Paredes',
    specialty: 'Estética Corporal',
    email: 'c.paredes@aura.clinic',
    phone: '+54 9 11 3387-4421',
    color: '#C4956A',
    avatar: 'CP',
    active: true,
    schedule: { start: '10:00', end: '19:00', days: ['Lun', 'Mar', 'Jue', 'Vie', 'Sáb'] },
  },
  {
    id: 'p3',
    name: 'Dr. Sebastián Molina',
    specialty: 'Dermatología Clínica',
    email: 's.molina@aura.clinic',
    phone: '+54 9 11 5562-7789',
    color: '#7B6FA0',
    avatar: 'SM',
    active: true,
    schedule: { start: '08:00', end: '16:00', days: ['Mar', 'Mié', 'Jue', 'Vie'] },
  },
  {
    id: 'p4',
    name: 'Lic. Florencia Ibáñez',
    specialty: 'Nutrición & Bienestar',
    email: 'f.ibanez@aura.clinic',
    phone: '+54 9 11 6674-3312',
    color: '#B05A7A',
    avatar: 'FI',
    active: true,
    schedule: { start: '09:00', end: '17:00', days: ['Lun', 'Mié', 'Vie'] },
  },
];

export const appointments: Appointment[] = [
  { id: 'a1', patientName: 'Sofía Alvarez', patientPhone: '+54 9 11 2233-4455', service: 'Botox Preventivo', professionalId: 'p1', date: '2026-06-15', time: '09:30', duration: 60, status: 'confirmed', source: 'whatsapp' },
  { id: 'a2', patientName: 'Martina García', patientPhone: '+54 9 11 5544-6677', service: 'Relleno de Labios', professionalId: 'p1', date: '2026-06-15', time: '11:00', duration: 45, status: 'confirmed', source: 'manual' },
  { id: 'a3', patientName: 'Lucía Fernández', patientPhone: '+54 9 11 8899-0011', service: 'Masaje Reductor', professionalId: 'p2', date: '2026-06-15', time: '10:00', duration: 90, status: 'confirmed', source: 'whatsapp' },
  { id: 'a4', patientName: 'Valeria Torres', patientPhone: '+54 9 11 1122-3344', service: 'Peeling Químico', professionalId: 'p3', date: '2026-06-15', time: '09:00', duration: 60, status: 'pending', source: 'whatsapp' },
  { id: 'a5', patientName: 'Ana Rodríguez', patientPhone: '+54 9 11 4455-6678', service: 'Consulta Nutricional', professionalId: 'p4', date: '2026-06-15', time: '10:00', duration: 60, status: 'confirmed', source: 'manual' },
  { id: 'a6', patientName: 'Carolina López', patientPhone: '+54 9 11 7788-9900', service: 'Botox Frontal', professionalId: 'p1', date: '2026-06-16', time: '10:30', duration: 45, status: 'confirmed', source: 'whatsapp' },
  { id: 'a7', patientName: 'Daniela Suárez', patientPhone: '+54 9 11 3344-5566', service: 'Cavitación', professionalId: 'p2', date: '2026-06-16', time: '11:00', duration: 60, status: 'pending', source: 'whatsapp' },
  { id: 'a8', patientName: 'Romina Sánchez', patientPhone: '+54 9 11 6677-8899', service: 'Dermapen', professionalId: 'p3', date: '2026-06-17', time: '09:30', duration: 75, status: 'completed', source: 'manual' },
  { id: 'a9', patientName: 'Gabriela Muñoz', patientPhone: '+54 9 11 9900-1122', service: 'Drenaje Linfático', professionalId: 'p2', date: '2026-06-17', time: '14:00', duration: 60, status: 'confirmed', source: 'whatsapp' },
  { id: 'a10', patientName: 'Isabela Castro', patientPhone: '+54 9 11 2211-4433', service: 'Plan Nutricional', professionalId: 'p4', date: '2026-06-18', time: '09:00', duration: 90, status: 'confirmed', source: 'whatsapp' },
];

export const patients: Patient[] = [
  { id: 'pt1', name: 'Sofía Alvarez', phone: '+54 9 11 2233-4455', service: 'Botox Preventivo', lastVisit: '2026-06-15', nextAppointment: '2026-07-15', professionalId: 'p1', status: 'active', totalVisits: 8 },
  { id: 'pt2', name: 'Martina García', phone: '+54 9 11 5544-6677', service: 'Relleno de Labios', lastVisit: '2026-06-15', nextAppointment: '2026-09-15', professionalId: 'p1', status: 'active', totalVisits: 3 },
  { id: 'pt3', name: 'Lucía Fernández', phone: '+54 9 11 8899-0011', service: 'Masaje Reductor', lastVisit: '2026-06-15', nextAppointment: '2026-06-22', professionalId: 'p2', status: 'active', totalVisits: 12 },
  { id: 'pt4', name: 'Valeria Torres', phone: '+54 9 11 1122-3344', service: 'Peeling Químico', lastVisit: '2026-06-10', nextAppointment: '2026-06-24', professionalId: 'p3', status: 'active', totalVisits: 5 },
  { id: 'pt5', name: 'Ana Rodríguez', phone: '+54 9 11 4455-6678', service: 'Consulta Nutricional', lastVisit: '2026-06-15', nextAppointment: '2026-06-29', professionalId: 'p4', status: 'active', totalVisits: 2 },
  { id: 'pt6', name: 'Carolina López', phone: '+54 9 11 7788-9900', service: 'Botox Frontal', lastVisit: '2026-05-20', nextAppointment: '2026-06-16', professionalId: 'p1', status: 'active', totalVisits: 6 },
  { id: 'pt7', name: 'Daniela Suárez', phone: '+54 9 11 3344-5566', service: 'Cavitación', lastVisit: '2026-06-01', nextAppointment: '2026-06-16', professionalId: 'p2', status: 'active', totalVisits: 4 },
  { id: 'pt8', name: 'Romina Sánchez', phone: '+54 9 11 6677-8899', service: 'Dermapen', lastVisit: '2026-06-17', professionalId: 'p3', status: 'inactive', totalVisits: 1 },
  { id: 'pt9', name: 'Gabriela Muñoz', phone: '+54 9 11 9900-1122', service: 'Drenaje Linfático', lastVisit: '2026-06-17', nextAppointment: '2026-06-24', professionalId: 'p2', status: 'active', totalVisits: 9 },
  { id: 'pt10', name: 'Isabela Castro', phone: '+54 9 11 2211-4433', service: 'Plan Nutricional', lastVisit: '2026-05-25', nextAppointment: '2026-06-18', professionalId: 'p4', status: 'active', totalVisits: 7 },
  { id: 'pt11', name: 'Patricia Medina', phone: '+54 9 11 5566-7788', service: 'Botox Preventivo', lastVisit: '2026-04-10', professionalId: 'p1', status: 'inactive', totalVisits: 2 },
  { id: 'pt12', name: 'Natalia Vega', phone: '+54 9 11 8877-6655', service: 'Masaje Reductor', lastVisit: '2026-06-05', nextAppointment: '2026-06-19', professionalId: 'p2', status: 'active', totalVisits: 15 },
];

export const reminderTemplates: ReminderTemplate[] = [
  {
    id: 'rt1',
    name: 'Recordatorio 24hs',
    message: 'Hola {{nombre}} 👋 Te recordamos tu cita para *{{servicio}}* el día *{{fecha}}* a las *{{hora}}* con {{profesional}}. Ante cualquier consulta respondé este mensaje. ¡Te esperamos! ✨ — Aura Clinic',
    type: 'reminder',
  },
  {
    id: 'rt2',
    name: 'Confirmación de Turno',
    message: '¡Hola {{nombre}}! 🌿 Tu turno ha sido *confirmado* para el día {{fecha}} a las {{hora}} con {{profesional}} ({{servicio}}). Recordá llegar 5 minutos antes. ¡Hasta pronto! — Aura Clinic',
    type: 'confirmation',
  }
];

export const campaigns: Campaign[] = [
  {
    id: 'c1',
    name: 'Promo Invierno — Botox',
    message: '❄️ ¡Llegó el invierno y con él nuestra promo especial! 20% de descuento en tratamientos de Botox durante junio. Reservá tu turno respondiendo este mensaje. ¡Cupos limitados! — Aura Clinic',
    segment: 'Botox Preventivo',
    sendDate: '2026-06-20',
    status: 'scheduled',
    recipients: 48,
  },
  {
    id: 'c2',
    name: 'Reactivación Pacientes Inactivos',
    message: '¡Hola! Te extrañamos en Aura Clinic 💚 Han pasado más de 3 meses desde tu última visita. Te ofrecemos un 15% de descuento en tu próxima consulta. ¿Cuándo venís?',
    segment: 'Todos los servicios',
    sendDate: '2026-06-18',
    status: 'draft',
    recipients: 23,
  },
  {
    id: 'c3',
    name: 'Lanzamiento Drenaje Linfático',
    message: '🌿 ¡Nuevo tratamiento disponible! Drenaje Linfático Manual con nuestra especialista Lic. Camila Paredes. Ideal para mejorar circulación y reducir retención de líquidos. ¡Agendá tu turno hoy!',
    segment: 'Masaje Reductor',
    sendDate: '2026-06-10',
    status: 'sent',
    recipients: 67,
  },
];

export const services = [
  'Botox Preventivo', 'Botox Frontal', 'Relleno de Labios', 'Relleno Facial',
  'Peeling Químico', 'Dermapen', 'Mesoterapia', 'Hidratación Profunda',
  'Masaje Reductor', 'Cavitación', 'Drenaje Linfático', 'Presoterapia',
  'Consulta Nutricional', 'Plan Nutricional', 'Seguimiento Nutricional',
];

export const reportData = {
  appointmentsByProfessional: [
    { name: 'Dra. Ríos', value: 87, color: '#2D5F4A' },
    { name: 'Lic. Paredes', value: 72, color: '#C4956A' },
    { name: 'Dr. Molina', value: 54, color: '#7B6FA0' },
    { name: 'Lic. Ibáñez', value: 38, color: '#B05A7A' },
  ],
  topServices: [
    { name: 'Botox Preventivo', count: 45 },
    { name: 'Masaje Reductor', count: 38 },
    { name: 'Relleno de Labios', count: 29 },
    { name: 'Peeling Químico', count: 22 },
    { name: 'Drenaje Linfático', count: 18 },
  ],
  monthlyPatients: [
    { month: 'Ene', nuevos: 12, recurrentes: 31 },
    { month: 'Feb', nuevos: 15, recurrentes: 38 },
    { month: 'Mar', nuevos: 18, recurrentes: 42 },
    { month: 'Abr', nuevos: 22, recurrentes: 45 },
    { month: 'May', nuevos: 19, recurrentes: 52 },
    { month: 'Jun', nuevos: 24, recurrentes: 58 },
  ],
  cancellations: [
    { month: 'Ene', count: 4 },
    { month: 'Feb', count: 3 },
    { month: 'Mar', count: 6 },
    { month: 'Abr', count: 2 },
    { month: 'May', count: 5 },
    { month: 'Jun', count: 3 },
  ],
};
