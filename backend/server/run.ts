import * as config from 'config';
import { Server } from './server';
const server = new Server();

const bucketsDbUrl = config.get('buckets.db.url');
const connectOptions = config.get('buckets.db.options');

server.connect(bucketsDbUrl, connectOptions);
server.run();