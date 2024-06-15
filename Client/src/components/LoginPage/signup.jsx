import  { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  Heading,
  Image,
  Flex,
  useColorModeValue,
  CloseButton,
  Alert,
} from "@chakra-ui/react";
import Background from "../../assets/Background.svg";
import RegisterImg from "../../assets/register_img.svg";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../api';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await api.post('/register', { username, email, password });
      navigate('/login');
    } catch (error) {
      setError(error.response?.data || 'Registration failed');
    }
  };

  return (
    <Flex height="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Box flex="1" display={{ base: "none", md: "block" }}>
        <Image
          src={RegisterImg}
          alt="Illustration"
          objectFit="cover"
          height="100%"
          width="100%"
        />
      </Box>

      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        p={8}
        bg={useColorModeValue("gray.50", "gray.800")}
        bgImage={Background}
      >
        <Box
          p={8}
          bg="rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(20px)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          borderRadius="lg"
          width={{ base: "100%", md: "80%", lg: "60%" }}
          position={'relative'}
        >
          <CloseButton
            as={RouterLink}
            to="/"
            position="absolute"
            top={4}
            right={4}
          />
          <Heading as="h1" size="lg" mb={6} textAlign="center">
            Register
          </Heading>
          <Stack spacing={4}>
            <FormControl id="username" border={"black"}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" border={"black"}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" border={"black"}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm-password" border={"black"}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            {error && <Alert status="error">{error}</Alert>}
            <Button
              bg="rgba(251, 255, 0, 0.63)"
              size="md"
              mt={4}
              border={"2px solid black"}
              borderRadius={"15px"}
              width={"25%"}
              position={'relative'}
              left={'37%'}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Text textAlign="center" mt={2}>
              Already have an account?{" "}
              <Link as={RouterLink} to="/login" color="teal.500">
                Log in
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default RegistrationForm;
