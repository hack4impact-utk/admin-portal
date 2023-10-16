import { Term } from '@/types/models';

export function getTermForDate(date: Date): Term {
  const year = date.getFullYear();
  const month = date.getMonth();
  if (month > 11) {
    throw new Error('Invalid date');
  }
  const term = month >= 0 && month <= 6 ? 'Spring' : 'Fall';
  return `${term} ${year}`;
}

export function getCurrentTerm(): Term {
  return getTermForDate(new Date());
}

export function getTermAfter(term: Term) {
  const [semester, year] = term.split(' ');

  if (semester === 'Fall') {
    const nextYear = parseInt(year) + 1;
    return `Spring ${nextYear}`;
  } else {
    return `Fall ${year}`;
  }
}

export function getTermBefore(term: Term) {
  const [semester, year] = term.split(' ');

  if (semester === 'Fall') {
    return `Spring ${year}`;
  } else {
    const prevYear = parseInt(year) - 1;
    return `Fall ${prevYear}`;
  }
}
