import { useState } from 'react';
import { ChakraProvider, Box, VStack, IconButton, HStack, Spacer, Text, useToast, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Circle, Textarea } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import LogoImg from '../assets/FooterLogo.svg';
import CustomLogo from '../assets/Customize.svg';
import ProfileImg from '../assets/account.svg';
import Rect1 from '../assets/Rectangle43.svg';
import Rect2 from '../assets/Rectangle44.svg';
import Rect3 from '../assets/Rectangle45.svg';
import Rect4 from '../assets/Rectangle49.svg';

const Navbar = () => {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const toast = useToast();

  const handleNewItem = () => {
    const newItem = { id: Date.now(), content: '' };
    setItems([...items, newItem]);
    setActiveItem(newItem);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (activeItem && activeItem.id === id) {
      setActiveItem(null);
    }
    toast({
      title: "Item deleted.",
      description: "The item has been deleted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCircle, setSelectedCircle] = useState(null);

  const handleCircleClick = (index) => {
    setSelectedCircle(index);
  };

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setActiveItem({ ...activeItem, content: updatedContent });
    setItems(items.map(item => (item.id === activeItem.id ? { ...item, content: updatedContent } : item)));
  };

  return (
    <ChakraProvider>
      <HStack justify="space-between" w="300px" bg="white" borderRight="1px solid black" p={4}>
        <Image src={LogoImg} width="15%" height="30%" />
        <Image src={ProfileImg} width="15%" height="30%" />
      </HStack>
      <HStack h="81vh" align="start" paddingTop={3}>
        <VStack
          w="300px"
          h="full"
          p={4}
          bg="yellow.400"
          borderRight="1px solid"
          border="1px solid black"
        >
          {items.map(item => (
            <Box
              key={item.id}
              w="300px"
              p={4}
              bg="yellow.200"
              shadow="sm"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              border="1px solid black"
            >
              <Text onClick={() => handleItemClick(item)} cursor="pointer">
                {item.content.split('\n')[0] || 'New Note'}
              </Text>
              <IconButton icon={<DeleteIcon />} aria-label="Delete" variant="ghost" bg="#FFF1D0" onClick={() => handleDeleteItem(item.id)} />
            </Box>
          ))}
          <Spacer />
        </VStack>
        <Box flex={1} p={4}>
          <VStack align="start" w="100%">
            {activeItem ? (
              <Textarea
                value={activeItem.content}
                onChange={handleContentChange}
                size="sm"
                placeholder="Type your note here..."
                mt={2}
                focusBorderColor="white"
                height="60vh"
                resize="none"
                border="none"
                _focus={{ border: 'none' }}
                sx={{
                  '::placeholder': {
                    color: 'black',
                    fontWeight: 'bold',
                  },
                  '::before': {
                    content: `"${activeItem.content.split('\n')[0]}"`,
                    display: 'block',
                    fontWeight: 'bold',
                  },
                  '::after': {
                    content: `"${activeItem.content.split('\n').slice(1).join('\n')}"`,
                    display: 'block',
                  },
                  '::first-line': {
                    fontWeight: 'bold',
                  },
                }}
              />
            ) : (
              <Text>Select an item to display its content.</Text>
            )}
          </VStack>
        </Box>
        <Box pos="fixed" bottom={4} right={4}>
          <Button onClick={onOpen} variant="normal">
            <Image src={CustomLogo} width="50px" />
          </Button>
        </Box>
      </HStack>
      <Box bg="white" display="flex" justifyContent="center" width="300px" p={2} border="1px solid black">
        <IconButton icon={<AddIcon />} aria-label="Add" size="lg" bg="white" border="2px solid black" onClick={handleNewItem} />
      </Box>
     
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={4} alignItems="center" justifyContent="center">
              {[0, 1, 2].map((index) => (
                <Circle
                  size="30px"
                  bg={selectedCircle === index ? 'yellow' : 'black'}
                  onClick={() => handleCircleClick(index)}
                  cursor="pointer"
                  key={index}
                />
              ))}
            </HStack>
             <Box w={"100%"} display={"flex"} justifyContent={"space-around"}>
             <Text>
             1. Plain Text
              2. Rich Text
              3. Markdown
             </Text>
             </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width={"100%"} border={"2px solid black "} display={"flex"} alignItems="center" justifyContent="center">
              <Button variant={"normal"}><Image src={Rect1} boxSize="30px"/>Personal</Button> 
              <Button variant={"normal"}><Image src={Rect2} boxSize="30px"/>Work</Button> 
              <Button variant={"normal"}><Image src={Rect3} boxSize="30px"/>Hobbies</Button> 
              <Button variant={"normal"}><Image src={Rect4} boxSize="30px"/>Essential</Button> 
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default Navbar;
