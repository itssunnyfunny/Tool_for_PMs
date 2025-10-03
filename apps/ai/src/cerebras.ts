import Cerebras from '@cerebras/cerebras_cloud_sdk';
import dotenv from 'dotenv';

dotenv.config();

const cerebrasClient = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

export default cerebrasClient;