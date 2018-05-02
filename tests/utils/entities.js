import * as userInfoEntities from '../../src/entities/UserInfo'

export function createUserInfoMock ()
{
    let userDataString = {
        id: 12345678,
        username: "correct_username",
        email: "correct_email",
        user_id: 123123,
        country: "DE",
        blocked: false,
        metadata: "correct_metadata",
        source_system: "correct_source_system",
        roles: "correct_roles"
    }
    let userData = new userInfoEntities.UserData(userDataString)
    let userInfoString = {
      access_token: "access_token_str",
      expires_in: 10000,
      refresh_token: "refresh_token_str",
      token_type: "token_type_str",
      user_data: userData
    }
    let userInfo = new userInfoEntities.UserInfo(userInfoString)	
	
	return userInfo
}