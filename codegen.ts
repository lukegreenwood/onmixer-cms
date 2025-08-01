import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        scalars: {
          DateTime: 'string',
          Date: 'string',
          DayOfWeek: 'string',
          JSON: 'any',
          Upload: 'File',
        },
        useTypeImports: true,
        strictScalars: false,
      },
    },
    './src/graphql/__generated__/introspection.json': {
      plugins: ['fragment-matcher'],
      config: {
        apolloClientVersion: 3,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
