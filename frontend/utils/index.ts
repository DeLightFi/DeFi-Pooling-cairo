import { Call, number, Provider } from "starknet"


export const ETH = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
export const BOOSTED_ETH = "0x074cdd6e9db755ac36d136bb8b4087d94eae0cf8df2d61bf8a77d8abc6e67996"
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


export async function getCgTokenPrice(): Promise<number> {
    const key = "ethereum";
    const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${key}&vs_currencies=usd`
    )
    const data = await response.json()
    return parseFloat(data[key].usd)
}

export const provider_testnet = new Provider({
    sequencer: { network: 'goerli-alpha' }
})

export async function fetchEthBalance(account_address: string): Promise<number> {
    const provider = provider_testnet
    const calldata: Call = {
        contractAddress: ETH,
        entrypoint: 'balanceOf',
        calldata: [account_address]
    }
    try {
        const data = await provider?.callContract(calldata)
        const output = parseFloat(number.toFelt(data.result[0]))
        return output
    } catch (e) {
        throw new Error((e as unknown as string) || 'Unknown error occurred')
    }
}

export async function fetchEthBoostedBalance(account_address: string): Promise<number> {
    const provider = provider_testnet
    const calldata: Call = {
        contractAddress: BOOSTED_ETH,
        entrypoint: 'balance_of',
        calldata: [account_address]
    }
    try {
        const data = await provider?.callContract(calldata)
        const output = parseFloat(number.toFelt(data.result[0]))
        return output
    } catch (e) {
        throw new Error((e as unknown as string) || 'Unknown error occurred')
    }
}

export async function fetchShareRatio(): Promise<number> {
    const provider = provider_testnet
    const calldata: Call = {
        contractAddress: BOOSTED_ETH,
        entrypoint: 'convert_to_shares',
        calldata: ["1000000000000000000", "0"]
    }
    try {
        const data = await provider?.callContract(calldata)
        const output = parseFloat(number.toFelt(data.result[0])) / 1000000000000000000
        return output
    } catch (e) {
        throw new Error((e as unknown as string) || 'Unknown error occurred')
    }
}