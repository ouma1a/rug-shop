// Moroccan dirham, e.g. "24 800 DH" — space-grouped (unambiguous) with the familiar
// "DH" suffix rather than the ISO "MAD" code.
export const formatPrice = (value: number) =>
  `${Math.round(value).toLocaleString('en-US').replace(/,/g, ' ')} DH`
