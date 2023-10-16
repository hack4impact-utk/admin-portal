import { Term } from '@/types/models';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useTermQuery(defaultTerm: Term) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const term = searchParams.get('t') || defaultTerm;

  const setTerm = (newTerm: Term) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set('t', newTerm);

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  const resetTerm = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.delete('t');

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return { term, setTerm, resetTerm };
}
