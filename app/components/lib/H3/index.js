/**
 * DescriptionText
 */

import styled from 'styled-components';

const H3 = styled.div`
  font-family: Circe;
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.color || '#000000'};
`;

export default H3;
