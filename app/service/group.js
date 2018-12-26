'use strict';
const Service = require('egg').Service;

let Group = [];
let GroupId = 1;

class UserService extends Service {

  async createGroup(groupName) {

    let group = {
      id: GroupId++,
      groupName,
    };

    Group.push(group);

    return group;
  }

  async getGroupLeader(id) {
    let group = Group.filter((el, index) => el.id === id);
    let leader = await this.service.user.getLeader(id);

    return {
      groupName: group[0].id,
      leader,
    };
  }
}

module.exports = UserService;
