import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import colors from '../../styles/colors';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 12px;
  background: ${colors.primary};

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: Roboto500;
    color: ${colors.bg};
    font-size: 20px;
`
