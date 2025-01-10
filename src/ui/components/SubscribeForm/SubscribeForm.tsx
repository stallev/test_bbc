"use client";

import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomInput, Button, Text } from '@/ui/components/ui-kit';
import { NotificationTypes } from '@/constants';
import { useToggleNotification } from '@/hooks/useToggleNotification';
import { FormFieldLangCodes, FormFieldValidationErrorsLangCodes, InputTypes } from '@/constants';
import { useClientTranslationFunction } from '@/hooks/useLocale';

import styles from './styles/subscribe-form.module.scss';
import { eventSubscriptionInputDataType } from '@/types/formTypes';
import { subscribeToEventsAction } from '@/app/actions/eventsSubscriptions';

interface SubscribeFormInput {
  email: string
  userMessage: string
}

const SubscribeForm = () => {
  const setNotification = useToggleNotification();
  const translate = useClientTranslationFunction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SubscribeFormInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const onSubmit: SubmitHandler<SubscribeFormInput> = async (data: eventSubscriptionInputDataType) => {
    try {
      const response = await subscribeToEventsAction(data).then((data) => JSON.parse(data));

      const { responseData } = response;

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

        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles['subscribe-form__container']}>
      <Text
        textType='h3'
        className={styles['subscribe-form__title']}
      >
        {translate("upcoming_events_subscription_form_title")}
      </Text>
      <form
        className={styles['subscribe-form']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text
          textType='p'
          className={styles['subscribe-form__description']}
        >
          {translate("upcoming_subscription_form_description")}
        </Text>

        <div className={styles['subscribe-form__fieldset']}>
          <CustomInput
            type={InputTypes.email}
            placeholder={translate(FormFieldLangCodes.emailRequired)}
            className={styles['subscribe-form__input-field']}
            errorText={errors.email && translate(FormFieldValidationErrorsLangCodes.emailError)}
            validate={register("email", { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ })}
            label={translate(FormFieldLangCodes.emailRequired)}
          />

          <Button
            className={styles['subscribe-form__submit']}
            buttonTitle={translate("subscribe_button")}
            type='primary'
            isSubmit={true}
          />
        </div>
      </form>
    </div>
  )
}

export default SubscribeForm;
