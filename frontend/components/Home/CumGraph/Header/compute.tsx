export function Compute(tokens, selected_data) {
    let first_tvl_dollars_total = 0;
    let last_tvl_dollars_total = 0;
    let tvl_evolution = "0";

    let first_pnl_dollars_total = 0;
    let last_pnl_dollars_total = 0;
    let pnl_evolution = "0";

    if (selected_data.length > 0) {
        tokens.forEach((token, i) => {
            first_tvl_dollars_total += +selected_data[0][`balance_usd_${token.unique_id}`];
            last_tvl_dollars_total +=
                +selected_data[selected_data.length - 1][`balance_usd_${token.unique_id}`];
        });

        tvl_evolution = (
            ((last_tvl_dollars_total - first_tvl_dollars_total) / first_tvl_dollars_total) *
            100
        ).toFixed(2);

        if (tvl_evolution[0] !== "-") {
            tvl_evolution = "+" + tvl_evolution;
        }
    }

    first_pnl_dollars_total = first_tvl_dollars_total - +selected_data[0]["cumulated_cost_USD"];
    last_pnl_dollars_total = last_tvl_dollars_total - +selected_data[selected_data.length - 1]["cumulated_cost_USD"];
    pnl_evolution = (last_pnl_dollars_total - first_pnl_dollars_total).toFixed(2);
    if (pnl_evolution[0] !== "-") {
        pnl_evolution = "+" + pnl_evolution;
    }

    return {
        tvl: { first: first_tvl_dollars_total, last: last_tvl_dollars_total, evo: tvl_evolution },
        pnl: { first: first_pnl_dollars_total, last: last_pnl_dollars_total, evo: pnl_evolution },
    }
}