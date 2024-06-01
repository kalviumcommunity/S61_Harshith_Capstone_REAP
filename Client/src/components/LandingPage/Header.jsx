import React from 'react';
import { Flex, Button, Image, Box } from '@chakra-ui/react';
import Logo from '../../assets/Group_24.svg';


const Header = () => {

  return (
    <Flex as="nav" justify="space-between" align="center" p={4} bg="white" boxShadow="md">
      <Image src={Logo} alt="AMARAZ Logo" width="100px" ml="4%" />
      <Box display="flex" alignItems="center" mr="4%">
        
          <Button variant="link" fontSize="16px" mr={4} verticalAlign="middle" color="black">
            Log In
          </Button>
       
          <Button
            width="120px"
            height="40px"
            borderRadius="25px"
            bg="black"
            color="white"
            _hover={{ bg: 'black' }}
            verticalAlign="middle"
          >
            Sign up
          </Button>
       
      </Box>
    </Flex>
  );
};

export default Header;
