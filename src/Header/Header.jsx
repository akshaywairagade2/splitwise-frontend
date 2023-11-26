import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    Image
} from '@chakra-ui/react'

// import ProfileModal from "./Profile/profilemodal"
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import logo from "../logo.svg"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Header = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState()
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;

    const email = user?.emailId;

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

    return (

        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            px={4}
            position={"auto"}
            top={0}
            width="100%"
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>

                    <Image
                        boxSize='80px'
                        src={logo}
                        alt='Logo'
                    />

                    <Stack direction={'row'} spacing={6}>
                        <Box as="a" href={'/'}
                            color={path == "/" ? "blue" : null}
                            _hover={{
                                color: "white",
                                borderRadius: '5',
                                backgroundColor: "gray"
                            }}
                            padding={2}
                        >
                            Home
                        </Box>
                        <Box as="a" href={'/friends'}
                            color={path == "/friends" ? "blue" : null}
                            _hover={{
                                color: "white",
                                borderRadius: '5',
                                backgroundColor: "gray"
                            }}
                            padding={2}
                        >
                            Friends
                        </Box>
                        <Box as="a" href={'/invitefriends'}
                            color={path == "/invitefriends" ? "blue" : null}
                            _hover={{
                                color: "white",
                                borderRadius: '5',
                                backgroundColor: "gray"
                            }}
                            padding={2}
                        >
                            InviteFriends
                        </Box>
                        <Box as="a" href={'/myrequests'}
                            color={path == "/myrequests" ? "blue" : null}
                            _hover={{
                                color: "white",
                                borderRadius: '5',
                                backgroundColor: "gray"
                            }}
                            padding={2}
                        >
                            MyRequests
                        </Box>
                    </Stack>
                </HStack>
                <HStack alignItems={'end'}>
                    <Button
                        color="gray"
                        _hover={{
                            color: "white",
                            borderRadius: '5',
                            backgroundColor: "gray"
                        }}
                        padding={2}
                        onClick={logoutHandler}
                    >
                        Logout
                    </Button>

                </HStack>
            </Flex>
        </Box >

    )
}

export default Header;

