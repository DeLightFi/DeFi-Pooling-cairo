import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../../../CheckBox';
import {
  Button,
  Container,
  Token,
  FilterSelect,
  FilterOption,
  SelectAllText,
} from './TokensSelectorElements';

const TokensSelector = ({
  tokens,
  filters,
  setFilters,
  selectedDisplayMode,
  setSelectedDisplayMode
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null); // new hovered button state

  // Divide the tokens into the four categories
  const nativeTokens = tokens.filter((token) => token.type === 'native');
  const defiTokens = tokens.filter(
    (token) => token.type !== 'native' && token.type !== 'nft' && token.type !== 'events'
  );
  const nftTokens = tokens.filter((token) => token.type === 'nft');
  // const eventTokens = tokens.filter((token) => token.type === 'events');

  const handleButtonMouseEnter = (buttonName: string) => {
    setHoveredButton(buttonName);
  };

  const handleButtonMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleButtonClick = (buttonName: string) => {
    setSelectedDisplayMode(buttonName);
  };




  function updateFilters(e: React.ChangeEvent<HTMLInputElement>, token) {
    e.stopPropagation();
    const newFilters = { ...filters };
    newFilters[token.unique_id] = e.target.checked;
    setFilters(newFilters);
  }

  function handleSetAllFiltersTokens() {
    const newFilters = { ...filters };
    for (let index = 0; index < nativeTokens.length; index++) {
      newFilters[nativeTokens[index].unique_id] = true;
    }
    setFilters(newFilters);
  }

  function handleSetAllFiltersDefi() {
    const newFilters = { ...filters };
    for (let index = 0; index < defiTokens.length; index++) {
      newFilters[defiTokens[index].unique_id] = true;
    }
    setFilters(newFilters);
  }

  function handleSetAllFiltersNft() {
    const newFilters = { ...filters };
    for (let index = 0; index < nftTokens.length; index++) {
      newFilters[nftTokens[index].unique_id] = true;
    }
    setFilters(newFilters);
  }

  function handleSetAllAll() {
    handleSetAllFiltersTokens()
    handleSetAllFiltersDefi()
    handleSetAllFiltersNft()
  }



  const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 130px;  // Add the width here
`;

  const DropdownMenu = styled.div`
  padding:5px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.bg1};
  overflow-y: auto;
  width: 140%;
  max-height: 140px;
  position: absolute;  // Make it float over other elements
  z-index: 1;  // Put it above other elements
