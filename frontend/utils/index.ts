
export function formatNumber(num: number) {
    if (Math.abs(num) >= 1.0e9) {
        // Billions
        return (Math.abs(num) / 1.0e9).toFixed(2) + ' B'
    } else if (Math.abs(num) >= 1.0e6) {
        // Millions
        return (Math.abs(num) / 1.0e6).toFixed(2) + ' M'
    } else if (Math.abs(num) >= 1.0e3) {
        // Thousands
        return (Math.abs(num) / 1.0e3).toFixed(2) + ' K'
    } else if (Math.abs(num) >= 1.0) {
        // Less than thousand
        return Math.abs(num).toFixed(2)
    } else if (Math.abs(num) > 0 && Math.abs(num) < 1.0e-4) {
        // Small numbers in scientific notation
        return Math.abs(num).toExponential(2)
    } else if (Math.abs(num) > 0 && Math.abs(num) < 1.0) {
        // Between 0 and 1, find the first non-zero digit after the decimal point
        const decimalString = Math.abs(num).toFixed(20)
        const decimalIndex = decimalString.indexOf('.')
        if (decimalIndex !== -1 && decimalString[decimalIndex + 1] === '5') {
            return decimalString.substring(0, decimalIndex + 2)
        } else {
            let nonZeroIndex = decimalString
                .split('')
                .findIndex((digit, index) => digit !== '0' && index !== 1)
            if (nonZeroIndex === -1) {
                nonZeroIndex = decimalIndex + 2
            }
            return Math.abs(num).toFixed(nonZeroIndex + 1)
        }
    } else {
        return Math.abs(num).toFixed(2)
    }
}