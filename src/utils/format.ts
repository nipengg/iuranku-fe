import moment from "moment";

export function truncateString(str: string, maxLength: number, ending = "...") {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + ending;
    }
    return str;
}

export function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export function getFirstDayOfMonth(year: number, monthNumber: number): string {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error("Invalid month number. It should be between 1 and 12.");
    }

    const date = new Date(year, monthNumber - 1, 1);

    const formattedDate = date.toISOString().split('T')[0];

    return formattedDate;
}

export function getFirstDayOfMonthDate(year: number, monthNumber: number): string {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error("Invalid month number. It should be between 1 and 12.");
    }

    return moment({ year, month: monthNumber - 1, day: 1 }).format("YYYY-MM-DD");
}