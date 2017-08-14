import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 0, name: 'First task', date: '10.08.2017' },
      { id: 1, name: 'Second task', date: '10.08.2017' },
      { id: 2, name: 'Third task', date: '11.08.2017' },
      { id: 3, name: 'Fourth task', date: '11.08.2017' },
      { id: 3, name: 'Fifth task', date: '11.08.2017' }
    ];
    return { tasks };
  }
}