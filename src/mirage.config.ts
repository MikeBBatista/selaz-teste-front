import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { username: 'admin', password: 'admin123' } as object);
      server.create('user', { username: 'user', password: 'password' } as object);
    },

    routes() {
      this.urlPrefix = 'https://localhost:3000'
      this.namespace = 'api'

      this.post('/login', (schema, request) => {
        let { username, password } = JSON.parse(request.requestBody);
        let user = schema.db['users'].findBy({ username });

        if (user && user.password === password) {
          let token = 'secret-token';
          return {
            token,
            user: {
              id: user.id,
              username: user.username,
            }
          };
        } else {
          return { error: 'Usuário ou senha incorretos' };
        }
      });
    },
  });

  return server;
}
