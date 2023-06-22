import styled from 'styled-components'

export const BorderWrapper = styled.div`
  background: linear-gradient(
    ${({ theme }) => theme.colors.starkenLogo1},
    ${({ theme }) => theme.colors.starkenLogo2}
  );
  padding: 5px;
  border-radius: 5px;
`