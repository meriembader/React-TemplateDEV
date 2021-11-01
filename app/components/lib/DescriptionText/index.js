/**
 * DescriptionText
 */

import styled from 'styled-components';

const DescriptionText = styled.div`
  font-family: Circe;
  font-size: ${props => props.size || '14px'};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.color || '#858891'};
`;

export default DescriptionText;
