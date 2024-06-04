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
  Divider,
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={8}
        p={8}
      >
        <GridItem>
          <VStack spacing={6} align="stretch">
            {modelSpace?.inputs.map((input) => (
              <FormControl key={input.name}>
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
                  <Checkbox
                    name={input.name}
                    isChecked={inputs[input.name] as boolean}
                    onChange={handleInputChange}
                    size="lg"
                    colorScheme="blue"
                  >
                    {(inputs[input.name] as boolean) ? "True" : "False"}
                  </Checkbox>
                )}
                {input.type === "number" && (
                  <Flex alignItems="center">
                    <Slider
                      name={input.name}
                      defaultValue={50}
                      min={0}
                      max={100}
                      step={1}
                      value={inputs[input.name] as number}
                      onChange={(value) =>
                        handleSliderChange(input.name, value)
                      }
                      size="lg"
                      colorScheme="blue"
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text ml={4} fontSize="lg">
                      {inputs[input.name] || 50}
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
            ))}
            <Button onClick={handleSubmit} colorScheme="blue" size="lg">
              Predict
            </Button>
          </VStack>
        </GridItem>

        <GridItem>
          {outputs && (
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="xl" mb={4}>
                Outputs
              </Heading>
              {modelSpace?.outputs.map((output) => (
                <Box key={output.name} borderWidth={1} borderRadius="md" p={4}>
                  <Flex alignItems="center" mb={2}>
                    <Text fontWeight="bold" fontSize="lg">
                      {output.name}
                    </Text>
                    <Spacer />
                    {(output.type === "text" || output.type === "number") && (
                      <Text fontSize="lg">{outputs[output.name]}</Text>
                    )}
                    {output.type === "bool" && (
                      <Text fontSize="lg">{outputs[output.name]?'True':'False'}</Text>
                    )}
                  </Flex>
                  {output.type === "audio" && (
                    <audio controls style={{ width: "100%" }}>
                      <source
                        src={outputs[output.name] as string}
                        type="audio/wav"
                      />
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
            </VStack>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ModelSpace;
