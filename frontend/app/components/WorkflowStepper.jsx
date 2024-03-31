'use client'
import { useEffect } from 'react';
import { gameStatuses } from '@/constants'
import { Box,
    Step,
    Stepper,
    StepIndicator,
    StepNumber,
    StepStatus,
    StepIcon,
    StepTitle,
    useSteps,  } from '@chakra-ui/react';
const WorkflowStepper = ({GameStatus}) => {

  const { activeStep, setActiveStep } = useSteps({
    initialStep: 0,
  });

  useEffect(() => {
    if (typeof GameStatus !== 'undefined') {
      setActiveStep(GameStatus);
    }
  }, [GameStatus, setActiveStep]);

  return (
    <Box m="auto" borderWidth='1px' borderRadius='lg' boxShadow='lg' p='6' rounded='md' bg='gray.50'>
      <Stepper index={activeStep}>
          {Object.entries(gameStatuses).map(([statusKey, statusValue]) => (
              <Step key={Number(statusKey)}>
                  <StepIndicator>
                      <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber>{Number(statusKey) + 1}</StepNumber>}
                          active={<StepNumber>{Number(statusKey) + 1}</StepNumber>}
                      />
                  </StepIndicator>
                  <Box flexShrink='2'ml={1} mr={1}>
                      <StepTitle fontSize="xs" >{statusValue}</StepTitle>
                  </Box>
              </Step>
          ))}
      </Stepper>
    </Box>
  )
}

export default WorkflowStepper
