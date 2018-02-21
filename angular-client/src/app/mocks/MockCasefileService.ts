import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockCasefileService {
    testCasefile = [{
      '_id' : '5a6df920087c7d3fc9dddfe9',
      'contactedResources' : [
          {
              '_id' : '5a8466e2ae933b1fe1714eea',
              'dateContacted' : '2018-02-14T22:57:22.651Z',
              'note' : 'Does not take pets',
              'resource' : {
                'constraints': [],
                'deleted' : false,
                'kind': 'Housing',
                '_id': '5a6cac2bdf03f80ede3f5c3e',
                'name': 'Housing Facility 4 Name',
                'email': 'housing4@resource.com',
                'term': '5 weeks',
                'createdAt': '2018-01-27T16:43:26.756Z',
                'updatedAt': '2018-01-27T16:43:26.756Z',
                '__v': 0
              },
              'status' : 'To contact'
          }
      ],
      'createdAt' : '2018-01-28T16:24:00.297Z',
      'notes' : [
          'Needs urgent housing'
      ],
      'date' : '2018-01-28T16:24:00.286Z',
      'deleted' : false,
      'participant' : 'frontendtest',
      'selectedResource' : null,
      'status' : 'In progress',
      'type' : 'Housing',
      'updatedAt' : '2018-01-28T16:24:00.297Z',
      'urgency' : 'Urgent',
      '__v' : 0
  }];

    getAll() {
        return Observable.of([
          {
            '_id' : '5a5ad8aaa87da4076691d0ce',
            'contactedResources' : [],
            'notes' : [
                'No note'
            ],
            'date' : '2018-01-14T04:12:26.423Z',
            'participant' : 'frontendtest',
            'status' : 'Completed',
            'createdAt' : '2018-01-14T04:12:26.435Z',
            'updatedAt' : '2018-01-14T04:12:26.435Z',
            '__v' : 0
        },
        {
          '_id' : '5a6d0c3587753f20fae48204',
          'contactedResources' : [
              {
                  '_id' : '5a5a6899d77cc82527c5dc48',
                  'status' : ''
              },
              {
                  '_id' : '5a5aa41d8d31db2a0377415a',
                  'status' : ''
              },
              {
                  '_id' : '5a5d3f4d03af28260c70dc4e',
                  'status' : ''
              }
          ],
          'notes' : [
              'test'
          ],
          'date' : '2018-01-27T23:33:09.530Z',
          'participant' : 'frontendtest',
          'status' : 'In progress',
          'urgency' : 'Urgent',
          'createdAt' : '2018-01-27T23:33:09.538Z',
          'updatedAt' : '2018-01-27T23:33:09.538Z',
          '__v' : 0
      },
      {
        '_id' : '5a6df920087c7d3fc9dddfe9',
        'contactedResources' : [
            {
                '_id' : '5a5a56dcc2b50d7fa8d9373d',
                'status' : ''
            },
            {
                '_id' : '5a5a6899d77cc82527c5dc48',
                'status' : ''
            },
            {
                '_id' : '5a5aa41d8d31db2a0377415a',
                'status' : ''
            },
            {
                '_id' : '5a5d3f4d03af28260c70dc4e',
                'status' : ''
            },
            {
                '_id' : '5a6bc3c295728f0be8064f78',
                'status' : ''
            }
        ],
        'notes' : [
            'Broke something'
        ],
        'date' : '2018-01-28T16:24:00.286Z',
        'participant' : 'frontendtest',
        'status' : 'In progress',
        'urgency' : 'Urgent',
        'createdAt' : '2018-01-28T16:24:00.297Z',
        'updatedAt' : '2018-01-28T16:24:00.297Z',
        '__v' : 0
    }
        ]);
    }

    get(id) {
        return Observable.of(this.testCasefile);
    }

    getByParticipant(pid) {
        return Observable.of(this.testCasefile);
    }

    delete(casefileID) {

        this.testCasefile = [];

        return Observable.of({
            'n': 1,
            'nModified': 1,
            'opTime': {
              'ts': '6515861190743162881',
              't': 5
            },
            'electionId': '7fffffff0000000000000005',
            'ok': 1
          });
    }

}
