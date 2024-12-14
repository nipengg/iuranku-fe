export function truncateString(str: string, maxLength: number, ending = "...") {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + ending;
    }
    return str;
}

export function formatRupiah(amount: number ) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);
  }
