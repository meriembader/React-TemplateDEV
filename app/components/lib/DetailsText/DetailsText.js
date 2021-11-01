/**
 * DetailsText
 */

import styled from 'styled-components';

const DetailsText = styled.span`
  font-family: Circe;
  font-size: ${props => props.size || '14px'};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: ${props => props.textalign || 'left'};
  width: ${props => props.width || '100%' };
  color: ${props => props.color || '#000000'};
  margin-top:  ${props => props.mt || '4px' };
  margin-right: ${props => props.mr || '0%' };
  display: block;

`;

export default DetailsText;
