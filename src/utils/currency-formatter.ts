export function currencyFormatter(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}
