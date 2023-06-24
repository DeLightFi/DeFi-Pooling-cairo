import React from 'react';
import styled from 'styled-components';

const ETH_logo = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA"/><g fill="#FFF" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/><path d="M16.498 4L9 16.22l7.498-3.35z"/><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/><path d="M16.498 27.995v-6.028L9 17.616z"/><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>
`;

const LogoMedMarg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Logos = styled.div`
  display: flex;
`;

const SymbolsSolo = styled.div`
  font-weight: bold;
  font-size: 0.9em;
  padding-left: 4px;
  color: white;
`;

const LogoNameEth: React.FC = () => {
  const logos = (
    <LogoMedMarg
      src={`data:image/svg+xml;utf8,${encodeURIComponent(ETH_logo)}`}
      alt={`eth logo`}
    />
  );

  const symbols = "ETH";

  return (
    <LogoContainer>
      <Logos>{logos}</Logos>
      <SymbolsSolo>{symbols}</SymbolsSolo>
    </LogoContainer>
  );
};

export default LogoNameEth;
