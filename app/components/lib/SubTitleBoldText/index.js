/**
 * DetailsBoldText
 */

import styled from 'styled-components';

// eslint-disable-next-line no-unused-vars
const SubTitleBoldText = styled.span`
  width: 230px;
  height: 45px;
  font-family: Circe;
  font-size: ${props => props.size || '30px'};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.color || '#000000'};
`;

export default SubTitleBoldText;