`;



  const [isOpenNative, setIsOpenNative] = useState(false);
  const [isOpenDeFi, setIsOpenDeFi] = useState(false);
  const [isOpenNft, setIsOpenNft] = useState(false);




  return (
    <Container>
      <FilterSelect
        value={selectedDisplayMode}
        onChange={(event) => handleButtonClick(event.target.value)}
      >
        <FilterOption value="Classic">Classic</FilterOption>
        <FilterOption value="Type">Type</FilterOption>
        <FilterOption value="Protocol">Protocol</FilterOption>
        <FilterOption value="all">All</FilterOption>
      </FilterSelect>

      <DropdownWrapper>
        <Button
          selected={selectedSubcategory === 'native'}
          hovered={hoveredButton === 'native'}
          onMouseEnter={() => handleButtonMouseEnter('native')}
          onMouseLeave={handleButtonMouseLeave}
          onClick={() => {
            setIsOpenNative(!isOpenNative);
            setIsOpenDeFi(false);
            setIsOpenNft(false);
            selectedSubcategory == 'native' ? setSelectedSubcategory('') : setSelectedSubcategory('native');
          }}>Native</Button>
        {isOpenNative && (
          <DropdownMenu onClick={e => e.stopPropagation()}>
            <SelectAllText onClick={handleSetAllFiltersTokens}>
              select All
            </SelectAllText>
            {nativeTokens.map((item, index) => {
              const handleCardClick = () => {
                const event = {
                  target: { checked: !filters[item.unique_id] },
                  preventDefault: () => { },
                  stopPropagation: () => { },
                };
                updateFilters(event as React.ChangeEvent<HTMLInputElement>, item);
              };

              return (
                <div
                  key={index}
                  onClick={handleCardClick}
                  style={{ cursor: 'pointer' }}  // Optional: changes cursor on hover
                >
                  <Token>
                    <Checkbox checked={filters[item.unique_id] || false} onChange={(e) => updateFilters(e, item)} />
                    <img src={`https://starkendefi.xyz/tokens/${item.symbol}.png`} alt={item.symbol} />
                  </Token>
                </div>
              );
            })}

          </DropdownMenu>
        )}
      </DropdownWrapper>

      <DropdownWrapper>
        <Button
          selected={selectedSubcategory === 'defi'}
          hovered={hoveredButton === 'defi'}
          onMouseEnter={() => handleButtonMouseEnter('defi')}
          onMouseLeave={handleButtonMouseLeave}
          onClick={() => {
            setIsOpenDeFi(!isOpenDeFi);
            setIsOpenNft(false);
            setIsOpenNative(false);
            selectedSubcategory == 'defi' ? setSelectedSubcategory('') : setSelectedSubcategory('defi');
          }}>DeFi</Button>
        {isOpenDeFi && (
          <DropdownMenu onClick={e => e.stopPropagation()}>
            <SelectAllText onClick={handleSetAllFiltersDefi}>
              select All
            </SelectAllText>
            {defiTokens.map((item, index) => {
              const handleCardClick = () => {
                const event = {
                  target: { checked: !filters[item.unique_id] },
                  preventDefault: () => { },
                  stopPropagation: () => { },
                };
                updateFilters(event as React.ChangeEvent<HTMLInputElement>, item);
              };

              return (
                <div
                  key={index}
                  onClick={handleCardClick}
                  style={{ cursor: 'pointer' }}  // Optional: changes cursor on hover
                >
                  <Token>
                    <Checkbox checked={filters[item.unique_id] || false} onChange={(e) => updateFilters(e, item)} />
                    <img src={`https://starkendefi.xyz/tokens/${item.symbol}.png`} alt={item.symbol} />
                  </Token>
                </div>
              );
            })}
          </DropdownMenu>
        )}
      </DropdownWrapper>

      <DropdownWrapper>
        <Button
          selected={selectedSubcategory === 'nft'}
          hovered={hoveredButton === 'nft'}
          onMouseEnter={() => handleButtonMouseEnter('nft')}
          onMouseLeave={handleButtonMouseLeave}
          onClick={() => {
            setIsOpenNft(!isOpenNft);
            setIsOpenDeFi(false);
            setIsOpenNative(false);
            selectedSubcategory == 'nft' ? setSelectedSubcategory('') : setSelectedSubcategory('nft');
          }}>NFT</Button>
        {isOpenNft && (
          <DropdownMenu onClick={e => e.stopPropagation()}>
            <SelectAllText onClick={handleSetAllFiltersNft}>
              select All
            </SelectAllText>
            {nftTokens.map((item, index) => {
              const handleCardClick = () => {
                const event = {
                  target: { checked: !filters[item.unique_id] },
                  preventDefault: () => { },
                  stopPropagation: () => { },
                };
                updateFilters(event as React.ChangeEvent<HTMLInputElement>, item);
              };

              return (
                <div
                  key={index}
                  onClick={handleCardClick}
                  style={{ cursor: 'pointer' }}  // Optional: changes cursor on hover
                >
                  <Token>
                    <Checkbox checked={filters[item.unique_id] || false} onChange={(e) => updateFilters(e, item)} />
                    <img src={`https://starkendefi.xyz/tokens/${item.symbol}.png`} alt={item.symbol} />
                  </Token>
                </div>
              );
            })}
          </DropdownMenu>
        )}
      </DropdownWrapper>


    </Container>
  );
};




export default TokensSelector;
