export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiryTime: Date;
    userInfo: UserInfo;
  }
  
  export interface UserInfo {
    userName: string;
    email?: string;
    profileUrl?: string;
    tenantAccesses: TenantAccess[];
    deviceAccesses: DeviceAccess[];
  }
  
  export interface TenantAccess {
    tenantName: string;
    roleList: string[];
  }
  
  export interface DeviceAccess {
    deviceId: number;
    deviceName: string;
  }