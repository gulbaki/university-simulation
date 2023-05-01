import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri: process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.so5im.mongodb.net/test-case',
}));