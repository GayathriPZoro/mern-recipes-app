# My Recipes Application with MERN stack

## Description
This is a sample Recipes application which uses MongoDB, Express, React JS with Material UI and NodeJS.
With this application users can do the following features
1. User Registration
2. User Login
3. All Recipes(Home page)
4. Create Recipe 
5. Favorite Recipes
6. Search Recipes
7. Logout

## Setup
Clone the repository and install the dependencies with 'yarn install' | 'npm install'

## ENV Configuration
Create .env/.env.local file in project root directory and set the following variables
> 1. MONGODB_URI= 
> 2. PRIVATE_SECRET_KEY= 
> 3. GOOGLE_CLIENT_ID= 
> 4. GOOGLE_CLIENT_SECRET= 
> 5. NEXTAUTH_SECRET= 
> 6. NEXT_SERVER_BASE_URL= 
> 7. ELASTIC_SEARCH_APP_API_KEY= 
> 8. ELASTIC_HOST_NAME= 
> 9. ELASTIC_ENGINE_NAME=
> 9. ABSTRACT_EMAIL_API_KEY=

## Run

Run the client with package script in client folder: dev in package.json

Server is also run on reachable at port 3000 in localhost (http://localhost:3000/api/<<API_ENDPOINT>>). If you used dev, you should use localhost:3000 for hot rerload.

## Build

Build client with the package script "build" in package.json file

# Application Public Url 
[https://nextjs-mern-recipes-app.vercel.app/]

### Other

To login you can user the following credentials or Google Sign In

> username: Test,
> password: test123
