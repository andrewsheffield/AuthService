/* @flow */
import { description, author, license, version } from '../../package.json';

export default async function(request: Object, h: Object) {
  const uri: string = process.env.HOST || 'http://localhost:3000';

  return {
    description,
    author,
    license,
    version,
    documentation: uri + '/documentation'
  };
}
