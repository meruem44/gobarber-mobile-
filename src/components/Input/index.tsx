import React, { 
    useEffect, 
    useRef, 
    useState, 
    useCallback,
    useImperativeHandle,
    RefForwardingComponent,
    forwardRef
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Feather } from '@expo/vector-icons';

import { Container, TextInput, Button } from './styles';
import colors from '../../styles/colors';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    pass?: boolean;
};

interface InputValueReferences {
    value: string;
};

interface InputRef {
    focus(): void;
}

const Input: RefForwardingComponent <InputRef,InputProps> = ({ name, icon, pass, ...res }, ref) => {
    const inputElementRef = useRef<any>(null);
   
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReferences>({ value: defaultValue });

    const [view, setView] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isField, setIsField] = useState(false);

    const handleInputFocus = useCallback(() =>{
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() =>{
        setIsFocused(false);

        setIsField(!!inputValueRef.current.value);
        
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current?.focus()
        }
    }));

    const handleViewValue = useCallback(() => {
        setView(!view)
    }, [setView, view]);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputElementRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value});
            },
            clearValue() {
                inputElementRef.current.value = '';
                inputElementRef.current.clear();
            }
        });
    }, [registerField, fieldName]);

    return (
      <Container isFocused={isFocused} isErrored={!!error} >
          <Feather 
          name={icon} 
          size={20} 
          color={isFocused || isField ? colors.primary : colors.colorPlace} />

          <TextInput 
          autoCorrect={false}
          autoCapitalize="none"
          ref={inputElementRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          keyboardAppearance="dark"
          secureTextEntry={view}
          placeholderTextColor={colors.colorPlace}
          onChangeText={value => {
            inputValueRef.current.value = value
          }}
           {...res} />

           {pass && (
               <Button onPress={handleViewValue}>
                <Feather 
                name={view ? 'eye' : 'eye-off'} 
                size={20} 
                color={isFocused || isField ? colors.primary : colors.colorPlace}  />
               </Button>
           )}
      </Container>
  );
}

export default forwardRef(Input);