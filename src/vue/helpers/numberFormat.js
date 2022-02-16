export default function numberFormat(value) {
  if (value === undefined || typeof value === 'string') {
    return '';
  }
  return new Intl.NumberFormat().format(Math.abs(value));
}
