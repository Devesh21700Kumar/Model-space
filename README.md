# Model Space 

# Model Space Explorer

Model Space Explorer is a web application that allows users to explore and interact with different model spaces. It provides a user-friendly interface for inputting parameters and generating predictions based on the selected model space.

## Features

- **Model Space Selection**: Users can choose from a variety of model spaces to explore and experiment with.
- **Input Parameters**: Each model space has its own set of input parameters that users can adjust to generate different predictions.
- **Real-time Predictions**: As users modify the input parameters, the application generates predictions in real-time, providing instant feedback.
- **Responsive Design**: The application is designed to be responsive and works seamlessly across different devices and screen sizes.

![image](https://github.com/Devesh21700Kumar/Model-space/assets/59202075/53a9580b-2c03-4c54-bf55-c9607275a0a1)


## UI/UX Features

### Home Page

- **Model Space Carousel**: The home page features a carousel that showcases different model spaces. Users can swipe through the carousel to explore and select a model space of their interest.

![image](https://github.com/Devesh21700Kumar/Model-space/assets/59202075/c1b08607-6ae8-4d28-8704-b80bbb31d41d)

- **Model Space Cards**: Each model space is represented by a card that displays its name, description, and an attractive image. Clicking on a card opens a modal with more details about the model space.

![image](https://github.com/Devesh21700Kumar/Model-space/assets/59202075/b58dbe66-1e7b-4fab-865c-b416f46e06e5)


- **Modal**: When a user clicks on a model space card, a modal appears with additional information about the selected model space. The modal includes a larger image, a detailed description, and a "View Details" button that navigates to the model space page.

### Model Space Page

- **Input Section**: The model space page is divided into two main sections: the input section and the output section. The input section allows users to enter values for various parameters specific to the selected model space.
  - **Text Input**: Users can enter text values for relevant parameters.
  - **Boolean Input**: Boolean parameters are represented by radio buttons, allowing users to select either "True" or "False".
  - **Number Input**: Number parameters are displayed as sliders, enabling users to adjust the value within a specified range. The current value is displayed next to the slider.
  - **Select Input**: Select parameters provide a dropdown menu with predefined options for users to choose from.
  - **Textarea Input**: Textarea parameters allow users to enter multiline text values.
  - **Audio Input**: Users can upload audio files for audio-related parameters.
  - **Image Input**: Users can upload image files for image-related parameters.
- **Output Section**: The output section displays the generated predictions based on the user's input parameters. It is updated in real-time as the user modifies the input values.
  - **Text Output**: Text-based predictions are displayed as plain text.
  - **Number Output**: Numerical predictions are displayed as formatted numbers.
  - **Boolean Output**: Boolean predictions are displayed as either "True" or "False".
  - **Audio Output**: Audio predictions are displayed as playable audio files.
  - **Image Output**: Image predictions are displayed as rendered images.

![image](https://github.com/Devesh21700Kumar/Model-space/assets/59202075/a6ce800f-1a9c-4ea9-a877-08b9c0270775)

![image](https://github.com/Devesh21700Kumar/Model-space/assets/59202075/e74d9b17-6c29-4626-abd5-2dcee2aa9b44)


## Technologies Used

- **Next.js**: The application is built using Next.js, a React framework for server-side rendering and building fast web applications.
- **React**: React is used for building the user interface components and managing the application state.
- **TypeScript**: TypeScript is used to add static typing and improve code quality and maintainability.
- **Chakra UI**: Chakra UI is utilized for building responsive and accessible UI components, providing a consistent and visually appealing design system.
- **Axios**: Axios is used for making API requests to fetch model space data and generate predictions.

## Getting Started

To run the Model Space Explorer application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/model-space-explorer.git`
2. Install the dependencies: `npm install`
3. Configure the API endpoints in the `.env` file.
4. Start the development server: `npm run dev`
5. Open your browser and visit `http://localhost:3000` to access the application.
