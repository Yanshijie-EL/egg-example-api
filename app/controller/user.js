'use strict';

const Controller = require('egg').Controller;

/**
 * @controller user 用户接口
 */
class UserController extends Controller {

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /v1/users
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest);

    let user = ctx.request.body;

    ctx.body = await service.user.createUser(user);

  }

  /**
   * @summary 获取用户
   * @description 分页获取用户信息
   * @router get /v1/users
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 20
   * @response 200 queryUserResponse successed
   */
  async query() {
    const { ctx, service } = this;

    let pageNo = Number(ctx.query.pageNo || 1);
    let pageSize = Number(ctx.query.pageSize || 20);

    ctx.body = await service.user.queryUser(pageNo, pageSize);
  }

  /**
   * @summary 获取用户
   * @description 获取用户信息
   * @router get /v1/users/{id}
   * @request path string *id
   * @response 200 getUserResponse 用户信息
   */
  async get() {
    const { ctx, service } = this;
    let id = ctx.params.id;

    ctx.body = await service.user.getUser(id);
  }

  /**
   * @summary 删除用户
   * @description 删除用户信息
   * @router delete /v1/users/{id}
   * @request path string *id
   * @response 200 baseResponse 删除成功
   */
  async delete() {
    const { ctx, service } = this;

    let id = ctx.params.id;

    ctx.body = await service.user.delUser(id);
  }

  /**
   * @summary 更新用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router put /v1/users/{id}
   * @request path string *id
   * @request body updateUserRequest *body
   * @response 200 user 更新成功
   */
  async update() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    // 校验参数
    ctx.validate(ctx.rule.updateUserRequest);
    let req = ctx.request.body;

    ctx.body = await service.user.updateUser(id, req.email, req.phoneNumber);
  }

  /**
   * @summary 上传图片
   * @description 上传图片
   * @router post /v1/upload
   * @request formData string id 用户ID
   * @request formData file *file
   * @response 200 uploadResponse 更新成功
   */
  async upload() {
    const { ctx, service } = this;

    const stream = await ctx.getFileStream();
    const id = stream.fields.id;
    const origin = ctx.origin;

    ctx.body = await service.user.uploadImg(origin, id, stream);
  }
}
module.exports = UserController;
