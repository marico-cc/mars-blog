import path from 'path';
import fs from 'fs';
import { createDefineMock } from 'vite-plugin-mock-dev-server';

/**
 * vite-plugin-mock-dev-server api:
 * https://github.com/pengzhanbo/vite-plugin-mock-dev-server
 */

const routes = [
  {
    url: '/mock/test',
    body: 'mock/mockData/test.json'
  },
  {
    url: '/mock/test/1',
    body: { data: '12334' }
  }
];

const defineAPIMock = createDefineMock((mock) => {
  mock.url = path.join('', mock.url);
});

export default defineAPIMock(
  routes.map((v) => {
    return {
      url: v.url,
      response(req, res) {
        try {
          const fileName = typeof v.body === 'string' ? v.body : null;
          const data = fileName ? fs.readFileSync(v.body as string) : JSON.stringify(v.body);
          console.log({ url: req.url, body: req.body, res: fileName });
          res.end(data);
        } catch (error) {
          console.error({ url: req.url, body: req.body, error });
          res.end('Mock server error, please check mock configurations.');
        }
      }
    };
  })
);
