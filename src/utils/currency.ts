export function formatCurrency(amount: number, currency: string): string {
	const [int, dec] = amount.toFixed(2).split(".");
	const intFormatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const formatted = `${intFormatted},${dec}`;
	const isDollar = /^(USD|CLP)$/i.test(currency);
	return isDollar ? `$ ${formatted}` : formatted;
}
