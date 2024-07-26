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

      this.get('/All-users', (schema, request) => {
        let users = schema.db['users'];
        return users;
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
          return new Response(404, {}, { error: 'Usuário não encontrado' });
        }
      });

      this.delete('/users/:id', (schema, request) => {
        let id = request.params['id'];
        let user = schema.find('user', id);
        if (user) {
          user.destroy();
          return new Response(204, {}, {});
        } else {
          return new Response(404, {}, { error: 'Usuário não encontrado' });
        }
      });

      this.get('/tasks', (schema, request) => {
        const { page = 1, perPage = 10, status = '', sort = 'asc', responsible = '' } = request.queryParams;
        let statusList: string[] = [];
        let userList: string[] = [];

        if (status !== '') {
          statusList = (status as string)?.split(',');
        }
        if (responsible !== '') {
          userList = (responsible as string)?.split(',');
        }

        const pageNumber = parseInt(page as string, 10);
        const perPageNumber = parseInt(perPage as string, 10);
        const start = (pageNumber - 1) * perPageNumber;
        const end = start + perPageNumber;

        let tasks = schema.db['tasks'];
        let filteredTasks;
        
        if (statusList?.length && statusList.length > 0) {
          filteredTasks = tasks.where((task: { status: string; }) => statusList.includes(task.status))
          if (userList?.length && userList.length > 0) {
            filteredTasks = filteredTasks.filter((task: { responsible: string }) =>
              userList.includes(task.responsible)
            );
          }
          console.log(filteredTasks);
          const paginatedTasks = filteredTasks.slice(start, end).sort((a: any, b: any) => {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate); 
  
            if (sort === 'asc') {
              return dateA.getTime() - dateB.getTime();
            } else {
              return dateB.getTime() - dateA.getTime();
            }
          });
  
          return {
            tasks: paginatedTasks,
            total: filteredTasks.length,
          };
        } else {
          if (userList?.length && userList.length > 0) {
            tasks = tasks.where((task: { responsible: string; }) => userList.includes(task.responsible))
          }
          const paginatedTasks = tasks.slice(start, end).sort((a, b) => {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate); 
  
            if (sort === 'asc') {
              return dateA.getTime() - dateB.getTime();
            } else {
              return dateB.getTime() - dateA.getTime();
            }
          });
  
          return {
            tasks: paginatedTasks,
            total: tasks.length,
          };
        }
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

      this.post('/task', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.create('task', attrs);
      });

      this.put('/task/:id', (schema, request) => {
        let id = request.params['id'];
        let attrs = JSON.parse(request.requestBody);
        let task = schema.find('task', id);

        if (task) {
          task.update(attrs);
          return new Response(204, {}, {response: 'Tarefa alterada com sucesso!'});
        } else {
          return new Response(404, {}, { error: 'Tarefa não encontrada' });
        }
      });
    },
  });

  return server;
}
