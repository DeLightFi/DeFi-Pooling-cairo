import Decimal from 'decimal.js'
import { formatDecimal, formatNumber } from '.'
import { TokenProvider } from './tokenProvider'

const morphineApiBaseUrl = "https://goldfish-app-cteyn.ondigitalocean.app/"


export interface ApiResponseYield {
  token0Reserve: Decimal
  token1Reserve: Decimal
  token0ReserveUSD: Decimal
  token1ReserveUSD: Decimal
  performance: Decimal
  token0Volume: Decimal
  token1Volume: Decimal
  token0VolumeUSD: Decimal
  token1VolumeUSD: Decimal
  token0Fees: Decimal
  token1Fees: Decimal
  token0FeesUSD: Decimal
  token1FeesUSD: Decimal
  apr: Decimal
  timestamp: Date
}

export interface SwapEvent extends Document {
  hash: string
  block: number
  timestamp: number
  tokenIn: string
  amountIn: Decimal
  tokenOut: string
  amountOut: Decimal
  to: string
}

export interface DepositEvent extends Document {
  hash: string
  block: number
  timestamp: number
  tokenIn: [string]
  amountIn: [Decimal]
  to: string
}

export interface WithdrawEvent extends Document {
  hash: string
  block: number
  timestamp: number
  tokenOut: [string]
  amountOut: [Decimal]
  to: string
}


export interface TokenSwapEventData {
  [tokenAddess: string]: SwapEvent[]
}

export interface TokenDepositEventData {
  [tokenAddess: string]: DepositEvent[]
}

export interface TokenWithdrawEventData {
  [tokenAddess: string]: WithdrawEvent[]
}

interface IApprovalBalance extends Document {
  block: number;
  timestamp: number;
  amount: Decimal;
  owner: string;
  spender: string;
  allowance_storage: string;

}

interface ITokenApprovalBalances {
  [spenderAddress: string]: IApprovalBalance[];
}

export async function getUserPastSwapTxForTokens(owner: string): Promise<TokenSwapEventData> {
  try {
    console.log("starting swap")
    const response = await fetch(`${morphineApiBaseUrl}swap_events/all_token/${owner}`);
    const data = await response.json();
    const tokenSwapEventData: TokenSwapEventData = {};
    for (const tokenName in data) {
      tokenSwapEventData[tokenName] = data[tokenName].map((item: any) => ({
        ...item,
        amountIn: new Decimal(item.amountIn.$numberDecimal),
        amountOut: new Decimal(item.amountOut.$numberDecimal),
        timestamp: new Date(item.timestamp),
      })) as SwapEvent[];
    }
    return tokenSwapEventData;
  } catch (error) {
    console.error('An error occurred while retrieving past swap transactions for tokens:', error);
    throw error;
  }
}


export async function getUserPastDepositTxForTokens(owner: string): Promise<TokenDepositEventData> {
  console.log("starting deposit")
  try {
    const response = await fetch(`${morphineApiBaseUrl}deposit_events/all_token/${owner}`);
    const data = await response.json();
    const tokenDepositEventData: TokenDepositEventData = {};
    for (const tokenName in data) {
      tokenDepositEventData[tokenName] = data[tokenName].map((item: any) => ({
        ...item,
        amountIn: item.amountIn.map(
          (amount: any) => new Decimal(amount.$numberDecimal)
        ),
        timestamp: new Date(item.timestamp),
      })) as DepositEvent[];
    }
    return tokenDepositEventData;
  } catch (error) {
    console.error('An error occurred while retrieving past deposit transactions for tokens:', error);
    throw error;
  }
}

export async function getUserPastWithdrawTxForTokens(owner: string): Promise<TokenWithdrawEventData> {
  console.log("starting withdraw")
  try {
    const response = await fetch(`${morphineApiBaseUrl}withdraw_events/all_token/${owner}`);
    const data = await response.json();
    const tokenWithdrawEventData: TokenWithdrawEventData = {};
    for (const tokenName in data) {
      tokenWithdrawEventData[tokenName] = data[tokenName].map((item: any) => ({
        ...item,
        amountOut: item.amountOut.map(
          (amount: any) => new Decimal(amount.$numberDecimal)
        ),
        timestamp: new Date(item.timestamp),
      })) as WithdrawEvent[];
    }
    return tokenWithdrawEventData;
  } catch (error) {
    console.error('An error occurred while retrieving past withdraw transactions for tokens:', error);
    throw error;
  }
}


