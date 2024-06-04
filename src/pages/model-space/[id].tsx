import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Grid,
  GridItem,
  Select,
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  Flex,
  Spacer,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackDivider,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import {
  ModelSpaceDetails,
  PredictionInput,
  PredictionOutput,
  getModelSpace,
  predictModelSpace,
} from "@/utils/apiService";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";

const ModelSpace = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modelSpace, setModelSpace] = useState<ModelSpaceDetails | null>(null);
  const [inputs, setInputs] = useState<PredictionInput>({});
  const [outputs, setOutputs] = useState<PredictionOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    const fetchModelSpace = async () => {
      try {
        const data = await getModelSpace(id as string);
        setModelSpace(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchModelSpace();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setInputs((prev) => ({ ...prev, [name]: inputValue }));
  };

  const handleSliderChange = (name: string, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputs((prev) => ({ ...prev, [name]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await predictModelSpace(id as string, inputs);
      setOutputs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={`Error Loading Model Space: ${error}`} />;
  }

  return (
    <Box>
      <Head>
        <title>{modelSpace?.name}</title>
      </Head>
      <Box bg={bgColor} py={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={4}>
          {modelSpace?.name}
        </Heading>
        <Text fontSize="xl" textAlign="center" mb={8}>
          {modelSpace?.description}
        </Text>
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8} p={8}>
        <GridItem>
          <Card borderWidth={1} borderRadius="md" borderColor={borderColor}>
            <CardHeader>
              <Heading size="lg">Inputs</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={6} divider={<StackDivider />}>
                {modelSpace?.inputs.map((input) => (
                  <Box key={input.name}>
                    <FormControl>
                      <FormLabel fontSize="lg">{input.name}</FormLabel>
                      {input.type === "text" && (
                        <Input
                          type="text"
                          name={input.name}
                          value={inputs[input.name] as string}
                          onChange={handleInputChange}
                          required={input.required}
                          size="lg"
                          variant="filled"
                          bg={bgColor}
                          borderWidth={1}
                          borderColor={inputBorderColor}
                        />
                      )}
                      {input.type === "bool" && (
                        <RadioGroup
                          name={input.name}
                          value={inputs[input.name] as string}
                          onChange={handleInputChange}
                        >
                          <Stack direction="row">
                            <Radio value="true">True</Radio>
                            <Radio value="false">False</Radio>
                          </Stack>
                        </RadioGroup>
                      )}
                      {input.type === "number" && (
                        <Flex alignItems="center">
                          <Slider
                            name={input.name}
                            min={0}
                            max={100}
                            step={1}
                            value={inputs[input.name] as number}
                            onChange={(value) => handleSliderChange(input.name, value)}
                            size="lg"
                            colorScheme="blue"
                          >
                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                          </Slider>
                          <Text ml={4} fontSize="lg">
                            {inputs[input.name]}
                          </Text>
                        </Flex>
                      )}
                      {input.type === "select" && (
                        <Select
                          name={input.name}
                          value={inputs[input.name] as string}
                          onChange={handleInputChange}
                          size="lg"
                          variant="filled"
                          bg={bgColor}
                          borderWidth={1}
                          borderColor={inputBorderColor}
                        >
                          {input.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      )}
                      {input.type === "textarea" && (
                        <Textarea
                          name={input.name}
                          value={inputs[input.name] as string}
                          onChange={handleInputChange}
                          required={input.required}
                          size="lg"
                          variant="filled"
                          bg={bgColor}
                          borderWidth={1}
                          borderColor={inputBorderColor}
                        />
                      )}
                      {input.type === "audio" && (
                        <Input
                          type="file"
                          name={input.name}
                          accept="audio/*"
                          onChange={handleFileInputChange}
                          required={input.required}
                          size="lg"
                          variant="unstyled"
                        />
                      )}
                      {input.type === "image" && (
                        <Input
                          type="file"
                          name={input.name}
                          accept="image/*"
                          onChange={handleFileInputChange}
                          required={input.required}
                          size="lg"
                          variant="unstyled"
                        />
                      )}
                    </FormControl>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
          <Button onClick={handleSubmit} colorScheme="blue" size="lg" mt={8}>
            Predict
          </Button>
        </GridItem>
        <GridItem>
          {outputs && (
            <Card borderWidth={1} borderRadius="md" borderColor={borderColor}>
              <CardHeader>
                <Heading size="lg">Outputs</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing={6} divider={<StackDivider />}>
                  {modelSpace?.outputs.map((output) => (
                    <Box key={output.name}>
                      <Heading size="md" mb={2}>
                        {output.name}
                      </Heading>
                      {(output.type === "text" ||
                        output.type === "number" ||
                        output.type === "bool") && (
                        <Text fontSize="lg">{outputs[output.name] as string}</Text>
                      )}
                      {output.type === "audio" && (
                        <audio controls style={{ width: "100%" }}>
                          <source src={outputs[output.name] as string} type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      {output.type === "image" && (
                        <Image
                          src={outputs[output.name] as string}
                          alt={output.name}
                          objectFit="cover"
                          borderRadius="md"
                        />
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ModelSpace;