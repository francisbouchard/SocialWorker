import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockResourceService {
    testResource = {
        'constraints': [],
        'kind': 'Housing',
        '_id': '5a6cac2bdf03f80ede3f5c3e',
        'name': 'Housing Facility 4 Name',
        'email': 'housing4@resource.com',
        'term': '5 weeks',
        'createdAt': '2018-01-27T16:43:26.756Z',
        'updatedAt': '2018-01-27T16:43:26.756Z',
        '__v': 0
      };

    getAll() {
        return Observable.of([
            {
              'constraints': [
                'No drinking'
              ],
              'kind': 'Housing',
              '_id': '5a5a56dcc2b50d7fa8d9373d',
              'name': 'Batshaw-Monkland',
              'email': 'b@m.com',
              'phone': '1234567890',
              'location': 'Testing',
              'notes': 'Wheelchair accessible ',
              'term': 'Short',
              'gender': 'Women',
              'createdAt': '2018-01-13T18:58:36.743Z',
              'updatedAt': '2018-01-24T19:14:36.275Z',
              '__v': 1
            },
            {
              'constraints': [
                'Can have children.'
              ],
              'kind': 'Housing',
              '_id': '5a5a6899d77cc82527c5dc48',
              'name': 'L\'abri d\'espoir',
              'email': null,
              'phone': ' (514) 934-5615',
              'location': '2000, rue Notre Dame O.',
              'notes': 'http://armeedusalut.ca/quebec/abri/',
              'term': 'Short, Long',
              'gender': 'Female',
              'createdAt': '2018-01-13T20:14:17.753Z',
              'updatedAt': '2018-01-13T20:14:17.753Z',
              '__v': 0
            },
            {
              'constraints': [
                'No pets 🐶'
              ],
              'kind': 'Housing',
              '_id': '5a5aa41d8d31db2a0377415a',
              'name': 'Auberge Shalom',
              'email': null,
              'phone': '(514) 731-0833',
              'location': 'Confidential',
              'notes': 'Allows children',
              'term': 'Short term',
              'gender': 'Female',
              'createdAt': '2018-01-14T00:28:13.498Z',
              'updatedAt': '2018-01-15T23:53:12.179Z',
              '__v': 1
            },
            {
              'constraints': null,
              'kind': 'Housing',
              '_id': '5a5d3f4d03af28260c70dc4e',
              'name': 'Auberge Transition',
              'email': null,
              'phone': ' (514) 481-0496',
              'location': 'Undisclosed',
              'notes': null,
              'term': 'Short term',
              'gender': 'Female',
              'createdAt': '2018-01-15T23:54:53.721Z',
              'updatedAt': '2018-01-15T23:54:53.721Z',
              '__v': 0
            },
            {
              'constraints': [
                'hbhb'
              ],
              'kind': 'Housing',
              '_id': '5a6bc3c295728f0be8064f78',
              'name': 'Example',
              'email': 'wahabwajahat@hotmail.com',
              'phone': '5146195888',
              'location': 'Montreal',
              'notes': 'bhsbshabhbshab',
              'term': 'hbhbhbhb',
              'gender': 'hbhbhb',
              'createdAt': '2018-01-27T00:11:46.134Z',
              'updatedAt': '2018-01-27T00:11:46.134Z',
              '__v': 0
            }
          ]);
    }

    get(id) {
        return Observable.of(this.testResource);
    }
}