/**
 * subTitleText
 */

import styled from 'styled-components';

const SubTitleText = styled.span`
  width: 161px;
  height: 26px;
  font-family: Circe;
  font-size: ${props => props.size || '18px'};;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: left;
  color:: ${props => props.color || '#45b995'};
`;

export default SubTitleText;
