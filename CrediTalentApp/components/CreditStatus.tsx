import { CREDIT_STATUS_LABEL, DEFAULT_CREDIT_STATUS_LABEL } from '@/lib/constants';

interface CreditStatusProps {
  status: keyof typeof CREDIT_STATUS_LABEL | undefined;
}

const STATUS_STYLES = {
  'REJECTED': {
    container: 'bg-red-50 text-red-500 border-red-500',
    dot: 'bg-red-500'
  },
  'APPROVED': {
    container: 'bg-green-50 text-green-500 border-green-500',
    dot: 'bg-green-500'
  },
  'PENDING': {
    container: 'bg-orange-50 text-[#FF5722] border-[#FF5722]',
    dot: 'bg-[#FF5722]'
  },
  'DEFAULT': {
    container: 'bg-gray-50 text-gray-500 border-gray-500',
    dot: 'bg-gray-500'
  }
};

export default function CreditStatus({ status }: CreditStatusProps) {
  const styles = status ? STATUS_STYLES[status] : STATUS_STYLES['DEFAULT'];
  const label = status ? CREDIT_STATUS_LABEL[status] : DEFAULT_CREDIT_STATUS_LABEL;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit ${styles.container}`}>
      <div className={`h-2 w-2 rounded-full animate-pulse ${styles.dot}`} />
      <span className="text-sm">{label}</span>
    </div>
  );
} 