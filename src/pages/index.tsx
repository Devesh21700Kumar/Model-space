import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useBreakpointValue,
  Card,
  CardBody,
  Stack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import { getModelSpaces } from "@/utils/apiService";

const Home = () => {
  const [modelSpaces, setModelSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    const fetchModelSpaces = async () => {
      try {
        const data = await getModelSpaces();
        setModelSpaces(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchModelSpaces();
  }, []);

  const handleSpaceClick = (space) => {
    setSelectedSpace(space);
    onOpen();
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Head>
        <title>Model Spaces</title>
      </Head>
      <Box bg="gray.100" py={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Model Spaces
        </Heading>
        {isMobile ? (
          <Carousel showThumbs={false} showStatus={false} infiniteLoop>
            {modelSpaces.map((space) => (
              <Card key={space.id} onClick={() => handleSpaceClick(space)} cursor="pointer" mx="auto" maxW="sm">
                <CardBody>
                  <Image src={space.avatar} alt={space.name} objectFit="cover" borderRadius="lg" />
                  <Stack mt="6" spacing="3" textAlign="center">
                    <Heading size="md">{space.name}</Heading>
                    <Text>{space.description}</Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Carousel>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={8} mx={8}>
            {modelSpaces.map((space) => (
              <GridItem key={space.id}>
                <Card onClick={() => handleSpaceClick(space)} cursor="pointer" h="100%">
                  <CardBody>
                    <VStack spacing={4} align="center" textAlign="center" h="100%" overflow="auto" maxH="400px">
                      <Image src={space.avatar} alt={space.name} objectFit="cover" borderRadius="lg" />
                      <Heading size="md">{space.name}</Heading>
                      <Text>{space.description}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedSpace?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center" mb={4}>
              <Image src={selectedSpace?.avatar} alt={selectedSpace?.name} objectFit="cover" borderRadius="lg" mb={4} />
              <Text mb={4} textAlign="center">{selectedSpace?.description}</Text>
            </Flex>
            <Divider />
            <Flex justify="flex-end" mt={4}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Link href={`/model-space/${selectedSpace?.id}`}>
                <Button variant="ghost">View Details</Button>
              </Link>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;