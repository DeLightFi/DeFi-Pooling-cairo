import { Container, DataRow, Selector, ButtonGroup } from "./CumGraphSkeletonElements";
import HeaderSkeleton from "./HeaderSkeleton";

const GraphNoData = () => {

  return (
    <>
      <HeaderSkeleton notvisible={true} />
      <Container>
        <DataRow>
          <Selector>
          </Selector>
        </DataRow>
        <div className="svgwrapper">
          In order to use this feature, please just add at least one wallet using the right sidebar.
        </div>
      </Container >
    </>
  );
};

export default GraphNoData;
