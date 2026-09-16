'use client'

import { Navbar, Footer, NeuralNetworkBackground, PrivacyModal, TermsModal, PageTitle } from '@/ui'
import { sendContactEmail } from '@/components/actions/send-email'
import { useTranslation, Trans } from 'react-i18next'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ContactPage() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const [formData, setFormData] = useState({
    companyName: '',
    personInCharge: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyConsent: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    setIsFormValid(e.currentTarget.checkValidity())
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const result = await sendContactEmail(formData)

    setIsSubmitting(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      toast.error(t('contact_page.error_message'))
    }
  }

  return (
    <>
      <PageTitle pageKey="page_titles.contact" />
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center">
        <section className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden pt-12 pb-24">
          <div className="from-primary/[0.02] dark:from-primary/5 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b via-transparent to-transparent"></div>
          <div className="bg-primary/[0.02] dark:bg-primary/5 pointer-events-none absolute top-1/4 -left-20 z-0 h-96 w-96 rounded-full blur-[100px]"></div>
          <div className="bg-primary/[0.02] dark:bg-primary/5 pointer-events-none absolute -right-20 bottom-1/4 z-0 h-96 w-96 rounded-full blur-[100px]"></div>
          <NeuralNetworkBackground />

          <div className="animate-in fade-in zoom-in-95 relative z-10 container mx-auto mt-8 max-w-4xl px-6 duration-700">
            <div className="mb-12 flex flex-col items-center text-center">
              <h1 className="text-foreground z-10 mb-12 text-4xl font-bold tracking-tight md:text-6xl">
                {t('contact_page.title')}
              </h1>
              <p className="text-muted-foreground z-10 max-w-2xl text-xl font-medium whitespace-pre-line">
                {t('contact_page.subtitle')}
              </p>
            </div>

            <div className="bg-card border-border/50 rounded-2xl border p-8 shadow-xl backdrop-blur-sm md:p-12">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{t('contact_page.success_title')}</h3>
                  <p className="text-muted-foreground">{t('contact_page.success_message')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-sm font-medium uppercase">
                        {t('contact_page.fields.company')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border focus:ring-primary/50 mt-2 w-full rounded-2xl border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="personInCharge" className="text-sm font-medium uppercase">
                        {t('contact_page.fields.person')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="personInCharge"
                        name="personInCharge"
                        value={formData.personInCharge}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border focus:ring-primary/50 mt-2 w-full rounded-2xl border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium uppercase">
                        {t('contact_page.fields.email')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border focus:ring-primary/50 mt-2 w-full rounded-2xl border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium uppercase">
                        {t('contact_page.fields.phone')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9\-\+\s\(\)]*"
                        title={t('contact_page.fields.phone_title')}
                        className="bg-background border-border focus:ring-primary/50 mt-2 w-full rounded-2xl border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium uppercase">
                      {t('contact_page.fields.subject')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border focus:ring-primary/50 mt-2 w-full rounded-2xl border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium uppercase">
                      {t('contact_page.fields.message')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="bg-background border-border focus:ring-primary/50 mt-2 w-full resize-none rounded-2xl border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="border-border/50 flex flex-col items-start justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center">
                    <div className="mt-2 flex max-w-sm items-start gap-3 text-left">
                      <input
                        type="checkbox"
                        id="privacy-consent"
                        name="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={handleInputChange}
                        required
                        className="border-border bg-background focus:ring-primary/50 text-primary mt-1 h-4 w-4 cursor-pointer rounded transition-colors"
                      />
                      <label
                        htmlFor="privacy-consent"
                        className="text-muted-foreground cursor-pointer text-xs"
                      >
                        <Trans
                          i18nKey="contact_page.privacy_notice"
                          components={{
                            1: (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setIsTermsModalOpen(true)
                                }}
                                className="text-primary focus:ring-primary/50 rounded font-medium hover:underline focus:ring-2 focus:outline-none"
                              />
                            ),
                            2: (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setIsPrivacyModalOpen(true)
                                }}
                                className="text-primary focus:ring-primary/50 rounded font-medium hover:underline focus:ring-2 focus:outline-none"
                              />
                            ),
                          }}
                        />
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="bg-primary text-primary-foreground w-full rounded-xl px-8 py-3 font-bold shadow-xl transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:w-auto"
                    >
                      {isSubmitting ? t('contact_page.sending') : t('contact_page.submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </>
  )
}
