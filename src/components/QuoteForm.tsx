import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovingDetailsStep } from "./form-steps/MovingDetailsStep";
import { CustomerInfoStep } from "./form-steps/CustomerInfoStep";
import { FormStepIndicator } from "./form/FormStepIndicator";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { useTranslation } from "react-i18next";

export const QuoteForm = () => {
  const { t } = useTranslation();
  const {
    step,
    formData,
    isSubmitting,
    handleInputChange,
    handleNext,
    handleBack,
    handleSubmit,
  } = useQuoteForm();

  return (
    <div className="glass-card rounded-xl p-8 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">{t('getMovingQuote')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormStepIndicator currentStep={step} totalSteps={2} />

        {step === 1 ? (
          <MovingDetailsStep formData={formData} onChange={handleInputChange} />
        ) : (
          <CustomerInfoStep formData={formData} onChange={handleInputChange} />
        )}

        <div className="flex justify-end gap-4">
          {step === 2 && (
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" /> {t('back')}
            </Button>
          )}
          {step === 1 ? (
            <Button type="button" onClick={handleNext}>
              {t('next')} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('submitting') : t('getQuotes')}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};