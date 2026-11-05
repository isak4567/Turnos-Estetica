import { useState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import raulFondo from "./figma/Raul.png";

interface LoginPageProps {
  onLogin: (role: 'admin' | 'professional', name: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@aura.clinic" && password === "admin123") {
      onLogin("admin", "Administración");
    } else if (email === "valentina@aura.clinic" && password === "pro123") {
      onLogin("professional", "Dra. Valentina Ríos");
    } else {
      setError("Credenciales incorrectas. Intenta con admin@aura.clinic / admin123");
    }
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySent(true);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Left panel — brand */}
      <div
        className="hidden lg:flex w-[45%] overflow-hidden"
      >
        <img className="w-[100%] " src={raulFondo} alt="" />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: '#F8F7F5' }}>
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2D5F4A' }}>
              <Leaf size={18} className="text-white" />
            </div>
            <span className="text-lg" style={{ fontFamily: 'var(--font-display)', color: '#2D5F4A' }}>Aura Clinic</span>
          </div>

          {!showRecovery ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Bienvenido/a</h2>
                <p className="text-sm" style={{ color: '#8A8476' }}>Ingresa tus credenciales para continuar</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#1C1917', fontWeight: 500 }}>Usuario</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(""); }}
                    placeholder="nombre@aura.clinic"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      background: '#FFFFFF',
                      borderColor: error ? '#C0392B' : 'rgba(28,25,23,0.12)',
                      color: '#1C1917',
                    }}
                    onFocus={e => e.target.style.borderColor = '#2D5F4A'}
                    onBlur={e => e.target.style.borderColor = error ? '#C0392B' : 'rgba(28,25,23,0.12)'}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#1C1917', fontWeight: 500 }}>Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(""); }}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        background: '#FFFFFF',
                        borderColor: error ? '#C0392B' : 'rgba(28,25,23,0.12)',
                        color: '#1C1917',
                      }}
                      onFocus={e => e.target.style.borderColor = '#2D5F4A'}
                      onBlur={e => e.target.style.borderColor = error ? '#C0392B' : 'rgba(28,25,23,0.12)'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                      style={{ color: '#8A8476' }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs px-1" style={{ color: '#C0392B' }}>{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm transition-all mt-2 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: '#2D5F4A', color: '#FFFFFF', fontWeight: 500 }}
                >
                  Ingresar
                </button>

                <button
                  type="button"
                  onClick={() => setShowRecovery(true)}
                  className="w-full text-sm text-center transition-colors hover:opacity-80"
                  style={{ color: '#8A8476' }}
                >
                  Recuperar contraseña
                </button>
              </form>

              {/* Demo hint */}
              <div className="mt-8 p-4 rounded-xl" style={{ background: 'rgba(45,95,74,0.06)', border: '1px solid rgba(45,95,74,0.12)' }}>
                <p className="text-xs mb-2" style={{ color: '#2D5F4A', fontWeight: 500 }}>Accesos de demo:</p>
                <p className="text-xs" style={{ color: '#8A8476' }}>Admin: admin@aura.clinic / admin123</p>
                <p className="text-xs" style={{ color: '#8A8476' }}>Profesional: valentina@aura.clinic / pro123</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#1C1917', fontWeight: 400 }}>Recuperar contraseña</h2>
                <p className="text-sm" style={{ color: '#8A8476' }}>Te enviaremos un enlace a tu correo</p>
              </div>

              {!recoverySent ? (
                <form onSubmit={handleRecovery} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: '#1C1917', fontWeight: 500 }}>Correo electrónico</label>
                    <input
                      type="email"
                      value={recoveryEmail}
                      onChange={e => setRecoveryEmail(e.target.value)}
                      placeholder="nombre@aura.clinic"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ background: '#FFFFFF', borderColor: 'rgba(28,25,23,0.12)', color: '#1C1917' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm hover:opacity-90"
                    style={{ background: '#2D5F4A', color: '#FFFFFF', fontWeight: 500 }}
                  >
                    Enviar enlace
                  </button>
                  <button type="button" onClick={() => setShowRecovery(false)} className="w-full text-sm" style={{ color: '#8A8476' }}>
                    Volver al inicio de sesión
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(45,95,74,0.1)' }}>
                    <Leaf size={24} style={{ color: '#2D5F4A' }} />
                  </div>
                  <p className="mb-2" style={{ color: '#1C1917', fontWeight: 500 }}>¡Correo enviado!</p>
                  <p className="text-sm mb-6" style={{ color: '#8A8476' }}>Revisa tu bandeja de entrada en {recoveryEmail}</p>
                  <button onClick={() => { setShowRecovery(false); setRecoverySent(false); }} className="text-sm" style={{ color: '#2D5F4A', fontWeight: 500 }}>
                    Volver al inicio
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
