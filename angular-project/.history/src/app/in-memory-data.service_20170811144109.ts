import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 0, name: 'First task', description: 'description' },
      { id: 1, name: 'Second task', description: 'description' },
      { id: 2, name: 'Third task', description: 'description' },
      { id: 3, name: 'Fourth task', description: 'description' },
      { id: 3, name: 'Fifth task', description: 'description' }
    ];
    return { tasks };
  }
}