import React from "react";
import moment from "moment";
import { Container } from "./ChartCustomTooltipElements";

import { formatNumber } from "../../../../utils";


const CustomTooltip = ({ payload }) => {
  if (payload && payload.length) {
    const selected_data = payload[0].payload;

    return (
      <Container>
        <span>{moment(new Date(+`${selected_data.timestamp}000`)).format("DD MMMM YYYY h:mm")}</span>
        <span>{formatNumber(+selected_data.apy)}</span>
      </Container>
    );
  }
  return null;
};
export default CustomTooltip;
