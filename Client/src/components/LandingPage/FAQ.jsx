import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from '@chakra-ui/react';

export default function FAQ() {
  return (
    <Box maxW="800px" mx="auto" p={4} textAlign={'center'}  minH="48vh"  padding="10vh">
      <Heading as="h2" size="xl" mb={4}>
        FAQ’s
      </Heading>
      <Accordion allowToggle>
        <AccordionItem mb={4}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontSize={'lg'}>
                How secure is the data stored in the application?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Your data is stored securely using industry-standard encryption techniques...
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontSize={'lg'}>
                Can I access my notes across multiple devices?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes, you can access your notes across multiple devices...
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontSize={'lg'}>
                Does the note-taking app support collaboration features for team projects?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Our app supports collaboration features allowing you to work on projects with your team...
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
