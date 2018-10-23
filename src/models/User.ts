import { action, observable } from 'mobx';

class UserModel {
  @observable
  name: string = 'linyupark';

  @observable
  age: number = 10;

  @action
  increaseAge() {
    this.age++;
  }
}

export default new UserModel();