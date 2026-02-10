import { useState } from 'react';
import LeadCaptureModal from './LeadCaptureModal';

export default function LeadMagnetBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-secondary)] border-t border-[var(--color-primary)]/30 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl flex-shrink-0" aria-hidden="true">
              📥
            </span>
            <p className="text-sm text-white font-medium truncate">
              <span className="hidden sm:inline">
                Descarga gratis la{' '}
              </span>
              <span className="sm:hidden">
                Descarga{' '}
              </span>
              <strong className="text-[var(--color-primary)]">
                Tabla de Retención 2026
              </strong>
              <span className="hidden sm:inline"> (PDF)</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer"
          >
            Descargar
          </button>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
