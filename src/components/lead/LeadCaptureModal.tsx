import { useState, useRef, useEffect } from 'react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function LeadCaptureModal({
  isOpen,
  onClose,
}: LeadCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al enviar');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Error al enviar el email'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Descargar tabla de retención"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[var(--radius-xl)] shadow-xl max-w-md w-full p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-4 space-y-3">
            <div className="text-4xl">📧</div>
            <h3 className="text-xl font-bold text-[var(--color-secondary)]">
              ¡Revisa tu correo!
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Te enviamos la Tabla de Retención en la Fuente 2026 a{' '}
              <strong>{email}</strong>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6 space-y-2">
              <div className="text-3xl">📊</div>
              <h3 className="text-xl font-bold text-[var(--color-secondary)]">
                Tabla de Retención en la Fuente 2026
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Recibe gratis el PDF con todas las bases y tarifas de retención
                actualizadas para 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="lead-email"
                  className="block text-sm font-medium text-[var(--color-text-muted)] mb-1"
                >
                  Tu correo electrónico
                </label>
                <input
                  ref={inputRef}
                  id="lead-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contador@empresa.com"
                  className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-[var(--radius-md)] bg-white text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-[var(--color-alert-red)]">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-6 font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {status === 'loading'
                  ? 'Enviando...'
                  : 'Enviar PDF a mi correo'}
              </button>

              <div className="space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 accent-[var(--color-primary)]"
                  />
                  <span className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Acepto la{' '}
                    <a
                      href="/privacidad"
                      className="text-[var(--color-primary)] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      política de tratamiento de datos
                    </a>{' '}
                    conforme a la Ley 1581 de 2012 y autorizo a Nexo para
                    enviarme el recurso solicitado a mi correo electrónico.
                  </span>
                </label>
                <p className="text-xs text-center text-[var(--color-text-muted)]">
                  No spam. Solo recibirás el PDF solicitado. Puedes solicitar la
                  eliminación de tus datos en cualquier momento.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
