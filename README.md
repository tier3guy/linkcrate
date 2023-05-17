# LinkCrate - Web Application

## Description

LinkCrate is a web application built with React that allows users to collect and organize their various links in one central location. It provides a simple and intuitive way for individuals and businesses to create a personalized page with their preferred links, making it easy to share with others.

## Features

-   **Link Collection**: Users can add and manage an unlimited number of links to their LinkCrate page.
-   **Customization**: Users can customize the appearance of their LinkCrate page by choosing from a variety of themes and templates.
-   **Social Media Integration**: LinkCrate enables users to add links to their social media profiles, including Facebook, Twitter, Instagram, LinkedIn, and more.
-   **Analytics**: Users can view basic analytics to track the performance and engagement of their shared links.
-   **Sharing Options**: LinkCrate provides users with multiple sharing options, including sharing their LinkCrate page URL directly or embedding it on their website or blog.
-   **Responsive Design**: The web application is fully responsive, ensuring an optimal viewing experience across different devices and screen sizes.

## Technologies Used

-   **Frontend**: React
-   **Backend**: Firebase (Firestore for the database)
-   **Authentication**: Firebase Authentication
-   **Deployment**: Vercel

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/tier3guy/linkcrate.git
    ```

2. Navigate to the project directory:

    ```
    cd linkcrate
    ```

3. Install the dependencies:

    ```
    npm install
    ```

4. Create a Firebase project and set up Firestore for the database. Obtain the necessary Firebase configuration details.
5. Create a `.env` file in the root directory and provide the Firebase configuration variables:

    ```
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

6. Start the application:

    ```
    npm start
    ```

## Deployment

LinkCrate can be deployed to Vercel or any other hosting platform that supports React applications. Follow the deployment instructions specific to Vercel or your chosen hosting platform.

Ensure that you set the Firebase configuration variables as environment variables in your deployment environment.

## Usage

1. Open your web browser and navigate to the deployed URL of your LinkCrate application.
2. Sign up for a new account or log in if you already have one.
3. Once logged in, you will be redirected to your LinkCrate dashboard.
4. Customize your LinkCrate page by adding links and selecting a theme/template.
5. Share your LinkCrate page URL with others or embed it on your website/blog.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please submit an issue or a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions, feel free to reach out to the project maintainer at [avinashgupta.works@gmail.com](mailto:avinashgupta.works@gmail.com).
