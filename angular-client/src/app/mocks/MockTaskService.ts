import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockTaskService {

    getByUser() {
        return Observable.of([
        {
            '_id' : '5aaed8e0b707b21a78994020',
            'description' : 'add',
            'user' : '5a7b95c49a80678d70defa7e',
            'createdAt' : '2018-03-18T21:23:44.151Z',
            'updatedAt' : '2018-03-18T21:23:44.151Z',
            '__v' : 0
        },
        {
            '_id' : '5aaedf3cff960ddae23ee040',
            'description' : 'Get hair did',
            'user' : '5a6ca05f54297a0c500cbd41',
            'createdAt' : '2018-03-18T21:50:52.781Z',
            'updatedAt' : '2018-03-18T21:50:52.781Z',
            '__v' : 0
        },
        {
            '_id' : '5aaee16aff960ddae23ee041',
            'description' : 'something todo',
            'user' : '5a6ca05f54297a0c500cbd41',
            'createdAt' : '2018-03-18T22:00:10.782Z',
            'updatedAt' : '2018-03-18T22:00:10.782Z',
            '__v' : 0
        }]);
    }

}
