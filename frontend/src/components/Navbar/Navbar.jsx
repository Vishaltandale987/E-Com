import React from "react";

import { NavLink } from "react-router-dom";
import "./Navbar.css";

import {
  Box,
  Flex,
  Button,
  Menu,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import User_Auth from "./User_Auth";

const Links = [{ url: "", title: "Home" },{url:"cart_page",title:"Cart"}];

let Auth = true;

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let cart_data = JSON.parse(localStorage.getItem("cart")) || [];



  return (
    <>
      <Box bg={useColorModeValue("blue.200", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NavLink to="/">
              <Box mr={100}>
                <h1 className="logo">E-Com</h1>
              </Box>
            </NavLink>

            <NavLink to="/man">
              <Button>Man</Button>
            </NavLink>

            <NavLink to="/women">
              <Button>Women</Button>
            </NavLink>


          </HStack>

          

          <Flex alignItems={"center"}>
          <NavLink to="/cart">
              <Button mr={4} >Cart ({cart_data.length})</Button>
            </NavLink>

            <Button mr={4} w={10} onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <MoonIcon className="icon" />
              ) : (
                <SunIcon className="icon" />
              )}
            </Button>
            <Menu>
              <User_Auth />
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.url}
                  to={`/${link.url}`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar;