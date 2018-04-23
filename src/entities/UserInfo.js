import PropTypes from 'prop-types'

export function UserInfo(json) {
  this.access_token = json.access_token;
  this.expires_in = json.expires_in;
  this.refresh_token = json.refresh_token;
  this.token_type = json.token_type;
  this.user_data = new UserData(json.user_data);
  if (json.received_at !== undefined && json.received_at !== null && json.received_at.length !== 0) {
    this.received_at = json.received_at;
  } else {
    this.received_at = Date.now();
  }
}

export const UserInfoPropType = PropTypes.shape({
  access_token: PropTypes.string.isRequired,
  expires_in: PropTypes.number.isRequired,
  refresh_token: PropTypes.string.isRequired,
  token_type: PropTypes.string,
  user_data: PropTypes.objectOf(UserData).isRequired,
  received_at: PropTypes.number.isRequired
});

export function UserData(json) {
  this.id = json.id;
  this.username = json.username;
  this.email = json.email;
  this.user_id = json.user_id;
  this.country = json.country;
  this.blocked = json.blocked;
  this.metadata = json.metadata;
  this.source_system = json.source_system;
  this.roles = json.roles;
  return this;
}

export const UserDataPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  country: PropTypes.string,
  blocked: PropTypes.bool,
  metadata: PropTypes.object,
  source_system: PropTypes.string,
  roles: PropTypes.array
});
