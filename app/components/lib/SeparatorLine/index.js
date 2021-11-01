/**
 * SeparatorLine
 */

import styled from 'styled-components';

const SeparatorLine = styled.span`
  height: 0;
  opacity: 0.1;
  border: solid 0.5px #333a50;
  display: block;
  margin-top: 15px;
  margin-bottom: 15px;
  width: ${props => props.width || '100%'};
`;

export default SeparatorLine;
