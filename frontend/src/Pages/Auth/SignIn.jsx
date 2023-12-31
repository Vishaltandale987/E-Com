import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
  InputGroup,
  InputRightElement,
  useStatStyles,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

import { StageSpinner } from "react-spinners-kit";


const initState = {
  email: "",
  password: "",
};

function SignIn() {
  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();
  const toast = useToast();
  const [loader, setloader] = useState(false)
 
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloader(true)
      let res = await axios.post(
        "https://new-facebook-server.vercel.app/user/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);

      toast({
        position: "top",
        title: `${res.data.massege}`,
        status: "success",
        duration: 4000,
        isClosable: false,
      });
      setloader(false)
      if (res.data.massege === "login successful") {
        setTimeout(() => {
          navigate("/");
          window.location.reload(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
<>

{ loader ?  <div style={{
  position:"absolute",
  zIndex:"1",
  left:"38em",
  top:"5em"

}}>  
<StageSpinner  size={60} color="orange"/>

  </div>: null}

      <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      style={{
        position:"relative"
      }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>

        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>

              <NavLink to="/signup">
                <Button
                  bg={"green"}
                  color={"white"}
                  _hover={{
                    bg: "green",
                  }}
                >
                  Sign up
                </Button>
              </NavLink>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

</>

  );
}

export default SignIn;