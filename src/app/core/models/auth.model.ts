<<<<<<< HEAD

// ====================================
// Models (based on your backend)
// ====================================
export interface TenantDto {
  userName: string;
  profileUrl: string;
  thumbnailUrl: string;
  deviceAccesses: DeviceAccess[];
  tenantAccesses: TenantAccess[];
}

export interface TenantAccess {
  tenantName: string | null;
  roleList: string[];
}

export interface DeviceAccess {
  deviceId: number;
  deviceName: string;
}

export interface TokenDto {
  userInfo: TenantDto;
  token: string;
  refreshToken: string;
  expiryTime: Date;
}
=======
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
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
