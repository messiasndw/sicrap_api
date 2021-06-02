let _data;

const UserStore = {
  add: item => _data = item,
  get: () => {return _data}
}

Object.freeze(UserStore);
export default UserStore