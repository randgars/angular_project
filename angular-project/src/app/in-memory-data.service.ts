import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as moment from 'moment';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 0, name: 'First task', description: 'First task description', date: '12.08.2017', state: 'active' },
      { id: 1, name: 'Second task', description: 'Second task description', date: '12.08.2017', state: 'active' },
      { id: 2, name: 'Third task', description: 'Third task description', date: '13.08.2017', state: 'active' },
      { id: 3, name: 'Fourth task', description: 'Fourth task description', date: moment().format('DD.MM.YYYY'), state: 'active' },
      { id: 4, name: 'Fifth task', description: 'Fifth task description', date: moment().format('DD.MM.YYYY'), state: 'active' }
    ];
    return { tasks };
  }
}