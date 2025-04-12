'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SupporterSchema } from '@/lib/validation';

const SupporterForm: React.FC = () => {
  const { t } = useTranslation(['common']);

  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pronoun: '',
  });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      SupporterSchema.parse(formData);
    } catch (error) {
      // Form validation failed
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch('/api/supporter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setIsLoading(false);

      if (response.ok) {
        setStep('success');
      } else {
        setHasError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <div>
      <h3 className='mb-2 text-[28px] font-black'>
        {t('supporterForm.title')}
      </h3>
      {step === 'form' ? (
        <form onSubmit={handleSubmit} className='max-w-[550px]'>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t('supporterForm.firstName.placeholder')}
            required
            className='text-17px mb-2.5 flex h-12 w-full items-center border-2 border-primary px-3 py-2 tracking-[0.019em] text-primary outline-none xl:h-16 xl:px-6 xl:py-4 xl:text-[22px]'
          />
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t('supporterForm.lastName.placeholder')}
            required
            className='text-17px mb-2.5 flex h-12 w-full items-center border-2 border-primary px-3 py-2 tracking-[0.019em] text-primary outline-none xl:h-16 xl:px-6 xl:py-4 xl:text-[22px]'
          />
          <input
            type='text'
            name='pronoun'
            value={formData.pronoun}
            onChange={handleChange}
            placeholder={t('supporterForm.pronoun.placeholder')}
            className='text-17px mb-2.5 flex h-12 w-full items-center border-2 border-primary px-3 py-2 tracking-[0.019em] text-primary outline-none xl:h-16 xl:px-6 xl:py-4 xl:text-[22px]'
          />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder={t('supporterForm.email.placeholder')}
            required
            className='text-17px mb-2.5 flex h-12 w-full items-center border-2 border-primary px-3 py-2 tracking-[0.019em] text-primary outline-none xl:h-16 xl:px-6 xl:py-4 xl:text-[22px]'
          />
          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='flex h-12 items-center border-2 border-primary bg-primary px-8 text-[19px] font-bold tracking-[0.071em] text-white outline-none transition-colors hover:bg-white hover:text-primary focus:bg-white focus:text-primary xl:h-16 xl:px-32 xl:text-[27px]'
            >
              {t('supporterForm.submit')}
            </button>
          </div>
          {hasError && <div className='mt-2'>{t('supporterForm.error')}</div>}
        </form>
      ) : step === 'success' ? (
        <div>{t('supporterForm.success')}</div>
      ) : null}
    </div>
  );
};

export default SupporterForm;
