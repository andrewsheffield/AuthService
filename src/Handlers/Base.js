/* @flow */
import { description, author, license, version } from '../../package.json';

type Request = {
  server: {
    info: {
      uri: string
    }
  }
};

export default async function(request: Request, h: Object) {
  console.log(process.env);
  return {
    description,
    author,
    license,
    version,
    documentation: request.server.info.uri + '/documentation'
  };
}
