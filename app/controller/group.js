'use strict';

const Controller = require('egg').Controller;

/**
 * @controller group 组别接口
 */
class GroupController extends Controller {

  /**
   * @summary 新增小组
   * @description 新增小组，设置小组负责人
   * @router post /v1/groups
   * @request body createGroupRequest *body
   * @response 200 createGroupResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createGroupRequest);

    let req = ctx.request.body;

    ctx.body = await service.group.createGroup(req.groupName);

  }
  
  /**
   * @ignore
   */
  async nothing(){
    ctx.body= 'nothing';
  }

  /**
   * @summary 获取用户
   * @description 根据组别获取负责人信息
   * @router get /v1/gourps/{id}/leader
   * @request path integer *id
   * @response 200 getLeaderByGroupResponse 用户信息
   */
  async get() {
    const { ctx, service } = this;
    let id = Number(ctx.params.id);

    ctx.body = await service.group.getGroupLeader(id);
  }

}
module.exports = GroupController;
