export function formatCurrency(
	amount: string | number,
	locale: string,
	currency: string
) {
	// Convert amount to float to support string inputs
	const amountFloat = typeof amount === "string" ? parseFloat(amount) : amount;

	// Return number amount formatted by locale
	return new Intl.NumberFormat(locale, {
		currency,
		minimumFractionDigits: 2,
		style: "currency",
	}).format(amountFloat);
}
