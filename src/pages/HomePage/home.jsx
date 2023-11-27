import react, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
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
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import axios from "axios";


const Home = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [allExpenses, setAllExpenses] = useState([]);
    const [cost, setCost] = useState(0);
    const [info, setInfo] = useState([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const FetchAllExpenses = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://splitwise-backend.onrender.com/api/expenses/getexpenses",
                {
                    Email: userInfo?.User?.emailId,
                },
                config
            );

            if (data) {
                setAllExpenses(data.expenses);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const AddExpense = async (id) => {

        if (!info && !cost) {
            toast({
                title: "Fill the Fields",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://splitwise-backend.onrender.com/api/expenses/addexpense",
                {
                    id: info?._id,
                    cost: Number(cost),
                    issender: info?.senderEmail == userInfo?.User?.emailId
                },
                config
            );

            if (data) {

                toast({
                    title: "Expenses Added Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                onClose()
                FetchAllExpenses();
            }



        } catch (error) {
            console.log(error)
        }
    }


    const SettleUp = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://splitwise-backend.onrender.com/api/expenses/settleup",
                {
                    id: id
                },
                config
            );

            if (data) {

                toast({
                    title: "Expenses Added Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                FetchAllExpenses();
            }

        } catch (error) {
            console.log(error)
        }
    }

    console.log(info, cost)

    useEffect(() => {
        FetchAllExpenses();
    }, [])

    console.log(allExpenses, "allexpenses")


    const OpenModal_AssignExpense = (expense) => {
        onOpen();
        setInfo(expense);
        setCost(0)
    }

    return (
        <Box
            padding={10}
            width="100%"
            maxH="90%"
            overflowY={"auto"}
        >
            <Stack spacing={3}>
                {allExpenses.length ? <div>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th textAlign="center">Index</Th>
                                    <Th textAlign="center">Sender Email Id</Th>
                                    <Th textAlign="center">Receiver Email Id</Th>
                                    <Th textAlign="center">Total Expense</Th>
                                    <Th textAlign="center">AddExpense</Th>
                                    <Th textAlign="center">SettleUp</Th>
                                    <Th textAlign="center">Owes/Lent</Th>
                                </Tr>
                            </Thead>
                            <Tbody>{
                                allExpenses.map((expense, index) => (
                                    (
                                        <Tr>
                                            <Td textAlign="center">{index + 1}</Td>
                                            <Td textAlign="center">{expense.senderEmail}</Td>
                                            <Td textAlign="center">{expense.receiverEmail}</Td>
                                            <Td textAlign="center">{expense?.senderEmail == userInfo?.User?.emailId ? expense.value : -expense.value}</Td>
                                            <Td textAlign="center"><Button onClick={(e) => { OpenModal_AssignExpense(expense) }}>AddExpense</Button></Td>
                                            <Td textAlign="center"><Button onClick={(e) => { SettleUp(expense._id) }}>SettleUp</Button></Td>

                                            {
                                                (expense?.senderEmail == userInfo?.User?.emailId ? expense.value : -expense.value) > 0 ?
                                                    <Td textAlign="center"><Button backgroundColor="green.200">Lent</Button></Td>
                                                    :
                                                    (expense?.senderEmail == userInfo?.User?.emailId ? expense.value : -expense.value) == 0 ?
                                                        <Td textAlign="center"><Button backgroundColor="gray.200">Nill</Button></Td>
                                                        :
                                                        <Td textAlign="center"><Button backgroundColor="red.200">Owes</Button></Td>
                                            }

                                        </Tr>
                                    )
                                ))
                            }

                            </Tbody>
                        </Table>
                    </TableContainer>
                </div> : <div style={{ textAlign: "center" }}>-- No Expenses -- </div>
                }
            </Stack>
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="300px" w="400px">
                    <ModalHeader
                        fontSize="30px"
                        fontFamily="Work sans"
                        d="flex"
                        textAlign="center"
                    >
                        Add Expenses
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        d="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >

                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={info?.receiverEmail == userInfo?.User?.emailId ? info?.senderEmail : info?.receiverEmail}
                                placeholder="Email Address"
                                disabled
                            />
                        </FormControl>

                        <FormControl id="cost" isRequired>
                            <FormLabel>Add Expenses</FormLabel>
                            <Input
                                type="number"
                                value={cost}
                                placeholder="Enter expenses"
                                onChange={(e) => { setCost(e.target.value) }} />
                        </FormControl>
                        <Button
                            onClick={AddExpense}
                            bg={'blue.400'}
                            color={'white'}
                            width="100%"
                            marginTop={2}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Submit
                        </Button>
                        <ModalCloseButton />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box >
    );
};


export default Home;