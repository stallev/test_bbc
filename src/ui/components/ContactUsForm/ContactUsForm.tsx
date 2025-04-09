'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { contactRequestAction } from '@/app/actions/contactRequestAction';
import {
  NotificationTypes,
  ButtonTypes,
  FormFieldLangCodes,
  FormFieldValidationErrorsLangCodes,
  InputTypes,
} from '@/constants';
import { useClientTranslationFunction } from '@/hooks/useLocale';
import { useToggleNotification } from '@/hooks/useToggleNotification';
import { ContactFormType, IFormInput } from '@/types/formTypes';
import { CustomInput, CustomTextarea, Button, Checkbox, Text } from '@/ui/components/ui-kit';

import styles from './styles/contact-us-form.module.scss';

interface ContactUsFormprops {
  ContactFormType: ContactFormType;
  isContactWillingFieldExist: boolean;
}

const ContactUsForm: React.FC<ContactUsFormprops> = ({
  ContactFormType,
  isContactWillingFieldExist,
}) => {
  const setNotification = useToggleNotification();
  const translate = useClientTranslationFunction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      phone: '',
    },
  });

  const [isContactWilling, setIsWillingContact] = useState(false);

  const changeCheckbox = () => {
    setIsWillingContact(!isContactWilling);
  };

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const contactMessage = `Person would${isContactWilling ? '' : ' not'} want to be contacted`;
    const modifiedData = isContactWillingFieldExist
      ? { ...data, contactWilling: contactMessage }
      : { ...data };

    try {
      const response = await contactRequestAction({
        data: modifiedData,
        contactType: ContactFormType,
      }).then(async res => await JSON.parse(res));

      const notificationData = {
        isVisibleNotification: true,
        notificationText:
          response.status === 200
            ? NotificationTypes.submitForm.success.langTextCode
            : NotificationTypes.submitForm.error.langTextCode,
        notificationType:
          response.status === 200
            ? NotificationTypes.submitForm.success.type
            : NotificationTypes.submitForm.error.type,
      };

      if (response.status === 200) {
        reset();

        setNotification(notificationData);
      } else {
        setNotification(notificationData);

        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles['contact-us-form']} onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type={InputTypes.text}
        placeholder={translate(FormFieldLangCodes.firstName)}
        className={styles['contact-us-form__input-field']}
        errorText={errors.firstName && translate(FormFieldValidationErrorsLangCodes.firstNameError)}
        validate={register('firstName', { required: true, minLength: 2 })}
        label={translate(FormFieldLangCodes.firstName)}
      />

      <CustomTextarea
        className={styles['contact-us-form__textarea-field']}
        errorText={
          errors.userMessage && translate(FormFieldValidationErrorsLangCodes.userMessageFieldError)
        }
        placeholder={translate(FormFieldLangCodes.userMessageField)}
        validate={register('userMessage', { required: true, minLength: 6 })}
        label={translate(FormFieldLangCodes.userMessageField)}
      />

      {isContactWillingFieldExist && (
        <Checkbox
          name="gettingContact"
          isChecked={isContactWilling}
          className={styles['contact-us-form__is-willing-to-be-contacted']}
          onChangeSelectedValue={changeCheckbox}
        >
          <Text textType="p">{translate('user_willing_to_be_contacted')}</Text>
        </Checkbox>
      )}

      {isContactWillingFieldExist && isContactWilling && (
        <CustomInput
          type={InputTypes.tel}
          placeholder={translate(FormFieldLangCodes.phone)}
          className={styles['contact-us-form__input-field']}
          errorText={errors.phone && translate(FormFieldValidationErrorsLangCodes.phoneError)}
          validate={register('phone', { minLength: 10 })}
          label={translate(FormFieldLangCodes.phone)}
        />
      )}

      {isContactWillingFieldExist && isContactWilling && (
        <CustomInput
          type={InputTypes.email}
          placeholder={translate(FormFieldLangCodes.email)}
          className={styles['contact-us-form__input-field']}
          errorText={errors.email && translate(FormFieldValidationErrorsLangCodes.emailError)}
          validate={register('email', {
            pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
          })}
          label={translate(FormFieldLangCodes.email)}
        />
      )}

      <Button
        className={styles['contact-us-form__submit']}
        buttonTitle={translate('send_button')}
        type={ButtonTypes.secondary}
        isSubmit={true}
      />
    </form>
  );
};

export default ContactUsForm;
