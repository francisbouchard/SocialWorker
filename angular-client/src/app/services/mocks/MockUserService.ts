import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockUserService {
    testUser = {
        'tokens': [],
        'role': 'admin',
        '_id': '5a7b95c49a80678d70defa7e',
        'email': 'test2@test.com',
        'name': 'Test',
        'createdAt': '2018-02-08T00:11:48.759Z',
        'updatedAt': '2018-02-08T00:11:48.759Z',
        '__v': 0
      };

    getAll() {
        return Observable.of([
            {
              'tokens': [],
              'role': 'admin',
              '_id': '5a6ca05f54297a0c500cbd41',
              'name': 'James',
              'email': 'james@astteq.org',
              'createdAt': '2018-01-27T15:53:03.674Z',
              'updatedAt': '2018-01-27T15:53:03.674Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'admin',
              '_id': '5a6fc919a6db9d088cf0ea43',
              'email': 'gabrielle@astteq.org',
              'name': 'Gabrielle',
              'createdAt': '2018-01-30T01:23:37.878Z',
              'updatedAt': '2018-01-30T01:23:37.878Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'user',
              '_id': '5a6ff023a176b395fd54b228',
              'email': 'alyx@astteq.org',
              'name': 'Alyx',
              'createdAt': '2018-01-30T04:10:11.675Z',
              'updatedAt': '2018-01-30T04:10:11.675Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'admin',
              '_id': '5a75f5b77da64bb8cc645348',
              'email': 'liuai@liuai.com',
              'name': 'Liuai',
              'createdAt': '2018-02-03T17:47:35.075Z',
              'updatedAt': '2018-02-03T17:47:35.075Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'admin',
              '_id': '5a789409cc891a1c7cecaf6a',
              'name': 'Wahab',
              'email': 'wahabwajahat@hotmail.com',
              'createdAt': '2018-02-05T17:27:37.337Z',
              'updatedAt': '2018-02-05T17:27:37.337Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'admin',
              '_id': '5a7b95c49a80678d70defa7e',
              'email': 'test2@test.com',
              'name': 'Test',
              'createdAt': '2018-02-08T00:11:48.759Z',
              'updatedAt': '2018-02-08T00:11:48.759Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'user',
              '_id': '5a7f87c0e146e233d707518b',
              'email': 'test1@test.com',
              'name': 'Test',
              'createdAt': '2018-02-11T00:01:04.994Z',
              'updatedAt': '2018-02-11T00:01:04.994Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'user',
              '_id': '5a7f87db2970548423dfb007',
              'name': 'Cody',
              'email': 'cody@astteq.org',
              'createdAt': '2018-02-11T00:01:31.566Z',
              'updatedAt': '2018-02-11T00:01:31.566Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'user',
              '_id': '5a8346f67a1e5425d7742c47',
              'email': 'leah@astteq.org',
              'name': 'leah',
              'createdAt': '2018-02-13T20:13:42.843Z',
              'updatedAt': '2018-02-13T20:13:42.843Z',
              '__v': 0
            },
            {
              'tokens': [],
              'role': 'user',
              '_id': '5a8cdf57cd2f8c17e0b22cfd',
              'email': 'adrianna@astteq.org',
              'name': 'Adrianna',
              'createdAt': '2018-02-21T02:54:15.169Z',
              'updatedAt': '2018-02-21T02:54:15.169Z',
              '__v': 0
            }
          ]);
    }

    get(id) {
        return Observable.of(this.testUser);
    }

    getByParticipant(pid) {
        return Observable.of(this.testUser);
    }

}
