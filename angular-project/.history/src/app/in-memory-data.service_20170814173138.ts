import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 0, name: 'First task', description: 'First task description', date: '12.08.2017' },
      { id: 1, name: 'Second task', description: 'Second task description', date: '12.08.2017' },
      { id: 2, name: 'Third task', description: 'Third task description', date: '13.08.2017' },
      { id: 3, name: 'Fourth task', description: 'Fourth task description', date: '14.08.2017' },
      { id: 4, name: 'Fifth task', description: 'Fifth task description', date: '14.08.2017' }
    ];
    return { tasks };
  }
}