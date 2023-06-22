import React, { useState } from 'react';
import { BorderWrapper, Button, WrapperCol, Container } from './FiltersElements';

const Filters = ({ mode, SetMode }) => {

  const handleButtonClick = (buttonName: string) => {
    SetMode(buttonName);
  };

  return (
    <Container>
      <WrapperCol>
        {['TVL', 'P&L'].map((buttonName) => (
          <BorderWrapper key={buttonName} selected={mode == buttonName}>
            <Button
              onClick={() => handleButtonClick(buttonName)}
            >
              {buttonName}
            </Button>
          </BorderWrapper>

        ))}
      </WrapperCol>
    </Container>
  );
};

export default Filters;

