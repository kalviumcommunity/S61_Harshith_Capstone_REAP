import React from 'react';
import { Flex, Text, VStack, Link, Image, HStack, Center } from '@chakra-ui/react';
import Logo from '../../assets/FooterLogo.svg';
import FacebookIcon from '../../assets/facebook.svg';
import TwitterIcon from '../../assets/X.svg';
import InstagramIcon from '../../assets/Insta.svg';

const Footer = () => {
  return (
    <Flex as="footer" direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" p={4} bg="gray.800" color="white">
      <Center mb={{ base: 4, md: 0 }}>
        <Image src={Logo} alt="Reap Logo" />
      </Center>
      <VStack align="flex-start" mb={{ base: 4, md: 0 }}>
        <Text>© 2024 REAP. All rights reserved.</Text>
        <HStack spacing={4}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms of service</Link>
        </HStack>
      </VStack>
      <VStack align="flex-start" mb={{ base: 4, md: 0 }}>
        <Text fontWeight="bold">Contact Us</Text>
        <Link href="mailto:info@reap.com" isExternal>Email: info@reap.com</Link>
        <Link href="tel:+1234567890" isExternal>Phone: +1234567890</Link>
      </VStack>
      <VStack align="flex-start">
        <Text fontWeight="bold">Follow Us</Text>
        <HStack spacing={4} bg="white" width="150px" height="50px" borderRadius="20px" align="center" justify="center" _hover={{ bg: '#E03E00' }}>
          <Link href="https://www.facebook.com/yourpage" isExternal><Image src={FacebookIcon} alt="Facebook" /></Link>
          <Link href="https://www.twitter.com/yourpage" isExternal><Image src={TwitterIcon} alt="Twitter" /></Link>
          <Link href="https://www.instagram.com/yourpage" isExternal><Image src={InstagramIcon} alt="Instagram" /></Link>
        </HStack>
      </VStack>
    </Flex>
  );
};
export default Footer;
