import react, { useState, useEffect } from "react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import googleImage from '../assets/googleImage.jpg';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useColorModeValue,
    Image
} from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signinGoogle, signin } from "../redux/actions/auth";



const Login = () => {


    const [show, setShow] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const dispatch = useDispatch()

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));




    useEffect(() => {
        if (userInfo) navigate('/')
    }, [userInfo])

    function handleGoogleLoginSuccess(tokenResponse) {
        signinGoogle(tokenResponse)
        // const accessToken = tokenResponse.access_token;
        // dispatch(signinGoogle(accessToken, navigate))
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });


    const signinGoogle = async (tokenResponse) => {


        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    "emailId": email,
                    "password": password,
                    "googleAccessToken": tokenResponse.access_token
                },
                config
            );


            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });


            localStorage.setItem("userInfo", JSON.stringify(data));
            setTimeout(() => { navigate("/") }, 200);


        } catch (error) {
            toast({
                title: "User not found",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const submitHandler = async () => {

        if (!email || !password) {
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    "emailId": email,
                    "password": password,
                },
                config
            );


            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });


            localStorage.setItem("userInfo", JSON.stringify(data));
            setTimeout(() => { navigate("/") }, 500);


        } catch (error) {
            toast({
                title: "User not found",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }
    };



    return (
        <>
            <Flex
                minH={'80vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => { setEmail(e.target.value) }} />
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={show ? "text" : "password"}
                                        placeholder="Enter password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={2}>
                                <Button
                                    onClick={submitHandler}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Login
                                </Button>
                                <Button
                                    onClick={() => login()}
                                    bg={'green.200'}
                                    color={'black'}
                                    _hover={{
                                        bg: 'green.300',
                                    }}>
                                    <Image
                                        boxSize='15px'
                                        src={googleImage}
                                        alt='Google'
                                        width="10%"
                                        height="60%"
                                        margin="6px"
                                        paddingTop="1%"

                                    />
                                    Sign in with google
                                </Button>
                                <span style={{ textAlign: "center" }}>or</span>
                                <Stack pt={2}>
                                    <Text align={'center'}>
                                        Don't have an account?<Link href="/signup" color={'blue.400'}> SignUp</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
};

export default Login;