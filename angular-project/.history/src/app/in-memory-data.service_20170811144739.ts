import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 0, name: 'First task', description: 'First task description' },
      { id: 1, name: 'Second task', description: 'Second task description' },
      { id: 2, name: 'Third task', description: 'Third task description' },
      { id: 3, name: 'Fourth task', description: 'Fourth task description' },
      { id: 4, name: 'Fifth task', description: 'Fifth task description' }
    ];
    return { tasks };
  }
}