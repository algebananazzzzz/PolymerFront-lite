/**
 * @type {import('gatsby').GatsbyConfig}
 */
const yaml = require('js-yaml');
const fs = require('fs');
const stage = process.env.STAGE ? process.env.STAGE : 'dev'

// Load environment variables from YAML files
const yamlConfig = yaml.load(
  fs.readFileSync(`./.polymer/.config/${stage}.env.yml`, 'utf-8')
);

var target_bucket = null;

function configureEnv(config) {
  Object.entries(config).forEach(([key, value]) => {
    if (key === 'deployment') {
      target_bucket = value.target_bucket
    } else {
      process.env[key] = value;
    }
  });
}

if (yamlConfig) {
  configureEnv(yamlConfig)
} else if (process.env.NODE_ENV === "development") {
  const gatsbyConfig = yaml.load(
    fs.readFileSync(`.polymer/.gatsbyconfig/${process.env.NODE_ENV}.env.yml`, 'utf-8')
  );
  if (gatsbyConfig) {
    configureEnv(gatsbyConfig)
  } else {
    throw new Error(`No configuration file specified for development. Expected configuration file in location .polymer/.gatsbyconfig/development.env.yml`);
  }
} else {
  throw new Error(`No configuration file specified. Expected configuration file in location .polymer/.config/${stage}.env.yml`);
}

const configuration = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: "src/static/icon.png",
      },
    },
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