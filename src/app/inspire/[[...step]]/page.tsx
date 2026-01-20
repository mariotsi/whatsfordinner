'use client';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Tooltip, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useEffect, ComponentType } from 'react';
import CuisinesStep from '../components/CuisinesStep';
import IngredientsStep from '../components/IngredientsStep';
import CookStep from '../components/CookStep';
import { useInspire } from '../InspireContext';

type StepConfig = {
  label: string;
  key: string;
  component: ComponentType;
};

const steps: StepConfig[] = [
  { label: 'Cuisines', key: 'cuisines', component: CuisinesStep },
  { label: 'Ingredients', key: 'ingredients', component: IngredientsStep },
  { label: "Let's cook!", key: 'cook', component: CookStep },
];

export default function InspirePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { cuisine, ingredient, reset } = useInspire();

  const activeStep = useMemo(() => {
    const currentKey = pathname.split('/').pop();
    return Math.max(
      0,
      steps.findIndex((step) => step.key === currentKey)
    );
  }, [pathname]);

  const canProceedToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex <= 0) {
        return true;
      }
      if (stepIndex === 1) {
        return !!cuisine;
      }
      if (stepIndex === 2) {
        return !!cuisine && !!ingredient;
      }
      return false;
    },
    [cuisine, ingredient]
  );

  useEffect(() => {
    if (!canProceedToStep(activeStep)) {
      const lastValidStep =
        steps
          .map((_, i) => i)
          .filter(canProceedToStep)
          .pop() ?? 0;
      router.replace(`/inspire/${steps[lastValidStep].key}`);
    }
  }, [activeStep, canProceedToStep, router]);

  const getNextDisabledReason = useMemo(() => {
    if (activeStep === 0 && !cuisine) {
      return 'Select a cuisine first';
    }
    if (activeStep === 1 && !ingredient) {
      return 'Select an ingredient first';
    }
    return '';
  }, [activeStep, cuisine, ingredient]);

  const navigateToStep = useCallback(
    (stepIndex: number) => {
      if (canProceedToStep(stepIndex)) {
        router.push(`/inspire/${steps[stepIndex].key}`);
      }
    },
    [router, canProceedToStep]
  );

  const handleNext = useCallback(
    () => navigateToStep(Math.min(steps.length - 1, activeStep + 1)),
    [activeStep, navigateToStep]
  );

  const handleBack = useCallback(
    () => navigateToStep(Math.max(0, activeStep - 1)),
    [activeStep, navigateToStep]
  );

  const handleStep = useCallback(
    (step: number) => () => navigateToStep(step),
    [navigateToStep]
  );

  const handleInspireAgain = useCallback(() => {
    reset();
    router.push(`/inspire/${steps[0].key}`);
  }, [reset, router]);

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const StepComponent = useMemo(
    () => steps[activeStep].component,
    [activeStep]
  );

  const isLastStep = activeStep === steps.length - 1;

  const isNextDisabled = useMemo(
    () => isLastStep || !canProceedToStep(activeStep + 1),
    [isLastStep, activeStep, canProceedToStep]
  );

  const isValidStep = useMemo(
    () => canProceedToStep(activeStep),
    [activeStep, canProceedToStep]
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Get inspired
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.key} onClick={handleStep(index)}>
            <StepLabel sx={{ cursor: 'pointer' }}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ py: 4 }}>{isValidStep && <StepComponent />}</Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
          justifyContent: 'space-around',
        }}
      >
        <Button
          color="inherit"
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        {isLastStep ? (
          <>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleInspireAgain}
              sx={{ mr: 1 }}
            >
              Inspire me again
            </Button>
            <Button variant="contained" onClick={handleGoHome}>
              Go to home
            </Button>
          </>
        ) : (
          <Tooltip title={getNextDisabledReason} arrow>
            <span>
              <Button
                variant="outlined"
                onClick={handleNext}
                disabled={isNextDisabled}
              >
                Next
              </Button>
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
