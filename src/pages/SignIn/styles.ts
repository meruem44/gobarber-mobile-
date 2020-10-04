import styled from 'styled-components/native';
import colors from '../../styles/colors';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center; 
  justify-content: center;
  padding: 0 30px 150px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${colors.white};
  font-family: Roboto500;
  margin: 64px 0 24px;
`;

export const ButtonForgotPassword = styled(RectButton)`
  margin-top: 24px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: ${colors.white};
  font-family: Roboto500;
`;

export const CreateAccountButton = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top-width: 1px;
    background:${colors.bg};
    border-color: ${colors.bgInput};
    padding: 16px 0;
`;

export const CreateAccountButtonText = styled.Text`
      font-size: 18px;
    color: ${colors.primary};
    font-family: Roboto500;
    margin-left: 16px;
`;