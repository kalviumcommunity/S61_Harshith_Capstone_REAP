import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  VStack,
  IconButton,
  HStack,
  Spacer,
  Text,
  useToast,
  Image,
  Button,
  Textarea,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Circle,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const token = localStorage.getItem('token');
  const newItem = { title: 'New Note', content: '' };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get('https://s61-harshith-capstone-reap.onrender.com/notes', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log('Fetched notes:', response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
        toast({
          title: 'Error fetching notes',
          description: 'Unable to fetch notes from the server.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleNewItem = () => {
    const formData = new FormData();
    formData.append('title', newItem.title);
    formData.append('content', newItem.content);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    axios
      .post('https://s61-harshith-capstone-reap.onrender.com/notes/post', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Response from POST:', response.data);
        setItems([...items, response.data]);
        setActiveItem(response.data);
        setSelectedFile(null);
        console.log('Created new note:', response.data);
      })
      .catch((error) => {
        console.error('Error creating note:', error);
        toast({
          title: 'Error creating note',
          description: 'Unable to create a new note.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadImage = () => {
    if (!activeItem || !selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios
      .put(`https://s61-harshith-capstone-reap.onrender.com/notes/update/${activeItem._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Response from update API:', response.data);
        setItems(items.map((item) => (item._id === activeItem._id ? response.data : item)));
        setActiveItem(response.data);
        setSelectedFile(null);
        toast({
          title: 'Image uploaded',
          description: 'The image has been uploaded successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        toast({
          title: 'Error uploading image',
          description: 'Unable to upload the image.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`https://s61-harshith-capstone-reap.onrender.com/notes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setItems(items.filter((item) => item._id !== id));
        if (activeItem && activeItem._id === id) {
          setActiveItem(null);
        }
        toast({
          title: 'Item deleted.',
          description: 'The item has been deleted successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        console.log('Deleted note with id:', id);
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
        toast({
          title: 'Error deleting note',
          description: 'Unable to delete the note.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleContentChange = (e) => {
    const updatedContent = { ...activeItem, content: e.target.value };
    setActiveItem(updatedContent);
    updateItem(updatedContent);
  };

  const updateItem = (updatedItem) => {
    axios
      .put(`https://s61-harshith-capstone-reap.onrender.com/notes/update/${updatedItem._id}`, updatedItem, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setItems(items.map((item) => (item._id === updatedItem._id ? response.data : item)));
        console.log('Updated note:', response.data);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
        toast({
          title: 'Error updating note',
          description: 'Unable to update the note.',
          status: 'error',
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
          {Array.isArray(items) &&
            items.map((item) => (
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
                {item.image ? (
                  <Image
                    src={`https://s61-harshith-capstone-reap.onrender.com${item.image}`}
                    alt="Note Thumbnail"
                    boxSize="50px"
                    borderRadius="full"
                  />
                ) : (
                  <Image
                    src={ProfileImg} // Placeholder image
                    alt="No Image"
                    boxSize="50px"
                    borderRadius="full"
                  />
                )}
                <Text
                  onClick={() => handleItemClick(item)}
                  cursor="pointer"
                  fontWeight="bold"
                  ml={3}
                >
                  {item.title || 'New Note'}
                </Text>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete"
                  variant="ghost"
                  bg="#FFF1D0"
                  onClick={() => handleDeleteItem(item._id)}
                />
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
                  onChange={(e) =>
                    setActiveItem({ ...activeItem, title: e.target.value })
                  }
                  placeholder="Title"
                  focusBorderColor="white"
                  resize="none"
                  border="none"
                  _focus={{ border: 'none' }}
                  fontSize={'lg'}
                  fontWeight="bold"
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
              </>
            ) : (
              <Text>Select an item to display its content.</Text>
            )}
          </VStack>
          <Input type="file" onChange={handleFileChange} mt={4} />
          <Button onClick={handleUploadImage} mt={2}>
            Upload Image
          </Button>
        </Box>
        <Box pos="fixed" bottom={4} right={4}>
          <Button onClick={onOpen} variant="normal">
            <Image src={CustomLogo} width="50px" />
          </Button>
        </Box>
      </HStack>
      <Box
        bg="white"
        display="flex"
        justifyContent="center"
        width="300px"
        p={2}
        border="1px solid black"
      >
        <IconButton
          icon={<AddIcon />}
          aria-label="Add"
          size="lg"
          bg="white"
          border="2px solid black"
          onClick={handleNewItem}
        />
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
            <Box
              width="100%"
              border="2px solid black"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button variant="normal">
                <Image src={Rect1} boxSize="30px" />
                Personal
              </Button>
              <Button variant="normal">
                <Image src={Rect2} boxSize="30px" />
                Work
              </Button>
              <Button variant="normal">
                <Image src={Rect3} boxSize="30px" />
                Hobbies
              </Button>
              <Button variant="normal">
                <Image src={Rect4} boxSize="30px" />
                Essential
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default Navbar;
