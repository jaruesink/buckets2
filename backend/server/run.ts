import * as config from 'config';
import Server from './server';

const bucketsDbUrl = config.get('buckets.db.url');
const connectOptions = config.get('buckets.db.options');

Server.connect(bucketsDbUrl, connectOptions);
Server.run();