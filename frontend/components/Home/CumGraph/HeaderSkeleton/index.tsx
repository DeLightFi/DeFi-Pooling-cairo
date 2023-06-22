import { Title, Pricefilters, Price, Filters } from "./HeaderSkeletonElements";

const HeaderSkeleton = ({ notvisible }) => {
  return (
    <div style={{ visibility: notvisible ? 'hidden' : 'visible' }}>
      <Title>Total Balance</Title>
      <Pricefilters>
        <Price>
          <span />
          <span />
        </Price>
        <Filters />
      </Pricefilters>
    </div>
  );
};

export default HeaderSkeleton;
