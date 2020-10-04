import React, { useRef, useCallback } from 'react';
import { Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import api from '../../services/api';
import getValidationErros from '../../utils/getValidationsErrors';

import { Feather } from '@expo/vector-icons';

import Button from '../../components/Button';
import Input from '../../components/Input'

import logoImg from '../../assets/logo.png';

import { 
  Container, 
  Title,
  BackToSignIn,
  BackToSignInText
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    formRef.current?.setErrors([]);
   
    try {

      const schema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('Digite um e-mail válido').required('Email obrigatório'),
        password: yup.string().min(6, 'Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly:false
      });

      const response = api.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucesso',
         'Você já pode fazer logon na aplicação')

         goBack();

    } catch (err) {
      const errors = getValidationErros(err);

      formRef.current?.setErrors(errors);

      Alert.alert(
        'Erro no cadastro',
        'ocorreu um erro ao fazer o cadastro, cheque as informações'
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
        <Title>Crie sua conta</Title>

       <Form ref={formRef} onSubmit={handleSignUp}>

       <Input 
       name="name" 
       icon="user" 
       autoCapitalize="words"
       returnKeyType="next"
       onSubmitEditing={() => emailInputRef.current?.focus()}
       placeholder="Nome" />

        <Input 
        ref={emailInputRef}
        name="email" 
        icon="mail" 
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus() }
        keyboardType="email-address"
        placeholder="E-mail" />

        <Input 
        ref={passwordInputRef}
        name="password" 
        icon="lock" 
        pass={true}
        textContentType="newPassword"
        onSubmitEditing={handleSubmit}
        placeholder="Senha" />
       </Form>

        <Button onPress={handleSubmit}>
          Entrar
        </Button>


      </Container>

      <BackToSignIn onPress={() => goBack()} >
        <Feather name="arrow-left" color="#fff" size={20} />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
      </>
  );
}

export default SignUp;