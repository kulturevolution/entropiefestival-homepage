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
            className='mb-2.5 flex h-16 w-full items-center border-2 border-primary px-6 py-4 text-[22px] tracking-[0.019em] text-primary outline-none'
          />
          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='flex h-16 items-center border-2 border-primary bg-primary px-32 text-[27px] font-bold tracking-[0.071em] text-white outline-none transition-colors hover:bg-white hover:text-primary focus:bg-white focus:text-primary'
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