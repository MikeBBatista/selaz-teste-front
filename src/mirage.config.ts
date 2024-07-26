import { createServer, Response, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      task: Model,
    },

    seeds(server) {
      server.create('user', { username: 'admin', password: 'admin123', email: 'admin@hotmail.com', admin: true } as object);
      server.create('user', { username: 'user', password: 'password', email: 'user@hotmail.com', admin: false } as object);
      server.create('task', { 
        responsible: 'Mike Barcelos',
        createDate: new Date('2024-07-20'),
        status: 'pendente', 
        endDate: new Date('2024-07-24'), 
        title: 'Criar tela de login', 
        description: 'Criar tela de login utilizando Angular' } as object);
      server.create('task', { 
        responsible: 'Gabriel Dellu',
        createDate: new Date('2024-07-20'),
        status: 'pendente',  
        endDate: new Date('2024-07-29'),
        title: 'Criar prototipo de tela de Login para ontem', 
        description: 'Criar prototipo da tela de login no Figma' } as object);
        server.create('task', { 
          responsible: 'Gabriel Dellu',
          createDate: new Date('2024-07-20'),
          status: 'pendente',  
          endDate: new Date('2024-07-29'),
          title: 'Criar prototipo de tela de Login para ontem', 
          description: 'Criar prototipo da tela de login no Figma' } as object);
          server.create('task', { 
            responsible: 'Gabriel Dellu',
            createDate: new Date('2024-07-20'),
            status: 'pendente',  
            endDate: new Date('2024-07-30'),
            title: 'Criar prototipo de tela de Login para ontem', 
            description: 'Criar prototipo da tela de login no Figma' } as object);
            server.create('task', { 
              responsible: 'Gabriel Dellu',
              createDate: new Date('2024-07-20'),
              status: 'em andamento',  
              endDate: new Date('2024-07-28'),
              title: 'Criar prototipo de tela de Login para ontem', 
              description: 'Criar prototipo da tela de login no Figma' } as object);
              server.create('task', { 
                responsible: 'Gabriel Dellu',
                createDate: new Date('2024-07-20'),
                status: 'concluída',  
                endDate: new Date('2024-07-24'),
                title: 'Criar prototipo de tela de Login para ontem', 
                description: 'Criar prototipo da tela de login no Figma' } as object);
                server.create('task', { 
                  responsible: 'Mike Barcelos',
                  createDate: new Date('2024-07-20'),
                  status: 'pendente', 
                  endDate: new Date('2024-07-24'), 
                  title: 'Criar tela de login', 
                  description: 'Criar tela de login utilizando Angular' } as object);
                server.create('task', { 
                  responsible: 'Gabriel Dellu',
                  createDate: new Date('2024-07-20'),
                  status: 'pendente',  
                  endDate: new Date('2024-07-29'),
                  title: 'Criar prototipo de tela de Login para ontem', 
                  description: 'Criar prototipo da tela de login no Figma' } as object);
                  server.create('task', { 
                    responsible: 'Gabriel Dellu',
                    createDate: new Date('2024-07-20'),
                    status: 'pendente',  
                    endDate: new Date('2024-07-29'),
                    title: 'Criar prototipo de tela de Login para ontem', 
                    description: 'Criar prototipo da tela de login no Figma' } as object);
                    server.create('task', { 
                      responsible: 'Gabriel Dellu',
                      createDate: new Date('2024-07-20'),
                      status: 'pendente',  
                      endDate: new Date('2024-07-30'),
                      title: 'Criar prototipo de tela de Login para ontem', 
                      description: 'Criar prototipo da tela de login no Figma' } as object);
                      server.create('task', { 
                        responsible: 'Gabriel Dellu',
                        createDate: new Date('2024-07-20'),
                        status: 'em andamento',  
                        endDate: new Date('2024-07-28'),
                        title: 'Criar prototipo de tela de Login para ontem', 
                        description: 'Criar prototipo da tela de login no Figma' } as object);
                        server.create('task', { 
                          responsible: 'Gabriel Dellu',
                          createDate: new Date('2024-07-20'),
                          status: 'concluída',  
                          endDate: new Date('2024-07-24'),
                          title: 'Criar prototipo de tela de Login para ontem', 
                          description: 'Criar prototipo da tela de login no Figma' } as object);
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

      this.get('/users', (schema, request) => {
        const { page = 1, perPage = 10} = request.queryParams;
        const pageNumber = parseInt(page as string, 10);
        const perPageNumber = parseInt(perPage as string, 10);
        const start = (pageNumber - 1) * perPageNumber;
        const end = start + perPageNumber;

        let users = schema.db['users'];
        const paginatedUsers = users.slice(start, end);
        return {
          users: paginatedUsers,
          total: users.length,
        };
      });

      this.post('/users', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.create('user', attrs);
      });

      this.put('/users/:id', (schema, request) => {
        let id = request.params['id'];
        let attrs = JSON.parse(request.requestBody);
        let user = schema.find('user', id);

        if (user) {
          user.update(attrs);
          return new Response(204, {}, {response: 'Usuário alterado com sucesso!'});
        } else {
          return new Response(404, {}, { error: 'User not found' });
        }
      });

      this.delete('/users/:id', (schema, request) => {
        let id = request.params['id'];
        let user = schema.find('user', id);
        if (user) {
          user.destroy();
          return new Response(204, {}, {});
        } else {
          return new Response(404, {}, { error: 'Usuário não encontrada' });
        }
      });

      this.get('/tasks', (schema, request) => {
        const { page = 1, perPage = 10, status = '', sort = 'asc' } = request.queryParams;
        let statusList: string[] = [];
        if (status !== '') {
          statusList = (status as string)?.split(',');
        }
        const pageNumber = parseInt(page as string, 10);
        const perPageNumber = parseInt(perPage as string, 10);
        const start = (pageNumber - 1) * perPageNumber;
        const end = start + perPageNumber;

        let tasks = schema.db['tasks'];
        if (statusList?.length && statusList.length > 0) {
          tasks = schema.db['tasks'].where((task: { status: string; }) => statusList.includes(task.status))
        }
        const paginatedTasks = tasks.slice(start, end).sort((a, b) => {
          if (sort === 'asc') {
            return a.endDate.getTime() - b.endDate.getTime();
          } else {
            return b.endDate.getTime() - a.endDate.getTime();
          }
        });
        return {
          tasks: paginatedTasks,
          total: tasks.length,
        };
      });

      this.delete('/tasks/:id', (schema, request) => {
        let id = request.params['id'];
        let task = schema.find('task', id);
        if (task) {
          task.destroy();
          return new Response(204, {}, {});
        } else {
          return new Response(404, {}, { error: 'Tarefa não encontrada' });
        }
      });
    },
  });

  return server;
}
