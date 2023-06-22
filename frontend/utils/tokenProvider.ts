import Decimal from 'decimal.js'

interface ERC20Details {
    address: string
    symbol: string
    name: string
    decimals: Decimal
    logo: string
    color: string
    starken_name: string
}

interface DerivativeTokenDetails {
    address: string
    symbol: string
    name: string
    decimals: Decimal
    logo: string
    protocol_name: string
    underlyings: string[]
    type: string
    starken_name: string
}

export class TokenProvider {
    private readonly erc20Tokens: ERC20Details[] = [
        // Add all ERC20 token details here
        {
            address: '0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac',
            symbol: 'WBTC',
            name: 'Wrapped BTC',
            decimals: new Decimal(8),
            logo: WBTC_logo,
            color: '#f7931a',
            starken_name: 'WBTC'
        },
        {
            address:
                '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: new Decimal(6),
            logo: USDC_logo,
            color: '#2775ca',
            starken_name: 'USDC'
        },
        {
            address:
                '0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8',
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: new Decimal(6),
            logo: USDT_logo,
            color: '#53ae94',
            starken_name: 'USDT'
        },
        {
            address:
                '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
            symbol: 'ETH',
            name: 'Ether',
            decimals: new Decimal(18),
            logo: ETH_logo,
            color: '#627eea',
            starken_name: 'ETH'
        },
        {
            address:
                '0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3',
            symbol: 'DAI',
            name: 'DAI',
            decimals: new Decimal(18),
            logo: DAI_logo,
            color: '#f5ac37',
            starken_name: 'DAI'
        }
    ]

