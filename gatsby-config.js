/**
 * @type {import('gatsby').GatsbyConfig}
 */
const yaml = require('js-yaml');
const fs = require('fs');
const stage = process.env.STAGE ? process.env.STAGE : 'dev'
// Load environment variables from YAML file
const yamlConfig = yaml.load(
  fs.readFileSync(`./.polymer/.config/${stage}.env.yml`, 'utf-8')
);

const gatsbyConfig = yaml.load(
  fs.readFileSync(`.polymer/.gatsbyconfig/${process.env.NODE_ENV}.env.yml`, 'utf-8')
);

var target_bucket = null;
let application_name;

function configureEnv(config) {
  Object.entries(config).forEach(([key, value]) => {
    if (key === 'application_name') {
      application_name = value
      process.env.GATSBY_APPLICATION_NAME = value
    } else if (key === 'deployment') {
      target_bucket = value.target_bucket
    } else {
      process.env[key] = value;
    }
  });
}

if (yamlConfig) {
  configureEnv(yamlConfig)
} else {
  throw new Error(`No configuration file specified. Expected configuration file in location .polymer/.config/${stage}.env.yml`);
}

if (gatsbyConfig) {
  configureEnv(gatsbyConfig)
}

const configuration = {
  siteMetadata: {
    title: `${application_name}`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
  ]
}

if (target_bucket) {
  configuration.plugins.push({
    resolve: `gatsby-plugin-s3`,
    options: {
      bucketName: target_bucket,
      acl: null
    },
  })
}

module.exports = configuration