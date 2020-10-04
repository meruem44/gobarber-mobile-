import styled, { css } from 'styled-components/native';
import colors from '../../styles/colors';

import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  background: ${colors.bgInput};
  border: 2px solid ${colors.bgInput};
  border-radius: 12px;
  margin-bottom: 8px;
  padding: 0 16px;

  flex-direction: row;
  align-items: center;

  ${({ isFocused }) => isFocused && css`
    border-color: ${colors.primary};
  `}

  ${({ isErrored }) => isErrored && css`
    border-color: ${colors.error};
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: Roboto500;
  margin-left: 16px;
`;

export const Button = styled(RectButton)`
  
`;
