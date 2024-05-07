export const DateFormat = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    // timeStyle: '',
    timeZone: 'Europe/Amsterdam',

});
export const EURO = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
});

export function fullNameFormatter(customer: { firstName: string, lastName: string }) {
    return `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
}

export function formatCurrency(e) {
    const parts = e.target.value.split(',');
    const value = parts[0].replace(/\D/g, '');
    const decimal = parts[1];

    let newValue = new Intl.NumberFormat('nl-NL').format(value);

    // Prevent non-numeric decimal
    if (!isNaN(decimal)) {
        newValue = `${newValue},${decimal}`;
    }

    // Prevent placing 0 when empty
    e.target.value =
        value === '' && newValue === '0' ? '' : newValue;
}