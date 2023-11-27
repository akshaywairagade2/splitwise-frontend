import react, { useEffect, useState } from "react"
import axios from "axios";
import {

    TableContainer,
    Box,
    Stack,
    Select,
    Table,
    TableCaption,
    Thead,
    Tfoot,
    Th,
    Td,
    Tbody,
    Tr,
    Button,
    Input,
    Link,
    Text

} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";


const MyRequest = () => {


    const [allrequest, setAllRequest] = useState([])
    const [total_requests, setTotal_Requests] = useState(false);
    const toast = useToast();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));


    const FetchAllRequets = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/api/request/display",
                {
                    receiverEmail: userInfo?.User?.emailId,
                    flag: false
                },
                config
            );

            if (data)
                setAllRequest(data.Requests);

        } catch (error) {
            toast({
                title: "Unable to fetch",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }
    }

    useEffect(() => {
        FetchAllRequets()
    }, [])


    const AcceptRequest = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/request/acceptinvite",
                {
                    id: id
                },
                config
            );

            if (data) FetchAllRequets()

            toast({
                title: "Invitation Accepted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        } catch (error) {
            toast({
                title: "Unable to fetch",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }
    }

    const RejectRequest = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/request/rejectinvite",
                {
                    id: id
                },
                config
            );

            if (data) FetchAllRequets()

            toast({
                title: "Invitation Rejected Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        } catch (error) {
            toast({
                title: "Unable to fetch",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }



    return (
        <Box
            padding={10}
            width="100%"
            maxH="90%"
            overflowY={"auto"}
        >
            <Stack spacing={3}>
                {allrequest.length ? <div>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th textAlign="center">Index</Th>
                                    <Th textAlign="center">Sender Email Id</Th>
                                    <Th textAlign="center">Receiver Email Id</Th>
                                    <Th textAlign="center">Accept</Th>
                                    <Th textAlign="center">Reject</Th>
                                </Tr>
                            </Thead>
                            <Tbody>{
                                allrequest.map((request, index) => (
                                    (
                                        <Tr>
                                            <Td textAlign="center">{index + 1}</Td>
                                            <Td textAlign="center">{request.senderEmail}</Td>
                                            <Td textAlign="center">{request.receiverEmail}</Td>
                                            <Td textAlign="center"><Button onClick={(e) => { AcceptRequest(request._id) }}>Accept</Button></Td>
                                            <Td textAlign="center"><Button onClick={(e) => { RejectRequest(request._id) }}>Reject</Button></Td>
                                        </Tr>
                                    )
                                ))
                            }

                            </Tbody>
                        </Table>
                    </TableContainer>
                </div> : <div style={{ textAlign: "center" }}>-- No Requests -- </div>
                }
            </Stack>
        </Box>
    )
};

export default MyRequest;