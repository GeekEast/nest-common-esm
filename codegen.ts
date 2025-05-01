import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://spacex-production.up.railway.app/',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: true,
        withHooks: false,
      },
    },
  },
};

export default config;
