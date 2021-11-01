/**
 * DetailsBoldText
 */

import styled from 'styled-components';

const TitleBoldText = styled.span`
  font-family: Circe;
  font-size: ${props => props.size || '30px'};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align:${props => props.textalign || 'left'};
  color: ${props => props.color || 'black'};
  width: ${props => props.width || '100%' };
  margin-top: 4px;
`;

export default TitleBoldText;
