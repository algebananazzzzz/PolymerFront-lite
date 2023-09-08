# PolymerFront-lite

PolymerFront-lite is a Framework dedicated to empower FrontEnd development with React using GatsbyJS. It simplifies the provisioning of frontend Serverless AWS resources using Terraform with CI/CD pipelines. This lite version of PolymerFront is designed for simple static site development, excluding the Amplify and Apollo-Client integration found in the full framework.


## Table of Contents

- [About](#about)
- [Configuration](#configuration)
- [Integrations](#integrations)
- [Resources](#resources)
- [Installation](#installation)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

## About

PolymerFront-lite is a member of the Polymer framework family, designed to empower developers in building sophisticated applications. This framework utilizes Terraform for provisioning Serverless resources within the AWS Cloud Infrastructure, while also facilitating the establishment of streamlined CI/CD pipelines through GitHub Actions. For more information about the Polymer framework, please visit the [PolymerBase repository](https://github.com/algebananazzzzz/PolymerBase).


PolymerFront aims to empower frontend development with React. This framework enables developers to bundle React application with GatsbyJS, push content to S3 and subsequently deliver content to consumers via CloudFront. The process is optimized through streamlined CI/CD pipelines, ensuring efficient and reliable deployment.

## Configuration

Please refer to the example configuration file for additional information:
[Example Configuration File](.polymer/.config/example.{stage}.env.yml)


Configuration within PolymerFront-lite consists of Resource Configuration: the setup and customization of the resources that PolymerFront deploys, i.e. CloudFront and S3.

Configuration is stored in YAML files, specific to CI/CD staging environments. General configuration files are located in .polymer/.config and should follow the format {stage}.env.yml (e.g., dev.env.yml for development).

Gatsby configuration files are found in .polymer/.gatsbyconfig folder, used to configure environment variables during bundling (gatsby build) or local development (gatsby develop). It should follow the format {stage}.env.yml (e.g., development.env.yml for development). An example usage: GATSBY_APOLLO_URI = http://localhost:4000

## Integrations

1. PolymerFront utilises the **GatsbyJS framework** to bundle **React** applications into static files for production. Learn more about [GatsbyJS](https://www.gatsbyjs.com). 

2. PolymerFront also integrates with both [TailWindCSS](https://tailwindcss.com) and [Preline](https://preline.co), enhancing your styling capabilities. To add your custom styles, navigate to `src/styles/global.css`.

3. Under gatsby-browser.js, the application is bundled with a dark mode context. This integration enables the application to seamlessly switch between dark and light modes, utilising the ThemeToggler component located at src/components/theme/dark-toggler.js.


## Resources

Here are the resources that PolymerFront will deploy, along with instructions on how to configure them:

1. **S3 Source Bucket** to store Frontend Site Content

Under deployment, you can choose the name for S3 bucket to be provisioned
```yaml
deployment:
  target_bucket: polymer-bucket
```

2. **Cloudfront Distribution** to serve content. This content delivery network (CDN) distributes content to edge locations worldwide, optimizing load times and user experiences.

Under deployment, you can choose the [price class](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html) and domain configuration for Cloudfront
```yaml
deployment:
  cloudfront:
    price_class: PriceClass_200 # PriceClass_All , PriceClass_200, PriceClass_100
  domain: # optional
    zone_id: Z123456789123D
    aliases:
      - polymerism.polymer.com
    viewer_certificate: arn:aws:acm:us-east-1:123456789
```

## Installation

1. Create a new Gatsby Application with the PolymerFront-lite Framework
```shell
gatsby new your_application_name https://github.com/algebananazzzzz/PolymerFront-lite
```

For instructions on installing Gatsby Client, [read more](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/)
```shell
npm install -g gatsby-cli
```


2. Develop your React application
```shell
cd your_application_name/
gatsby develop
```

## Deployment

1. **Build Production Sites**
Execute the following command to build production-ready sites using Gatsby:
```shell
gatsby build
```

2. **Create a GitHub Repository:**
Start by creating a GitHub repository. After that, follow these steps to initialize Git and switch to the `dev` branch:
```
git init
git add -A
git commit
git checkout -b dev
git remote set-url origin https://github.com/{your_repository_name}.git
```

3. **Configure Secrets and Variables:**

For secure and streamline access to AWS and Terraform Cloud, follow these steps to configure secrets and variables within your GitHub repository:

- Click on the `Settings` tab within your repository.
- Navigate to `Secrets` (or `Environments` > `Secrets` depending on your GitHub version).
- Click on `New repository secret` to add secrets or `New repository variable` to add variables.

**Required Secrets:**

1. `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
2. `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
3. `TF_API_TOKEN`: Obtain this token by going to your [Terraform Cloud tokens page](https://app.terraform.io/app/settings/tokens).

**Required Variables:**

1. `APPLICATION_NAME`: Set your application's name.
2. `AWS_REGION`: Define the AWS region you're working with.
3. `TF_ORGANISATION`: If not already created, create a Terraform Cloud organization for use.

4. **Push to GitHub**
```shell
git push --set-upstream origin dev
```

With GitHub Actions in place, this push will automatically trigger Terraform Cloud to provision the necessary resources.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
[Provide a way for users to contact you, whether it's an email address, a link to your website, or social media profiles.]


## Contact

For inquiries and further information, feel free to reach out to me through my [portfolio page](https://www.algebananazzzzz.com).
