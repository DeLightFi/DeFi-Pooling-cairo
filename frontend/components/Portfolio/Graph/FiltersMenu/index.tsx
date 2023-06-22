import React, { useState } from 'react';
import { BorderWrapper, Button, ButtonGrid, Wrapper } from './FiltersMenuElements';

const FiltersMenu = ({ selectedButton, setSelectedButton }) => {

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
    };


    return (
        <Wrapper>
            <ButtonGrid>
                {['Chart', 'Holdings'].map((buttonName) => (
                    <BorderWrapper key={buttonName} selected={buttonName == selectedButton}>
                        <Button

                            onClick={() => handleButtonClick(buttonName)}
                        >
                            {buttonName}
                        </Button>
                    </BorderWrapper>

                ))}
            </ButtonGrid>
        </Wrapper>
    );
};

export default FiltersMenu;
