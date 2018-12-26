'use strict';
const Service = require('egg').Service;
const UUID = require('uuid');
const fs = require('fs');
const path = require('path');

let User = [];

class UserService extends Service {

  async createUser(user) {

    let id = UUID.v1();
    user['id'] = id;

    User.push(user);

    return {
      result: true,
    };
  }

  async queryUser(pageNo, pageSize) {

    let totalCount = User.length;

    let users = User.filter((el, index) => index > (pageNo - 1) * pageSize - 1 && index < pageNo * pageSize - 1);

    return {
      users,
      pageNo,
      pageSize,
      totalCount,
      hasNextPage: pageNo * pageSize < totalCount,
    };
  }

  async getUser(id) {
    let user = User.filter((el, index) => el.id === id);
    return user[0] || {};
  }


  async delUser(id) {
    let user = User.filter((el, index) => el.id !== id);

    User = user;

    return {
      result: true,
    };
  }

  async updateUser(id, email, phoneNumber) {
    let user = User.filter((el, index) => {
      if (el.id === id) {
        el.email = email || el.email;
        el.phoneNumber = phoneNumber || el.phoneNumber;
      }
      return el.id === id;
    });

    return user[0] || {};
  }

  async uploadImg(origin, id, stream) {
    const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/${stream.filename}`));

    stream.pipe(writerStream);

    let imgUrl = `${origin}/public/${stream.filename}`;

    let user = User.filter((el, index) => {
      if (el.id === id) {
        el['imageUrl'] = imgUrl;
      }
      return el.id === id;
    });

    return user[0] || {};
  }

  async getLeader(groupId) {
    let user = User.filter((el, index) => el.group === groupId && el.isLeader === true);
    return user[0] || {};
  }
}

module.exports = UserService;
