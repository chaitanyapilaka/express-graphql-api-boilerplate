# Express Graphql API Boilerplate

This is boilerplate code used to setup and express server with Apollo Graphql. It is inspired from bulletproof node project. It is setup to work with GCP

## Requirements 
* NodeJS v16.14.0
* Docker
* yarn
* homebrew
* gcloud


## Installation

Install NodeJS using NVM(Node Version Manager to download the correct version of node)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 16.14.0
nvm alias default 16.14.0
nvm use default
```

Install yarn package manager 

```bash
npm install --global yarn
```

## Usage

The application requires 2 environment files in the root folder to run
* .env.development
* .env.production

### .env template
```bash
NODE_ENV=development (production/development)
PORT=3000
PROJECT_NAME=Test
PROJECT_ID=test-project
PROJECT_ROOT_DOMAIN=test-project.com
API_URL=http://localhost:3000
DASHBOARD_URL=MONGO_DB_URI
JWT_ACCESS_TOKEN_SECRET=p%oYiR065^1jn%ww
ACCESS_TOKEN_COOKIE_KEY=test-project-access-token
SESSION_LENGTH_IN_DAYS=30
GCS_PUBLIC_BUCKET=test-project-assets
GCP_PROJECT_ID=test-project-production
GCS_PRIVATE_BUCKET=test-project-assets-private
GOOGLE_APPLICATION_CREDENTIALS=./keys/service-account.json
STYTCH_SECRET_KEY=secret-test (Passwordless auth)
STYTCH_PROJECT_ID=project-test (Passwordless auth)
SUPER_ADMIN_API_KEY=afsdfoi23je2 (Used for local testing of the api routes/services)
```

To run the application
```bash
yarn install 
yarn dev
```

## Gcloud Setup (Optional)

Install gcloud tools : https://formulae.brew.sh/cask/google-cloud-sdk

```bash
brew install --cask google-cloud-sdk
```

This project is setup to run with various GCP Services. The following are required:
* Public GCS bucket
* Private GCS bucket
* Google Artifact Registry for storing Docker images of the application
* Google Cloud Run to deploy it the application
* Service Account JSON for local development 

### Gcloud CLI  commonly used commands
```bash
gcloud auth login
gcloud auth activate-service-account SERVICE_ACCOUNT@DOMAIN.COM --key-file=/path/key.json --project=PROJECT_ID
gcloud auth list
gcloud config set account `ACCOUNT`
gcloud projects list
gcloud config get-value project
gcloud config set project MY_PROJECT
```


### Enable CORS for Public/Private bucket
To enable the upload of files via signed URLs to GCS from devices, we will need to setup CORS policies for the buckets 


```bash
gsutil cors set CORS_CONFIG_FILE gs://BUCKET_NAME
```

### Service Account JSON
The developer will need to put the provisioned Service Account JSON file in the `keys` folder in the root of the project. The filename needs to be added to the `.env.*` files to interact with GCP locally.
```bash
GOOGLE_APPLICATION_CREDENTIALS=./keys/service-account.json
```

### Enable pushing/pulling images to Google Artifact registry via Docker

Follow instructions here: https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling

TLDR;

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```


## License
[MIT](https://choosealicense.com/licenses/mit/)