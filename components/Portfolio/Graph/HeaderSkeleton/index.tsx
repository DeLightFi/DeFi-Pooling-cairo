import { useState } from "react";
import { Title, Container, FlexCol1, FlexCol2, FlexRow } from "./HeaderSkeletonElements";
import Filters from "../Filters";
import FiltersMenu from "../FiltersMenu";

const HeaderSkeleton = ({ selectedButton, setSelectedButton }) => {
  const [mode, SetMode] = useState("TVL")


  return (
    <Container>
      <FlexRow>
        <Filters mode={mode} SetMode={SetMode} />

        {
          mode == "TVL" ?
            <FlexCol1>
              <Title>Total Value Locked</Title>
              <span />
            </FlexCol1>
            :
            <FlexCol1>
              <Title>Prodit and Loss</Title>
              <span />
            </FlexCol1>

        }



        <FlexCol2>
          <Title>Evolution</Title>
          <span />
          <span />
        </FlexCol2>

      </FlexRow>
      <FiltersMenu
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />

    </Container>
  );
};

export default HeaderSkeleton;
