import { Title, Pricefilters, Price, Filters } from "./HeaderElements";

const Header = ({ tvl }) => {
  return (
    <>
      <Title>Total Balance</Title>
      <Pricefilters>
        <Price>
          <>
            <span>${tvl.last.toFixed(2)}</span>
            {tvl.first != 0 ? (
              <span
                style={{
                  color: tvl.evo[0] === "-" ? "#ff3300" : "#a9c035",
                }}
              >
                {tvl.evo}% (${(tvl.last - tvl.first).toFixed(2)})
              </span>
            ) : (
              <></>
            )}
          </>
        </Price>
        <Filters />
      </Pricefilters>
    </>
  );
};

export default Header;
