## Getting Started

### Installation

1. Install the AWS SAM CLI by following the [official installation instructions](https://aws.amazon.com/serverless/sam/).
2. Install dependencies by navigating to the `crawler` project directory (where `package.json` is located) and running:

   ```bash
   npm install
   ```

### Enviromental variables

Environmental variables for each environment are defined in the samconfig.toml file.

### Building the Application

Build the application with:

```bash
sam build
```

### Deployment

To deploy the application to production, use the following command:

```bash
sam deploy --config-env prod
```
To deploy the application to QA, use the following command:

```bash
sam deploy --config-env qa
```
To deploy the application to the sandbox environment, use the following command:

```bash
sam deploy --config-env test
```