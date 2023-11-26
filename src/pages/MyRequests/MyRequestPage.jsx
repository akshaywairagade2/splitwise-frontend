import react, { useEffect } from "react"
import Header from "../../Header/Header";
import MyRequest from "./MyRequest";
import {
    Container,
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
    Select,
    Input,
    InputGroup,
    InputLeftElement,
    Image
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const MyRequestPage = () => {

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) navigate('/login')
    }, [userInfo])

    return (
        <div style={{ width: "100%" }}>
            <Header />
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                <MyRequest />
            </Box>
        </div>
    )
};

export default MyRequestPage;