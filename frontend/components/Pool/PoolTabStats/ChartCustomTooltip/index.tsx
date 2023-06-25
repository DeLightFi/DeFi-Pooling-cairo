import React from "react";
import moment from "moment";
import { Container } from "./ChartCustomTooltipElements";

const CustomTooltip = ({ payload }) => {
  if (payload && payload.length) {
    const selected_data = payload[0].payload;

    console.log(selected_data)


    return (
      <Container>
        <span>{moment(new Date(+`${selected_data.timestamp}000`)).format("DD MMMM YYYY h:mm")}</span>
        <span>{(+selected_data.totalValueLockedUSD).toFixed(2)}</span>
      </Container>
    );
  }

  return null;
};

export default CustomTooltip;
