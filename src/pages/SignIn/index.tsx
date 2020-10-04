import React, { useCallback, useRef } from 'react';
import { Image, TexInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import getValidationErros from '../../utils/getValidationsErrors';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import { Feather } from '@expo/vector-icons';

import Button from '../../components/Button';
import Input from '../../components/Input'

import logoImg from '../../assets/logo.png';

import { 
  Container, 
  Title, 
  ButtonForgotPassword, 
  TextButton,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import colors from '../../styles/colors';

interface SignInFormData {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TexInput>(null);
  const { navigate } = useNavigation();

  const { signIn, user } = useAuth();

  console.log(user);

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {

      const schema = yup.object().shape({
        email: yup.string().email('Digite um e-mail válido').required('Email obrigatório'),
        password: yup.string().min(6, 'Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly:false
      });

      await signIn(data);

    } catch (err) {
      const errors = getValidationErros(err);

      formRef.current?.setErrors(errors);

      Alert.alert(
        'Erro na autenticação',
        'ocorreu um erro ao fazer login, cheque as credenciais'
      );
    }
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current?.submitForm()
  }, [formRef]);

  return (
      <>
        <Container>
        <Image source={logoImg} />
        <Title>Faça seu Logon</Title>

       <Form ref={formRef} onSubmit={handleSignIn} >

       <Input 
       name="email" 
       icon="mail" 
       keyboardType="email-address"
       returnKeyType="next"
       onSubmitEditing={() => passwordInputRef.current?.focus()}
       placeholder="E-mail" />

        <Input 
        ref={passwordInputRef}
        name="password" 
        icon="lock" 
        pass={true}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        placeholder="Senha" />

       </Form>

        <Button onPress={handleSubmit}>
          Entrar
        </Button>

        <ButtonForgotPassword>
          <TextButton>Esqueci minha senha</TextButton>
        </ButtonForgotPassword>

      </Container>

      <CreateAccountButton onPress={() => navigate('SignUp')}>
        <Feather name="log-in" color={colors.primary} size={20} />
        <CreateAccountButtonText >Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
      </>
  );
}

export default SignIn;