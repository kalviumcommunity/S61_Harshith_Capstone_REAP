import{ useState } from 'react';
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
import LoginImg from "../../assets/login_img.svg";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../api';
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('loginTime', new Date().getTime());
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <Flex height="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      {/* Left half with image */}
      <Box flex="1" display={{ base: "none", md: "block" }}>
        <Image
          src={LoginImg}
          alt="Illustration"
          objectFit="cover"
          height="100%"
          width="100%"
        />
      </Box>

      {/* Right half with form */}
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
            Login
          </Heading>
          <Stack spacing={4}>
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
              onClick={handleLogin}
            >
              Login
            </Button>
            <Text textAlign="center" mt={2}>
              Don't have an account?{" "}
              <Link as={RouterLink} to="/register" color="teal.500">
                Register
              </Link>
            </Text>
            <Button onClick={handleGoogleLogin}>
              <FcGoogle /> oogle
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginForm;
