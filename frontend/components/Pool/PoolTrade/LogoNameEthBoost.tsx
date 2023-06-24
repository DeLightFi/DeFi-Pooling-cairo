import React from 'react';
import styled from 'styled-components';

const ETH_logo = `
<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M110 220C170.751 220 220 170.751 220 110C220 49.2487 170.751 0 110 0C49.2487 0 0 49.2487 0 110C0 170.751 49.2487 220 110 220Z" fill="black"/>
<g opacity="0.5">
<path d="M135.99 33V80.3065L175.973 98.1732L135.99 33Z" fill="#25262D" fill-opacity="0.602"/>
<path d="M135.989 33L96 98.1732L135.989 80.3065V33Z" fill="#25262D"/>
<path d="M135.99 128.83V160.974L176 105.619L135.99 128.83Z" fill="#25262D" fill-opacity="0.602"/>
<path d="M135.989 160.974V128.824L96 105.619L135.989 160.974Z" fill="#25262D"/>
<path d="M135.99 121.39L175.973 98.1738L135.99 80.3179V121.39Z" fill="#25262D" fill-opacity="0.2"/>
<path d="M96 98.1738L135.989 121.39V80.3179L96 98.1738Z" fill="#25262D" fill-opacity="0.602"/>
</g>
<path d="M128.99 36V83.3065L168.973 101.173L128.99 36Z" fill="#25262D" fill-opacity="0.602"/>
<path d="M128.989 36L89 101.173L128.989 83.3065V36Z" fill="#25262D"/>
<path d="M128.99 131.83V163.974L169 108.619L128.99 131.83Z" fill="#25262D" fill-opacity="0.602"/>
<path d="M128.989 163.974V131.824L89 108.619L128.989 163.974Z" fill="#25262D"/>
<path d="M128.99 124.39L168.973 101.174L128.99 83.3179V124.39Z" fill="#25262D" fill-opacity="0.2"/>
<path d="M89 101.174L128.989 124.39V83.3179L89 101.174Z" fill="#25262D" fill-opacity="0.602"/>
<g opacity="0.9">
<path d="M118.99 41V88.3065L158.973 106.173L118.99 41Z" fill="#25262D" fill-opacity="0.602"/>
<path d="M118.989 41L79 106.173L118.989 88.3065V41Z" fill="#25262D"/>
<path d="M118.99 136.83V168.974L159 113.619L118.99 136.83Z" fill="#25262D" fill-opacity="0.602"/>
<path d="M118.989 168.974V136.824L79 113.619L118.989 168.974Z" fill="#25262D"/>
<path d="M118.99 129.39L158.973 106.174L118.99 88.3179V129.39Z" fill="#25262D" fill-opacity="0.2"/>
<path d="M79 106.174L118.989 129.39V88.3179L79 106.174Z" fill="#25262D" fill-opacity="0.602"/>
</g>
<path d="M109.99 46V93.3065L149.973 111.173L109.99 46Z" fill="#E6E452"/>
<path d="M109.989 46L70 111.173L109.989 93.3065V46Z" fill="#E6E452"/>
<path d="M109.99 141.83V173.974L150 118.619L109.99 141.83Z" fill="#E6E452"/>
<path d="M109.989 173.974V141.824L70 118.619L109.989 173.974Z" fill="#E6E452"/>
<path d="M109.99 134.39L149.973 111.174L109.99 93.3179V134.39Z" fill="#DFDD32"/>
<path d="M70 111.174L109.989 134.39V93.3179L70 111.174Z" fill="#DFDD32"/>
</svg>
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

const LogoNameEthBoost: React.FC = () => {
    const logos = (
        <LogoMedMarg
            src={`data:image/svg+xml;utf8,${encodeURIComponent(ETH_logo)}`}
            alt={`eth logo`}
        />
    );

    const symbols = "Mirror-ETH";

    return (
        <LogoContainer>
            <Logos>{logos}</Logos>
            <SymbolsSolo>{symbols}</SymbolsSolo>
        </LogoContainer>
    );
};

export default LogoNameEthBoost;
