import React from 'react';
import { VStack, Flex, Text, Image, Box, Center } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Custom1 from '../../assets/custom1.svg';
import Custom2 from '../../assets/custom2.svg';
import Custom3 from '../../assets/custom3.svg';
import Custom4 from '../../assets/custom4.svg'; 
import BackgroundImg from '../../assets/feature_bg.svg'

const MotionVStack = motion(VStack);

const features = [
  {
    title: 'Customization of note taking systems',
    description: 'Customize your note taking style based on your preference.',
    icon: Custom1,
    color: '#CDB4DB',
  },
  {
    title: 'Organizing made easy',
    description: 'Organizing of notes made easy with tagging system.',
    icon: Custom2,
    color: '#FFC8DD',
  },
  {
    title: 'Sleek and simple to use',
    description: 'Minimalistic design for easy use.',
    icon: Custom3,
    color: '#FFAFCC',
  },
  {
    title: 'Markdown scripting',
    description: 'Backlinking with markdown support to visualize ideas easily.',
    icon: Custom4,
    color: '#BDE0FE',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1, 
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const FeatureBox = ({ feature }) => (
  <motion.div variants={boxVariants}>
    <Box
      p={6}
      m={4}
      bg={feature.color}
      borderRadius="lg"
      boxShadow="lg"
      textAlign="center"
      width="300px"
      height="300px"
      direction="column"
      align="center"
    >
      <Center mb={4}>
        <Image src={feature.icon} alt={feature.title} boxSize="80px" />
      </Center>
      <Text fontSize="xl" fontWeight="bold" mb={2}>{feature.title}</Text>
      <Text color="gray.600">{feature.description}</Text>
    </Box>
  </motion.div>
);

const FeaturesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    
    <MotionVStack
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      spacing={12}
      py={20}
      textAlign="center"
      borderRadius="lg"
      backgroundImage={BackgroundImg}
      
    >
      <Flex wrap="wrap" justify="center">
        {features.map((feature, index) => (
          <FeatureBox key={index} feature={feature} />
        ))}
      </Flex>
    </MotionVStack>
  );
};

export default FeaturesSection;

