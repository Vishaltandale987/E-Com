import React, { useEffect, useState } from 'react'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  keyframes,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon } from '@chakra-ui/icons';
import axios from 'axios';



function User_Auth() {
  

  const [userdata, setuserdata] = useState()


  const size = "45px";
  const color = "teal";



  



  const pulseRing = keyframes`
    0% {
      transform: scale(0.33);
    }
    40%,
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
    `;



    // get user
    let userId = localStorage.getItem("id");
    // console.log(ass,"asasas")

    const add = () => {

     
      
      if(userId === null){

        return false

      }else  if(userId !== ""){

        return true

      }

    }

      let isAuthenticated = add()

    const getUser = async () => {
  
  
      try {
        const res = await axios(`https://new-facebook-server.vercel.app/user/${userId}`);
        setuserdata(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {

      if(isAuthenticated){

        getUser()
      }
    }, [])

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      window.location.reload(false);
    }

  return (
    <div>
      {!isAuthenticated ? (
       <Link to="/signin">
       <StarIcon className="icon" />
     </Link>
       
      ) : null}

      {isAuthenticated && (
        <Flex justifyContent="center">
          <Popover placement="bottom" isLazy>
            <PopoverTrigger>
              <Flex
                justifyContent="center"
                alignItems="center"
                h="216px"
                w="full"
                overflow="hidden"
              >
                {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
                <Box
                  as="div"
                  position="relative"
                  w={size}
                  h={size}
                  _before={{
                    content: "''",
                    position: "relative",
                    display: "block",
                    width: "300%",
                    height: "300%",
                    boxSizing: "border-box",
                    marginLeft: "-100%",
                    marginTop: "-100%",
                    borderRadius: "70px",
                    bgColor: color,
                    animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                  }}
                >
              
                  <Avatar
                  style={{
                    marginLeft:"-22px"
                  }}
                    src={"https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"}
                    size="full"
                    position="absolute"
                    top={0}
                    
                  />
                </Box>
              </Flex>
            </PopoverTrigger>
            <PopoverContent _focus={{ boxShadown: "none" }} mt={"-70px"}>
              <PopoverBody w="full">
                {isAuthenticated && (
                  <Center>
                    <Box
                      maxW={"270px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      overflow={"hidden"}
                    >
                  
                      <Flex justify={"center"} >
                        <Avatar
                          size={"xl"}
                          src={"https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"}
                          alt={"Author"}
                          css={{
                            border: "2px solid white",
                          }}
                        />
                      </Flex>

                      <Box>
                        <Stack spacing={0} align={"center"} mb={5}>
                          <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                            
                          >
                          {userdata?.username}
                          </Heading>

                   
                        </Stack>

                        <Flex justifyContent={"space-around"} pb={"10px"}>
                        
                          <Button
                            w={"fit-content"}
                            mt={10}
                            // bg={useColorModeValue("#151f21", "gray.900")}
                            color={"white"}
                           
                            colorScheme='whatsapp'
                            onClick={logout

                              }
                          >
                            Logout
                          </Button>
                        </Flex>
                      </Box>
                    </Box>
                  </Center>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      )}
    </div>
  );
}

export default User_Auth;