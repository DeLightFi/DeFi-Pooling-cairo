use traits::Into;

trait MathRounding {
    fn div_up(self: u256, rhs: u256) -> u256;
}

impl MathRoundingImpl of MathRounding {
    fn div_up(self: u256, rhs: u256) -> u256 {
        let q = self.low / rhs.low;
        let r = self.low % rhs.low;
        if (r == 0_u128) {
            u256 { low: q, high: 0_u128 }
        } else {
            u256 { low: q, high: 0_u128 } + u256 { low: 1_u128, high: 0_u128 }
        }
    }
}


fn div_wad_down(a: u256, b: u256) -> u256 {
    let WAD: u256 = 1000000000000000000.into();
    mul_div_down(a, WAD, b)
}

fn mul_div_down(a: u256, b: u256, denominator: u256) -> u256 {
    u256 { low: (a.low * b.low) / denominator.low, high: 0_u128 }
}
