import { useState, useEffect } from 'react';

const COOKIE_KEY = 'nexo_uvt_cookies';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)] shadow-lg"
      role="alert"
      aria-label="Aviso de cookies"
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--color-text)]">
            <strong>Cookies y privacidad:</strong> Usamos cookies propias y de
            terceros (Google AdSense) para mejorar tu experiencia y mostrar
            publicidad relevante. Al aceptar, consientes el uso de cookies
            conforme a nuestra política de privacidad y la{' '}
            <strong>Ley 1581 de 2012</strong> de protección de datos personales.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={reject}
            className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer"
          >
            Aceptar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
