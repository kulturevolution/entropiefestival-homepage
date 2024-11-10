'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewsletterForm: React.FC = () => {
  const { t } = useTranslation(['common']);

  const [step, setStep] = useState('form');
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
      {step === 'form' ? (
        <form onSubmit={handleSubmit} className='max-w-[550px]'>
          <input
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t('newsletterForm.email.placeholder')}
            required
            className='text-17px mb-2.5 flex h-12 w-full items-center border-2 border-primary px-3 py-2 tracking-[0.019em] text-primary outline-none xl:h-16 xl:px-6 xl:py-4 xl:text-[22px]'
          />
          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='flex h-12 items-center border-2 border-primary bg-primary px-8 text-[19px] font-bold tracking-[0.071em] text-white outline-none transition-colors hover:bg-white hover:text-primary focus:bg-white focus:text-primary xl:h-16 xl:px-32 xl:text-[27px]'
            >
              {t('newsletterForm.submit')}
            </button>
          </div>
          {hasError && <div className='mt-2'>{t('newsletterForm.error')}</div>}
        </form>
      ) : step === 'success' ? (
        <div>{t('newsletterForm.success')}</div>
      ) : null}
    </div>
  );
};

export default NewsletterForm;
