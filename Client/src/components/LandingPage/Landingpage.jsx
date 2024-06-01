import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import LandingImg from '../../assets/undraw.svg';
import BackgroundImg from '../../assets/Group_25.svg';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

export default function CallToActionWithImage() {
  return (
    <MotionBox
      bg="white"
      minH="88vh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 5, md: 24 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={LandingImg}
            />
          </Flex>
          <Stack
            flex={1}
            spacing={{ base: 2, md: 10 }}
            backgroundImage={BackgroundImg}
          >
            <MotionHeading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '4.5xl' }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <MotionText
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '40%',
                  position: 'absolute',
                  bottom: 2,
                  left: 0,
                  zIndex: -1,
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                Your Gateway to Cognitive Synergy
              </MotionText>
              <br />
              <MotionText
                pt={6}
                textAlign="center"
                fontSize="xl"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              >
                Elevate Your Mind's Potential with REAP's Unified Note-Taking Ecosystem
              </MotionText>
            </MotionHeading>
            <MotionText
              color={'black'}
              fontSize={'lg'}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            >
              Welcome to REAP, where innovation meets intuition in the realm of note-taking.
              Experience a paradigm shift as REAP seamlessly integrates your thoughts, tasks,
              and inspirations into a unified digital ecosystem.
            </MotionText>
            <Center>
              <MotionButton
                rounded={20}
                size={'lg'}
                fontWeight={'semibold'}
                px={6}
                colorScheme={'red'}
                bg={'#FF9F1C'}
                color="black"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
              >
                Get started for free
              </MotionButton>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </MotionBox>
  );
}

