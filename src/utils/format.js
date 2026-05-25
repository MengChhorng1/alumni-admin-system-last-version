export const titleCase = (value = '') => String(value).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
export const compactNumber = (n) => new Intl.NumberFormat('en', { notation: 'compact' }).format(n || 0);
