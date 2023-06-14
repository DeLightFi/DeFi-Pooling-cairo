import React from "react";
import moment from "moment";
import { Tx, ImgWrapper, TxInfos, TxDetails } from "./TxSkeletonElements";

const TxSkeletonComponent = ({ }) => {
  const mock_tx = ["", "", "", "", "", "", "", "", ""]
  return (
    <>
      {mock_tx.slice(0, 9).map(function (tx, key) {
        return (
          <Tx key={key}>
            <ImgWrapper>
              <div />
            </ImgWrapper>
            <TxInfos>
              <span />
              <span />
            </TxInfos>
            <TxDetails>
              <span />
              <span />
            </TxDetails>
          </Tx>
        )
      })}
    </>
  );
};

export default TxSkeletonComponent;