    private readonly derivativeTokens: DerivativeTokenDetails[] = [
        {
            address:
                '0x044d13ad98a46fd2322ef2637e5e4c292ce8822f47b7cb9a1d581176a801c1a0',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['WBTC', 'USDT'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_WBTC_USDT'
        },
        {
            address:
                '0x0260e98362e0949fefff8b4de85367c035e44f734c9f8069b6ce2075ae86b45c',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['WBTC', 'ETH'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_WBTC_ETH'
        },
        {
            address:
                '0x005a8054e5ca0b277b295a830e53bd71a6a6943b42d0dbb22329437522bc80c8',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['WBTC', 'USDC'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_WBTC_USDC'
        },
        {
            address:
                '0x039c183c8e5a2df130eefa6fbaa3b8aad89b29891f6272cb0c90deaa93ec6315',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['DAI', 'WBTC'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_DAI_WBTC'
        },
        {
            address:
                '0x045e7131d776dddc137e30bdd490b431c7144677e97bf9369f629ed8d3fb7dd6',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['ETH', 'USDT'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_ETH_USDT'
        },
        {
            address:
                '0x00f0f5b3eed258344152e1f17baf84a2e1b621cd754b625bec169e8595aea767',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['DAI', 'USDT'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_DAI_USDT'
        },
        {
            address:
                '0x00cfd39f5244f7b617418c018204a8a9f9a7f72e71f0ef38f968eeb2a9ca302b',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['DAI', 'USDC'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_ETH_USDC'
        },
        {
            address:
                '0x05801bdad32f343035fb242e98d1e9371ae85bc1543962fedea16c59b35bd19b',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['USDC', 'USDT'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_USDC_USDT'
        },
        {
            address:
                '0x04d0390b777b424e43839cd1e744799f3de6c176c7e32c1812a41dbd9c19db6a',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['ETH', 'USDC'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_ETH_USDC'
        },
        {
            address:
                '0x07e2a13b40fc1119ec55e0bcf9428eedaa581ab3c924561ad4e955f95da63138',
            symbol: 'Jedi-P',
            name: 'JediSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Jediswap',
            underlyings: ['DAI', 'ETH'],
            type: 'Volatile LP',
            starken_name: 'JEDI-P_DAI_ETH'
        },
        {
            address:
                '0x02a6e0ecda844736c4803a385fb1372eff458c365d2325c7d4e08032c7a908f3',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['WBTC', 'ETH'],
            type: 'Volatile LP',
            starken_name: '10K-P_WBTC_ETH'
        },
        {
            address:
                '0x041d52e15e82b003bf0ad52ca58393c87abef3e00f1bf69682fd4162d5773f8f',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['DAI', 'USDT'],
            type: 'Volatile LP',
            starken_name: '10K-P_DAI_USDT'
        },
        {
            address:
                '0x041a708cf109737a50baa6cbeb9adf0bf8d97112dc6cc80c7a458cbad35328b0',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['USDC', 'USDT'],
            type: 'Volatile LP',
            starken_name: '10K-P_USDC_USDT'
        },
        {
            address:
                '0x050031010bcee2f43575b3afe197878e064e1a03c12f2ff437f29a2710e0b6ef',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['WBTC', 'USDT'],
            type: 'Volatile LP',
            starken_name: '10K-P_WBTC_USDT'
        },

        {
            address:
                '0x02e767b996c8d4594c73317bb102c2018b9036aee8eed08ace5f45b3568b94e5',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['DAI', 'USDC'],
            type: 'Volatile LP',
            starken_name: '10K-P_DAI_USDC'
        },

        {
            address:
                '0x00f9d8f827734f5fd54571f0e78398033a3c1f1074a471cd4623f2aa45163718',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['DAI', 'WBTC'],
            type: 'Volatile LP',
            starken_name: '10K-P_DAI_WBTC'
        },
        {
            address:
                '0x022e45d94d5c6c477d9efd440aad71b2c02a5cd5bed9a4d6da10bb7c19fd93ba',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['WBTC', 'USDC'],
            type: 'Volatile LP',
            starken_name: '10K-P_WBTC_USDC'
        },
        {
            address:
                '0x05900cfa2b50d53b097cb305d54e249e31f24f881885aae5639b0cd6af4ed298',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['ETH', 'USDT'],
            type: 'Volatile LP',
            starken_name: '10K-P_WBTC_USDT'
        },
        {
            address:
                '0x017e9e62c04b50800d7c59454754fe31a2193c9c3c6c92c093f2ab0faadf8c87',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['DAI', 'ETH'],
            type: 'Volatile LP',
            starken_name: '10K-P_DAI_ETH'
        },
        {
            address:
                '0x000023c72abdf49dffc85ae3ede714f2168ad384cc67d08524732acea90df325',
            symbol: '10K-P',
            name: '10KSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: '10kswap',
            underlyings: ['ETH', 'USDC'],
            type: 'Volatile LP',
            starken_name: '10K-P_ETH_USDC'
        },
        {
            address:
                '0x0032ebb8e68553620b97b308684babf606d9556d5c0a652450c32e85f40d000d',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['DAI', 'ETH'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_DAI_ETH'
        },
        {
            address:
                '0x05e86d570376e8dc917d241288150a3286c8ad7151638c152d787eca2b96aec3',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['ETH', 'USDT'],
            type: 'Stable LP',
            starken_name: 'SITH-P_ETH_USDT'
        },
        {
            address:
                '0x00691fa7f66d63dc8c89ff4e77732fff5133f282e7dbd41813273692cc595516',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['ETH', 'USDT'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDT'
        },
        {
            address:
                '0x06e1ed57b7e9fed35364ca419340c47479e93206a2dcda5e50530ae198d872ea',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['ETH', 'USDC'],
            type: 'Stable LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x0601f72228f73704e827de5bcd8dadaad52c652bb1e42bf492d90bbe22df2cec',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['USDC', 'USDT'],
            type: 'Stable LP',
            starken_name: 'SITH-P_USDC_USDT'
        },
        {
            address:
                '0x02aab581754064a87ade1b680fd9756dc3a17440a87aaf496dcfb39fd163d1dd',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['DAI', 'ETH'],
            type: 'Stable LP',
            starken_name: 'SITH-P_DAI_ETH'
        },
        {
            address:
                '0x015e9cd2d4d6b4bb9f1124688b1e6bc19b4ff877a01011d28c25c9ee918e83e5',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['DAI', 'USDC'],
            type: 'Stable LP',
            starken_name: 'SITH-P_DAI_USDC'
        },
        {
            address:
                '0x030615bec9c1506bfac97d9dbd3c546307987d467a7f95d5533c2e861eb81f3f',
            symbol: 'Sith-P',
            name: 'SithSwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Sithswap',
            underlyings: ['ETH', 'USDC'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x07c662b10f409d7a0a69c8da79b397fd91187ca5f6230ed30effef2dceddc5b3',
            symbol: 'My-P',
            name: 'MySwap Pair',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'MySwap',
            underlyings: ['DAI', 'ETH'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x025b392609604c75d62dde3d6ae98e124a31b49123b8366d7ce0066ccb94f696',
            symbol: 'My-P',
            name: 'MySwap Pair',
            decimals: new Decimal(7),
            logo: '',
            protocol_name: 'MySwap',
            underlyings: ['WBTC', 'USDC'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x041f9a1e9a4d924273f5a5c0c138d52d66d2e6a8bee17412c6b0f48fe059ae04',
            symbol: 'My-P',
            name: 'MySwap Pair',
            decimals: new Decimal(12),
            logo: '',
            protocol_name: 'MySwap',
            underlyings: ['ETH', 'USDT'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x022b05f9396d2c48183f6deaf138a57522bcc8b35b67dee919f76403d1783136',
            symbol: 'My-P',
            name: 'MySwap Pair',
            decimals: new Decimal(12),
            logo: '',
            protocol_name: 'MySwap',
            underlyings: ['ETH', 'USDC'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x01ea237607b7d9d2e9997aa373795929807552503683e35d8739f4dc46652de1',
            symbol: 'My-P',
            name: 'MySwap Pair',
            decimals: new Decimal(6),
            logo: '',
            protocol_name: 'MySwap',
            underlyings: ['USDC', 'USDT'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x0611e8f4f3badf1737b9e8f0ca77dd2f6b46a1d33ce4eed951c6b18ac497d505',
            symbol: 'My-P',
            name: 'MySwap Pair',
            decimals: new Decimal(12),
            logo: '',
            protocol_name: 'MySwap',
            underlyings: ['DAI', 'USDC'],
            type: 'Volatile LP',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x07aba50fdb4e024c1ba63e2c60565d0fd32566ff4b18aa5818fc80c30e749024',
            symbol: 'ETH/USDC call',
            name: 'ETH/USDC Call Pool',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Carmine',
            underlyings: ['ETH'],
            type: 'ETH/USDC Call Pool',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x018a6abca394bd5f822cfa5f88783c01b13e593d1603e7b41b00d31d2ea4827a',
            symbol: 'ETH/USDC put',
            name: 'ETH/USDC Put Pool',
            decimals: new Decimal(6),
            logo: '',
            protocol_name: 'Carmine',
            underlyings: ['USDC'],
            type: 'ETH/USDC Put Pool',
            starken_name: 'SITH-P_ETH_USDC'
        },
        {
            address:
                '0x01b5bd713e72fdc5d63ffd83762f81297f6175a5e0a4771cdadbc1dd5fe72cb1',
            symbol: 'ZK-P',
            name: 'Zklend Pool',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Zklend',
            underlyings: ['ETH'],
            type: 'Lending Pool',
            starken_name: ''
        },
        {
            address:
                '0x062fa7afe1ca2992f8d8015385a279f49fad36299754fb1e9866f4f052289376',
            symbol: 'ZK-P',
            name: 'Zklend Pool',
            decimals: new Decimal(18),
            logo: '',
            protocol_name: 'Zklend',
            underlyings: ['DAI'],
            type: 'Lending Pool',
            starken_name: ''
        },
        {
            address:
                '0x047ad51726d891f972e74e4ad858a261b43869f7126ce7436ee0b2529a98f486',
            symbol: 'ZK-P',
            name: 'Zklend Pool',
            decimals: new Decimal(6),
            logo: '',
            protocol_name: 'Zklend',
            underlyings: ['USDC'],
            type: 'Lending Pool',
            starken_name: ''
        },
        {
            address:
                '0x02b9ea3acdb23da566cee8e8beae3125a1458e720dea68c4a9a7a2d8eb5bbb4a',
            symbol: 'ZK-P',
            name: 'Zklend Pool',
            decimals: new Decimal(8),
            logo: '',
            protocol_name: 'Zklend',
            underlyings: ['WBTC'],
            type: 'Lending Pool',
            starken_name: ''
        },
        {
            address:
                '0x00811d8da5dc8a2206ea7fd0b28627c2d77280a515126e62baa4d78e22714c4a',
            symbol: 'ZK-P',
            name: 'Zklend Pool',
            decimals: new Decimal(6),
            logo: '',
            protocol_name: 'Zklend',
            underlyings: ['USDT'],
            type: 'Lending Pool',
            starken_name: ''
        },
    ]

    // getTokenByAddress(address: string): ERC20Details | null {
    //     return this.erc20Tokens.find((token) => token.address === address) || null
    // }

    getLpTokenByAddress(address: string): DerivativeTokenDetails | null {
        return this.derivativeTokens.find((token) => token.address === address) || null
    }

    getTokenByAddress(address: string): ERC20Details | DerivativeTokenDetails | null {
        const erc20Token = this.erc20Tokens.find((token) => token.address === address);
        const derivativeToken = this.derivativeTokens.find((token) => token.address === address);

        if (erc20Token) {
            return erc20Token;
        }

        if (derivativeToken) {
            return derivativeToken;
        }

        return null;
    }


    getTokens(): ERC20Details[] {
        return this.erc20Tokens
    }

    getTokenBySymbol(symbol: string): ERC20Details | null {
        return this.erc20Tokens.find((token) => token.symbol === symbol) || null
    }

    getDerivativeByAddress(address: string): DerivativeTokenDetails | null {
        return (
            this.derivativeTokens.find((token) => token.address === address) || null
        )
    }

    getDerivatives(): DerivativeTokenDetails[] {
        return this.derivativeTokens
    }

    getderivativeTokensByProtocol(protocol: string): DerivativeTokenDetails[] {
        return this.derivativeTokens.filter(
            (token) => token.protocol_name === protocol
        )
    }
}

const WBTC_logo = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
viewBox="0 0 4091.27 4091.73"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <g id="_1421344023328">
   <path fill="#F7931A" fill-rule="nonzero" d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"/>
   <path fill="white" fill-rule="nonzero" d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"/>
  </g>
 </g>
</svg>
`

export const ETH_logo = `
<svg xmlns="http://www.w3.org/2000/svg" width="2500" height="2500" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA"/><g fill="#FFF" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/><path d="M16.498 4L9 16.22l7.498-3.35z"/><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/><path d="M16.498 27.995v-6.028L9 17.616z"/><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>
`

const DAI_logo = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
viewBox="0 0 444.44 444.44"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <path fill="#F5AC37" fill-rule="nonzero" d="M222.22 0c122.74,0 222.22,99.5 222.22,222.22 0,122.74 -99.48,222.22 -222.22,222.22 -122.72,0 -222.22,-99.49 -222.22,-222.22 0,-122.72 99.5,-222.22 222.22,-222.22z"/>
  <path fill="#FEFEFD" fill-rule="nonzero" d="M230.41 237.91l84.44 0c1.8,0 2.65,0 2.78,-2.36 0.69,-8.59 0.69,-17.23 0,-25.83 0,-1.67 -0.83,-2.36 -2.64,-2.36l-168.05 0c-2.08,0 -2.64,0.69 -2.64,2.64l0 24.72c0,3.19 0,3.19 3.33,3.19l82.78 0zm77.79 -59.44c0.24,-0.63 0.24,-1.32 0,-1.94 -1.41,-3.07 -3.08,-6 -5.02,-8.75 -2.92,-4.7 -6.36,-9.03 -10.28,-12.92 -1.85,-2.35 -3.99,-4.46 -6.39,-6.25 -12.02,-10.23 -26.31,-17.47 -41.67,-21.11 -7.75,-1.74 -15.67,-2.57 -23.61,-2.5l-74.58 0c-2.08,0 -2.36,0.83 -2.36,2.64l0 49.3c0,2.08 0,2.64 2.64,2.64l160.27 0c0,0 1.39,-0.28 1.67,-1.11l-0.68 0zm0 88.33c-2.36,-0.26 -4.74,-0.26 -7.1,0l-154.02 0c-2.08,0 -2.78,0 -2.78,2.78l0 48.2c0,2.22 0,2.78 2.78,2.78l71.11 0c3.4,0.26 6.8,0.02 10.13,-0.69 10.32,-0.74 20.47,-2.98 30.15,-6.67 3.52,-1.22 6.92,-2.81 10.13,-4.72l0.97 0c16.67,-8.67 30.21,-22.29 38.75,-39.01 0,0 0.97,-2.1 -0.12,-2.65zm-191.81 78.75l0 -0.83 0 -32.36 0 -10.97 0 -32.64c0,-1.81 0,-2.08 -2.22,-2.08l-30.14 0c-1.67,0 -2.36,0 -2.36,-2.22l0 -26.39 32.22 0c1.8,0 2.5,0 2.5,-2.36l0 -26.11c0,-1.67 0,-2.08 -2.22,-2.08l-30.14 0c-1.67,0 -2.36,0 -2.36,-2.22l0 -24.44c0,-1.53 0,-1.94 2.22,-1.94l29.86 0c2.08,0 2.64,0 2.64,-2.64l0 -74.86c0,-2.22 0,-2.78 2.78,-2.78l104.16 0c7.56,0.3 15.07,1.13 22.5,2.5 15.31,2.83 30.02,8.3 43.47,16.11 8.92,5.25 17.13,11.59 24.44,18.89 5.5,5.71 10.46,11.89 14.86,18.47 4.37,6.67 8,13.8 10.85,21.25 0.35,1.94 2.21,3.25 4.15,2.92l24.86 0c3.19,0 3.19,0 3.33,3.06l0 22.78c0,2.22 -0.83,2.78 -3.06,2.78l-19.17 0c-1.94,0 -2.5,0 -2.36,2.5 0.76,8.46 0.76,16.95 0,25.41 0,2.36 0,2.64 2.65,2.64l21.93 0c0.97,1.25 0,2.5 0,3.76 0.14,1.61 0.14,3.24 0,4.85l0 16.81c0,2.36 -0.69,3.06 -2.78,3.06l-26.25 0c-1.83,-0.35 -3.61,0.82 -4.03,2.64 -6.25,16.25 -16.25,30.82 -29.17,42.5 -4.72,4.25 -9.68,8.25 -14.86,11.94 -5.56,3.2 -10.97,6.53 -16.67,9.17 -10.49,4.72 -21.49,8.2 -32.78,10.41 -10.72,1.92 -21.59,2.79 -32.5,2.64l-96.39 0 0 -0.14z"/>
 </g>
</svg>
`

const USDC_logo = `
<svg data-name="86977684-12db-4850-8f30-233a7c267d11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
  <path d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z" fill="#2775ca"/>
  <path d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z" fill="#fff"/>
  <path d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z" fill="#fff"/>
</svg>
`

const USDT_logo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="2000" height="2000"><path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0" fill="#53ae94"/><path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#fff"/></svg>
`
