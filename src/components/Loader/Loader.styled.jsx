import styled from 'styled-components';

export const WrapStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${props => props.$paddingTop || 0};
  padding-bottom: ${props => props.$paddingBottom || 0};
`;
