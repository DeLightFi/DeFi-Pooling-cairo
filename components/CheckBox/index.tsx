import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  width: 100%;   // Add these
  height: 100%;  // two lines
`;


const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
`;


interface StyledCheckboxProps {
    checked?: boolean;
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: linear-gradient(
    ${(props) => props.checked ? props.theme.colors.starkenLogo1 : props.theme.colors.color3},
    ${(props) => props.checked ? props.theme.colors.starkenLogo2 : props.theme.colors.color3}
  );
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  };
`;
const Checkbox = ({ className = "", checked, ...props }) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
);

export default Checkbox;
