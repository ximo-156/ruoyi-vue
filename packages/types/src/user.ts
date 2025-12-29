import type { BasicUserInfo } from '@vben-core/typings';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 用户描述
   */
  desc: string;
  /**
   * 首页地址
   */
  homePath: string;

  /**
   * accessToken
   */
  token: string;
  /**  其他信息
   */
  user: UserProfile;
}
interface UserProfile {
  /**
   * 用户姓名
   */
  name: string;
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 用户简介
   */
  desc: string;
}
export type { UserInfo, UserProfile };
