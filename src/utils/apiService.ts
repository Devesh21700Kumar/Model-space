import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ModelSpace = {
  id: string;
  name: string;
  description: string;
  avatar: string;
};

export type ModelSpaceDetails = {
  id: string;
  name: string;
  description: string;
  inputs: {
    name: string;
    type: string;
    required: boolean;
  }[];
  outputs: {
    name: string;
    type: string;
  }[];
};

export type PredictionInput = {
  [key: string]: string | boolean | number;
};

export type PredictionOutput = {
  [key: string]: string | boolean | number;
};

export const getModelSpaces = async (): Promise<ModelSpace[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/model-spaces`);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    throw new Error("Error retrieving model spaces");
  }
};

export const getModelSpace = async (id: string): Promise<ModelSpaceDetails> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/model-spaces/${id}`);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    throw new Error(`Error retrieving model space with ID: ${id}`);
  }
};

export const predictModelSpace = async (
  id: string,
  inputs: PredictionInput
): Promise<PredictionOutput> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/model-spaces/${id}/predict`,
      inputs
    );
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    throw new Error(`Error making prediction for model space with ID: ${id}`);
  }
};
