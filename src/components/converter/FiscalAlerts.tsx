import { evaluateAlerts, type FiscalAlert, type AlertSeverity } from '../../data/fiscal-alerts';
import { formatCurrency } from '../../lib/format';

interface FiscalAlertsProps {
  uvtAmount: number;
  uvtValue: number;
}

const severityStyles: Record<
  AlertSeverity,
  { bg: string; border: string; text: string; icon: string }
> = {
  red: {
    bg: 'bg-[var(--color-alert-red-bg)]',
    border: 'border-[var(--color-alert-red-border)]',
    text: 'text-[var(--color-alert-red)]',
    icon: '⚠',
  },
  orange: {
    bg: 'bg-[var(--color-alert-orange-bg)]',
    border: 'border-[var(--color-alert-orange-border)]',
    text: 'text-[var(--color-alert-orange)]',
    icon: '🔔',
  },
  yellow: {
    bg: 'bg-[var(--color-alert-yellow-bg)]',
    border: 'border-[var(--color-alert-yellow-border)]',
    text: 'text-[var(--color-alert-yellow)]',
    icon: '💡',
  },
};

function AlertCard({
  alert,
  uvtValue,
}: {
  alert: FiscalAlert;
  uvtValue: number;
}) {
  const style = severityStyles[alert.severity];
  const threshold = formatCurrency(alert.thresholdUvt * uvtValue);

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-[var(--radius-md)] p-4`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0" aria-hidden="true">
          {style.icon}
        </span>
        <div className="space-y-1">
          <h3 className={`font-semibold text-sm ${style.text}`}>
            {alert.title}
          </h3>
          <p className="text-sm text-[var(--color-text)]">
            {alert.description}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Umbral: {alert.thresholdUvt} UVT ({threshold}) · {alert.reference}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FiscalAlerts({
  uvtAmount,
  uvtValue,
}: FiscalAlertsProps) {
  const alerts = evaluateAlerts(uvtAmount);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
        Alertas Fiscales
      </h2>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} uvtValue={uvtValue} />
      ))}
    </div>
  );
}
