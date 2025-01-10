import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomInput, CustomTextarea, Button, Checkbox, Text } from '@/ui/components/ui-kit';
import { NotificationTypes } from '@/constants';
import { InnerApiEndponts } from '@/constants/EndpointsList';
import { useToggleNotification } from '@/hooks/useToggleNotification';
import { FormFieldLangCodes, FormFieldValidationErrorsLangCodes, InputTypes } from '@/constants';
import { IFormInput } from "@/types/formTypes";
import useTranslationFunction from '@/hooks/useTranslationFunction';

import styles from './styles/contact-us-form.module.scss';

interface ContactUsFormprops {
  API_URL: string
  isContactWillingFieldExist: boolean
}

const ContactUsForm:React.FC<ContactUsFormprops> = ({
  API_URL,
  isContactWillingFieldExist,
}) => {
  const setNotification = useToggleNotification();
  const translate = useTranslationFunction();

  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IFormInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: '',
      phone: '',
    },
  })

  const [isContactWilling, setIsWillingContact] = useState(false);

  const changeCheckbox = () => {
    setIsWillingContact(!isContactWilling);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const contactMessage = `Person would${isContactWilling ? '' : ' not'} want to be contacted`;
    const modifiedData = isContactWillingFieldExist ? {...data, contactWilling: contactMessage} : {...data};
    const totalData = {
      url: API_URL,
      data: modifiedData
    }

    try {
      const response = await fetch(
        InnerApiEndponts.GetInTouch,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(totalData),
        }
      );

      const notificationData = {
        isVisibleNotification: true,
        notificationText: response.status === 200 
          ? NotificationTypes.submitForm.success.langTextCode : NotificationTypes.submitForm.error.langTextCode,
        notificationType: response.status === 200 
          ? NotificationTypes.submitForm.success.type : NotificationTypes.submitForm.error.type,
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
  }

  return (
    <div>
      <form
        className={styles["contact-us-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInput
          type={InputTypes.text}
          placeholder={translate(FormFieldLangCodes.firstName)}
          className={styles['contact-us-form__input-field']}
          errorText={errors.firstName && translate(FormFieldValidationErrorsLangCodes.firstNameError)}
          validate={register("firstName", { required: true, minLength: 2 })}
        />

        <CustomInput
          type={InputTypes.text}
          placeholder={translate(FormFieldLangCodes.lastName)}
          className={styles['contact-us-form__input-field']}
          errorText={errors.lastName && translate(FormFieldValidationErrorsLangCodes.lastNameError)}
          validate={register("lastName", { required: true, minLength: 2 })}
        />

        {isContactWillingFieldExist &&
          <Checkbox
          name='gettingContact'
          isChecked={isContactWilling}
          className={styles["contact-us-form__is-willing-to-be-contacted"]}
          onChangeSelectedValue={changeCheckbox}
        >
          <Text textType='p'>{translate("user_willing_to_be_contacted")}</Text>
        </Checkbox>
        }

        {
          isContactWillingFieldExist && isContactWilling && 
          <CustomInput
            type={InputTypes.tel}
            placeholder={translate(FormFieldLangCodes.phone)}
            className={styles['contact-us-form__input-field']}
            errorText={errors.phone && translate(FormFieldValidationErrorsLangCodes.phoneError)}
            validate={register("phone", { minLength: 10 })}
          />
        }

        {
          isContactWillingFieldExist && isContactWilling && 
          <CustomInput
            type={InputTypes.email}
            placeholder={translate(FormFieldLangCodes.email)}
            className={styles['contact-us-form__input-field']}
            errorText={errors.email && translate(FormFieldValidationErrorsLangCodes.emailError)}
            validate={register("email", { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ })}
          />
        }

        <CustomTextarea
          className={styles['contact-us-form__textarea-field']}
          errorText={errors.userMessage && translate(FormFieldValidationErrorsLangCodes.userMessageFieldError)}
          placeholder={translate(FormFieldLangCodes.userMessageField)}
          validate={register("userMessage", { required: true, minLength: 6 })}
        />

        <Button
          className={styles['contact-us-form__submit']}
          buttonTitle={translate("send_button")}
          type='primary'
          isSubmit={true}
        />
      </form>
    </div>
  )
}

export default ContactUsForm
