import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 0, name: 'First task' },
      { id: 1, name: 'Second task' },
      { id: 2, name: 'Third task' },
      { id: 3, name: 'Fourth task' },
      { id: 3, name: 'Fifth task' }
    ];
    return { tasks };
  }
}