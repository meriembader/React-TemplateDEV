/**
 * DetailsBoldText
 */

import styled from 'styled-components';

const DetailsBoldText = styled.div`
  font-family: Circe;
  font-size: ${props => props.size || '18px'};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.color || '#000000'};
  margin-top: ${props => props.mt || '4px'}; ;
  margin-bottom: ${props => props.mb || '0%'}; ;
  display: block;
  margin-left:  ${props => props.ml || '0%'};
`;

export default DetailsBoldText;
