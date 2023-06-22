import Decimal from 'decimal.js'
import { validateAndParseAddress } from 'starknet'

export function formatNumber(num: number) {
    const absNum = Math.abs(num);

    if (absNum >= 1.0e9) {
        // Billions
        return (absNum / 1.0e9).toFixed(2) + ' B';
    } else if (absNum >= 1.0e6) {
        // Millions
        return (absNum / 1.0e6).toFixed(2) + ' M';
    } else if (absNum >= 1.0e3) {
        // Thousands
        return (absNum / 1.0e3).toFixed(2) + ' K';
    } else if (absNum >= 1.0) {
        // Less than thousand
        return num.toFixed(2);
    } else if (absNum > 0 && absNum < 1.0e-4) {
        // Small numbers in scientific notation
        return absNum.toExponential(2);
    } else if (absNum > 0 && absNum < 1.0) {
        // Between 0 and 1, find the first non-zero digit after the decimal point
        const decimalString = absNum.toFixed(20);
        const decimalIndex = decimalString.indexOf('.');
        if (decimalIndex !== -1 && decimalString[decimalIndex + 1] === '5') {
            return decimalString.substring(0, decimalIndex + 2);
        } else {
            let nonZeroIndex = decimalString
                .split('')
                .findIndex((digit, index) => digit !== '0' && index !== 1);
            if (nonZeroIndex === -1) {
                nonZeroIndex = decimalIndex + 2;
            }
            return absNum.toFixed(nonZeroIndex + 1);
        }
    } else {
        return num.toFixed(2);
    }
}


export function formatDecimal(numd: Decimal) {
    const num = numd.toNumber()
    const absNum = Math.abs(num);

    if (absNum >= 1.0e9) {
        // Billions
        return (absNum / 1.0e9).toFixed(2) + ' B';
    } else if (absNum >= 1.0e6) {
        // Millions
        return (absNum / 1.0e6).toFixed(2) + ' M';
    } else if (absNum >= 1.0e3) {
        // Thousands
        return (absNum / 1.0e3).toFixed(2) + ' K';
    } else if (absNum >= 1.0) {
        // Less than thousand
        return num.toFixed(2);
    } else if (absNum > 0 && absNum < 1.0e-4) {
        // Small numbers in scientific notation
        return absNum.toExponential(2);
    } else if (absNum > 0 && absNum < 1.0) {
        // Between 0 and 1, find the first non-zero digit after the decimal point
        const decimalString = absNum.toFixed(20);
        const decimalIndex = decimalString.indexOf('.');
        if (decimalIndex !== -1 && decimalString[decimalIndex + 1] === '5') {
            return decimalString.substring(0, decimalIndex + 2);
        } else {
            let nonZeroIndex = decimalString
                .split('')
                .findIndex((digit, index) => digit !== '0' && index !== 1);
            if (nonZeroIndex === -1) {
                nonZeroIndex = decimalIndex + 2;
            }
            return absNum.toFixed(nonZeroIndex + 1);
        }
    } else {
        return num.toFixed(2);
    }
}

export declare enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42
}


const STARKSCAN_PREFIXES: { [chainId in ChainId]: string } = {
    1: '',
    3: 'testnet.',
    4: 'testnet.',
    5: 'testnet.',
    42: 'testnet.'
}

export default function isZero(hexNumberString: string) {
    return /^0x0*$/.test(hexNumberString)
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(addr: string | null | undefined): string | false {
    try {
        if (addr && !isZero(addr)) {
            return validateAndParseAddress(addr)
        }
        return false
    } catch {
        return false
    }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address)
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(63 - chars)}`
}

export function getStarkscanLink(
    chainId: ChainId,
    data: string,
    type: 'transaction' | 'block' | 'contract'
): string {
    const prefix = `https://${STARKSCAN_PREFIXES[chainId] || STARKSCAN_PREFIXES[1]
        }starkscan.co`

    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'block': {
            return `${prefix}/block/${data}`
        }
        case 'contract':
        default: {
            return `${prefix}/contract/${data}`
        }
    }
}