export async function getUserPastApprovalsBalanceForTokens(owner: string): Promise<ITokenApprovalBalances> {
  try {
    console.log("starting approval")
    const response = await fetch(`${morphineApiBaseUrl}approval/balance_all/${owner}`);
    const data = await response.json();
    const tokenAllowanceBalanceData: ITokenApprovalBalances = {};
    for (const tokenName in data) {
      tokenAllowanceBalanceData[tokenName] = data[tokenName].map((item: any) => ({
        ...item,
        amount: new Decimal(item.amount.$numberDecimal),
        timestamp: new Date(item.timestamp),
      })) as IApprovalBalance[];
    }
    return tokenAllowanceBalanceData;
  } catch (error) {
    console.error('An error occurred while retrieving past approval update for tokens:', error);
    throw error;
  }
}

export interface YieldEvents {
  type: string
  protocol: string;
  description: string
  additional: string
  sender: string
  hash: string
  timestamp: number
}


export async function getDeFiUserYieldEvents(
  owner: string
): Promise<YieldEvents[]> {


  const [tokenToSwapEvents, tokenToDepositEvents, tokenToWithdrawEvents, tokenAllowanceBalance] = await Promise.all([
    getUserPastSwapTxForTokens(owner),
    getUserPastDepositTxForTokens(owner),
    getUserPastWithdrawTxForTokens(owner),
    getUserPastApprovalsBalanceForTokens(owner)
  ])



  const events: YieldEvents[] = []
  const tokenProvider = new TokenProvider()

  // Process swap events
  Object.keys(tokenToSwapEvents).map((tokenAddress, idx) => {
    const swapEvents = tokenToSwapEvents[tokenAddress];
    events.push(
      ...swapEvents.map((event) => {
        const tokenInSymb = tokenProvider.getTokenByAddress(event.tokenIn)?.symbol
        const tokenOutSymb = tokenProvider.getTokenByAddress(
          event.tokenOut
        )?.symbol
        const description = `${formatDecimal(
          event.amountIn
        )} ${tokenInSymb} to ${formatDecimal(event.amountOut)} ${tokenOutSymb}`

        let proto = tokenProvider.getLpTokenByAddress(tokenAddress).protocol_name
        return {
          type: 'Swap',
          protocol: proto,
          description: description,
          additional: "",
          sender: event.to,
          hash: event.hash,
          timestamp: event.timestamp
        }
      })
    )
  })

  Object.keys(tokenToDepositEvents).map((tokenAddress, idx) => {
    const depositEvents = tokenToDepositEvents[tokenAddress];
    events.push(
      ...depositEvents.map((event) => {
        const description = event.tokenIn
          .map((token, index) => {
            const tokenSymb = tokenProvider.getTokenByAddress(
              event.tokenIn[index]
            )?.symbol
            return `${formatDecimal(event.amountIn[index])} ${tokenSymb}`
          })
          .join(' + ')
        let proto = tokenProvider.getLpTokenByAddress(tokenAddress).protocol_name

        return {
          type: 'Deposit',
          protocol: proto,
          description: description,
          additional: "",
          sender: event.to,
          hash: event.hash,
          timestamp: event.timestamp
        }
      })
    )
  })

  Object.keys(tokenToWithdrawEvents).map((tokenAddress, idx) => {
    const withdrawEvents = tokenToWithdrawEvents[tokenAddress];
    events.push(
      ...withdrawEvents.map((event) => {
        const description = event.tokenOut
          .map((token, index) => {
            const tokenSymb = tokenProvider.getTokenByAddress(
              event.tokenOut[index]
            )?.symbol
            return `${formatDecimal(event.amountOut[index])} ${tokenSymb}`
          })
          .join(' + ')
        let proto = tokenProvider.getLpTokenByAddress(tokenAddress).protocol_name
        return {
          type: 'Withdraw',
          protocol: proto,
          description: description,
          additional: "",
          sender: event.to,
          hash: event.hash,
          timestamp: event.timestamp
        }
      })
    )
  })


  Object.keys(tokenAllowanceBalance).map((tokenAddress, idx) => {
    const allowanceBalances = tokenAllowanceBalance[tokenAddress];
    events.push(
      ...allowanceBalances.map((allowanceBalance) => {
        const token = tokenProvider.getTokenByAddress(tokenAddress)
        const description = `${formatDecimal(allowanceBalance.amount)} ${token.symbol}`
        return {
          type: 'Approval',
          protocol: '',
          description: description,
          additional: allowanceBalance.spender,
          sender: allowanceBalance.owner,
          hash: token.starken_name,
          timestamp: allowanceBalance.timestamp
        }
      })
    )
  })



  console.log("here")
  console.log(events)
  // Sort events by decreasing timestamp
  events.sort((a, b) => b.timestamp - a.timestamp)
  return events
}

function getTimeSinceNow(timestamp: number): string {
  const now = Date.now()
  const timeDiff = now - timestamp

  const seconds = Math.floor(timeDiff / 1000)
  if (seconds < 60) {
    return `${seconds} seconds ago`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minutes ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hours ago`
  }

  const days = Math.floor(hours / 24)
  return `${days} days ago`
}
