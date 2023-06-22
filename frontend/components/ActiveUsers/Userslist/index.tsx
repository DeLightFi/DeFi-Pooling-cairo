import Link from "next/link";
import ActiveUsersGraph from "../ActiveUsersGraph";
import { Container, Elem } from "./UserlistElements";

const Userlist = ({ activeusers }) => {
  const colors = ['green'];

  return (
    <Container>
      {activeusers.filter((u) => !u.address.startsWith('0x0123456789')).map((user, index) => {
        return (
          <Link href={`./dashboard/${user.address}`}>
            <Elem>
              <ActiveUsersGraph data={user.lm_data} color={colors[index % colors.length]} />
              <div>
                <span className="price">${user.lm_data[user.lm_data.length - 1].balance_usd.toFixed(2)}</span>
                <span>${user.lm_pnl_evo === '+Infinity' ? '' : `${user.lm_pnl_evo}`} <span>PNL</span></span>
                <span>{user.lm_tvl_evo === '+Infinity' ? '' : `${user.lm_tvl_evo}%`} <span>TVL</span></span>
                <span className="address">{user.address.startsWith('0x1234567')} {user.address.slice(0, 6)}...{user.address.slice(user.address.length - 4, user.address.length)}</span>
              </div>
            </Elem>
          </Link>
        )
      })}
    </Container>
  );
};

export default Userlist;
