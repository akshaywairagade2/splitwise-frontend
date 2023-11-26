import react, { useEffect, useState } from "react"
import axios from "axios";
import {

    Box,
    Stack,
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";


const Friends = () => {



    return (
        <Box
            padding={10}
            width="100%"
            maxH="90%"
            overflowY={"auto"}
        >
            <Stack spacing={3}>
                <h1>Friends</h1>
            </Stack>

        </Box >
    )
};

export default Friends;