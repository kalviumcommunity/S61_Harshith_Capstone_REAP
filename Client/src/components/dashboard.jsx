import { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, IconButton, HStack, Spacer, Text, useToast, Image, Button, Textarea, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Circle } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from 'axios';

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
  const token = localStorage.getItem('token');
  const newItem = { title: 'New Note', content: '' };

  useEffect(() => {
    axios.get('http://localhost:3000/notes', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('Fetched notes:', response.data);
        const data = Array.isArray(response.data) ? response.data : [];
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
        toast({
          title: "Error fetching notes",
          description: "Unable to fetch notes from the server.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  const handleNewItem = () => {
    const newNote = { title: newItem.title, content: newItem.content };

    axios.post('http://localhost:3000/notes/post', newNote, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('Response from POST:', response.data);
        setItems([...items, response.data]);
        setActiveItem(response.data);
        console.log('Created new note:', response.data);
      })
      .catch(error => {
        console.error('Error creating note:', error);
        toast({
          title: "Error creating note",
          description: "Unable to create a new note.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:3000/notes/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setItems(items.filter(item => item._id !== id));
        if (activeItem && activeItem._id === id) {
          setActiveItem(null);
        }
        toast({
          title: "Item deleted.",
          description: "The item has been deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log('Deleted note with id:', id);
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        toast({
          title: "Error deleting note",
          description: "Unable to delete the note.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    const updatedItem = { ...activeItem, content: updatedContent };
    setActiveItem(updatedItem);

    console.log('Updated item before sending to API:', updatedItem);

    axios.put(`http://localhost:3000/notes/update/${activeItem._id}`, updatedItem, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('Response from update API:', response.data);
        setItems(items.map(item => (item._id === activeItem._id ? response.data : item)));
        console.log('Items after update:', items);
      })
      .catch(error => {
        console.error('Error updating note:', error);
        toast({
          title: "Error updating note",
          description: "Unable to update the note.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value;
    const updatedItem = { ...activeItem, title: updatedTitle };
    setActiveItem(updatedItem);

    console.log('Updated item before sending to API:', updatedItem);

    axios.put(`http://localhost:3000/notes/update/${activeItem._id}`, updatedItem, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('Response from update API:', response.data);
        setItems(items.map(item => (item._id === activeItem._id ? response.data : item)));
        console.log('Items after update:', items);
      })
      .catch(error => {
        console.error('Error updating note:', error);
        toast({
          title: "Error updating note",
          description: "Unable to update the note.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCircle, setSelectedCircle] = useState(null);

  const handleCircleClick = (index) => {
    setSelectedCircle(index);
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
          {Array.isArray(items) && items.map(item => (
            <Box
              key={item._id}
              w="300px"
              p={4}
              bg="yellow.200"
              shadow="sm"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              border="1px solid black"
            >
              <Text onClick={() => handleItemClick(item)} cursor="pointer" fontWeight="bold">
                {item.title || 'New Note'}
              </Text>
              <IconButton icon={<DeleteIcon />} aria-label="Delete" variant="ghost" bg="#FFF1D0" onClick={() => handleDeleteItem(item._id)} />
            </Box>
          ))}
          <Spacer />
        </VStack>
        <Box flex={1} p={4}>
          <VStack align="start" w="100%">
            {activeItem ? (
              <>
                <Input
                  value={activeItem.title}
                  onChange={handleTitleChange}
                  placeholder='Title'
                  focusBorderColor="white"
                  resize="none"
                  border="none"
                  _focus={{ border: 'none' }}
                  fontSize={"lg"} fontWeight="bold"
                />
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
                />
                {activeItem.image && (
                  <Image src={`http://localhost:3000/${activeItem.image}`} alt="Uploaded" mt={4} />
                )}
              </>
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
                  key={index}
                  size="30px"
                  bg={selectedCircle === index ? 'yellow' : 'black'}
                  onClick={() => handleCircleClick(index)}
                  cursor="pointer"
                />
              ))}
            </HStack>
            <Box w="100%" display="flex" justifyContent="space-around">
              <Text>1. Plain Text 2. Rich Text 3. Markdown</Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="100%" border="2px solid black" display="flex" alignItems="center" justifyContent="center">
              <Button variant="normal"><Image src={Rect1} boxSize="30px" />Personal</Button>
              <Button variant="normal"><Image src={Rect2} boxSize="30px" />Work</Button>
              <Button variant="normal"><Image src={Rect3} boxSize="30px" />Hobbies</Button>
              <Button variant="normal"><Image src={Rect4} boxSize="30px" />Essential</Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default Navbar;
