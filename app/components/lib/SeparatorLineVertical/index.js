/**
 * SeparatorLine
 */

import styled from 'styled-components';

const SeparatorLineVertical = styled.span`
  @media (min-width: 768px) {
    opacity: 0.1;
    border: solid 0.5px #333a50;
    height: 100%;
    position: absolute;
    left: ${props => props.left || '0%'};
  }

`;

export default SeparatorLineVertical;
