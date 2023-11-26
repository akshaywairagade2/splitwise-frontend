import react, { useEffect, useState } from "react"
import axios from "axios";
import {

    Box,
    Stack,
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";


const InviteFriends = () => {



    return (
        <Box
            padding={10}
            width="100%"
            maxH="90%"
            overflowY={"auto"}
        >
            <Stack spacing={3}>
                <h1>InviteFriends</h1>
            </Stack>

        </Box >
    )
};

export default InviteFriends;