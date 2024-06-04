import { Box, Text } from "@chakra-ui/react";

const ErrorMessage = ({ message }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Text color="red.500" fontSize="xl">
        {message}
      </Text>
    </Box>
  );
};

export default ErrorMessage;