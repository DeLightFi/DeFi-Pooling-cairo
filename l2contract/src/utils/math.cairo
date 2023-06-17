use traits::Into;

trait MathRounding {
    fn div_up(self: u256, rhs: u256) -> u256;
}

impl MathRoundingImpl of MathRounding {
    fn div_up(self: u256, rhs: u256) -> u256 {
        let q = self / rhs;
        let r = self % rhs;
        if (r == 0.into()) {
            q
        } else {
            q + u256 { low: 1_u128, high: 0_u128 }
        }
    }
}


fn div_wad_down(a: u256, b: u256) -> u256 {
    let WAD: u256 = 1000000000000000000.into();
    mul_div_down(a, WAD, b)
}

fn mul_div_down(a: u256, b: u256, denominator: u256) -> u256 {
    (a * b) / denominator
}