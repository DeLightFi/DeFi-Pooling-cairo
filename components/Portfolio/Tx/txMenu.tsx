import React from 'react';
import { BorderWrapper, Button, ButtonGrid, Wrapper } from './txMenuElements';

const TxMenu = ({ selectedTxMenu, setSelectedTxMenu }) => {

    const handleButtonClick = (buttonName: string) => {
        setSelectedTxMenu(buttonName);
    };


    return (
        <Wrapper>
            <ButtonGrid>
                {['Swap', 'Deposit', 'Withdraw', 'Transfer', 'Approval', 'State'].map((buttonName) => (
                    <BorderWrapper key={buttonName} selected={buttonName == selectedTxMenu}>
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

export default TxMenu;
