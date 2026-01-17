'use client';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, ComponentType } from 'react';
import CuisinesStep from '../components/CuisinesStep';
import IngredientsStep from '../components/IngredientsStep';
import CookStep from '../components/CookStep';

interface StepConfig {
  label: string;
  key: string;
  component: ComponentType;
}

const steps: StepConfig[] = [
  { label: 'Cuisines', key: 'cuisines', component: CuisinesStep },
  { label: 'Ingredients', key: 'ingredients', component: IngredientsStep },
  { label: 'Cook!', key: 'cook', component: CookStep },
];

export default function InspirePage() {
  const router = useRouter();
  const pathname = usePathname();

  const activeStep = useMemo(() => {
    const currentKey = pathname.split('/').pop();
    return Math.max(
      0,
      steps.findIndex((step) => step.key === currentKey)
    );
  }, [pathname]);

  const navigateToStep = useCallback(
    (stepIndex: number) => {
      router.push(`/inspire/${steps[stepIndex].key}`);
    },
    [router]
  );

  const handleNext = useCallback(() => {
    if (activeStep < steps.length - 1) {
      navigateToStep(activeStep + 1);
    }
  }, [activeStep, navigateToStep]);

  const handleBack = useCallback(() => {
    if (activeStep > 0) {
      navigateToStep(activeStep - 1);
    }
  }, [activeStep, navigateToStep]);

  const handleStep = useCallback(
    (step: number) => () => {
      navigateToStep(step);
    },
    [navigateToStep]
  );

  const StepComponent = useMemo(
    () => steps[activeStep].component,
    [activeStep]
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

      <Box sx={{ py: 4 }}>
        <StepComponent />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 10 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          sx={{ mr: 1 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
