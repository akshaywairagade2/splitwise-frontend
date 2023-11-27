import react, { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Stack,
    Button,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react'
import { Select } from "chakra-react-select";
import { useToast } from "@chakra-ui/react";
import 'react-tagsinput/react-tagsinput.css'

const InviteFriends = () => {

    const toast = useToast();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const [alluser, setAllUser] = useState({});
    const [invitefriend, setInviteFriend] = useState([]);

    const groupedOptions = [
        {
            label: "Users",
            options: alluser
        },

    ];

    useEffect(() => {
        if (!userInfo) navigate('/')
    }, [userInfo])

    const submitHandler = async () => {

        if (!invitefriend.length) {
            toast({
                title: "Please enter email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }

        const invite = [];
        for (let i = 0; i < invitefriend.length; i++) {
            invite.push(invitefriend[i].value);
        }

        if (invite) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post(
                    "https://splitwise-backend.onrender.com/api/request/invite",
                    {
                        "senderEmail": userInfo?.User?.emailId,
                        "receiverEmail": invite,
                    },
                    config
                );

                toast({
                    title: "Invitation Send Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

                setTimeout(() => { navigate("/") }, 200);

            } catch (error) {
                toast({
                    title: "Unable to invite a friend",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

            }
        }

    };

    console.log(invitefriend)

    const getalluser = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.get(
                "https://splitwise-backend.onrender.com/api/auth/getalluser",
                config
            );


            if (data.user) {
                const setofalluser = data.user;
                var dict = []
                for (let i = 0; i < setofalluser.length; i++) {
                    if (setofalluser[i].emailId != userInfo?.User?.emailId) {
                        dict.push({ value: setofalluser[i].emailId, label: setofalluser[i].emailId })
                    }
                }
                setAllUser(dict)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getalluser();
    }, [])


    const handleTagChange = (selectedOptions) => {
        setInviteFriend(selectedOptions)
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
                        <Heading fontSize={'4xl'}>Send a Invite Request</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl p={4}>
                                <FormLabel>
                                    Select Users
                                </FormLabel>
                                <Select
                                    isMulti
                                    name="users"
                                    options={groupedOptions}
                                    placeholder="Select some users..."
                                    closeMenuOnSelect={false}

                                    onChange={handleTagChange}
                                />
                            </FormControl>
                            <Stack spacing={2}>
                                <Button
                                    onClick={submitHandler}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
};

export default InviteFriends;