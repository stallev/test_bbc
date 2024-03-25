import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomInput, Button, Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { NotificationTypes, RoutePath } from '@/constants';
import { useToggleNotification } from '@/hooks/useToggleNotification';
import { FormFieldLangCodes, FormFieldValidationErrorsLangCodes, InputTypes } from '@/constants';
import useTranslationFunction from '@/hooks/useTranslationFunction';

import styles from './styles/subscribe-form.module.scss';

interface SubscribeFormInput {
  email: string
  userMessage: string
}

interface SubscribeFormProps {
  API_URL: string
  title?: string
  description?: string
}

const SubscribeForm:React.FC<SubscribeFormProps> = ({
  API_URL,
  title,
  description,
}) => {
  const setNotification = useToggleNotification();
  const translate = useTranslationFunction();

  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SubscribeFormInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  })  

  const onSubmit: SubmitHandler<SubscribeFormInput> = async (data) => {

    try {
      const response = await fetch(
        API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const textResponse = await response.text();
      const responseData = JSON.parse(textResponse);
  
      if (response.status === 200) {
        reset();
        
        setNotification({
          isVisibleNotification: true,
          notificationText: responseData.isSubscribedAlready 
            ? NotificationTypes.subscribeToNews.alreadySubscribed.langTextCode : NotificationTypes.subscribeToNews.success.langTextCode,
          notificationType: responseData.isSubscribedAlready 
            ? NotificationTypes.subscribeToNews.alreadySubscribed.type : NotificationTypes.subscribeToNews.success.type,
        });
      } else {
        setNotification({
          isVisibleNotification: true,
          notificationText: NotificationTypes.submitForm.error.langTextCode,
          notificationType: NotificationTypes.submitForm.error.type,
        });

        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container className={styles['subscribe-form__container']}>
      <Text
        textType='h2'
        className={styles['subscribe-form__title']}
      >
        {title}
      </Text>
      <form
        className={styles['subscribe-form']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInput
          type={InputTypes.email}
          placeholder={translate(FormFieldLangCodes.emailRequired)}
          className={styles['subscribe-form__input-field']}
          errorText={errors.email && translate(FormFieldValidationErrorsLangCodes.emailError)}
          validate={register("email", { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ })}
        />

        <Button
          className={styles['subscribe-form__submit']}
          buttonTitle={translate("subscribe_button")}
          type='primary'
          isSubmit={true}
        />
      </form>

      <Text
        textType='p'
        className={styles['subscribe-form__description']}
      >
        {description}
      </Text>
    </Container>
  )
}

export default SubscribeForm;
