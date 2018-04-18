import PropTypes from 'prop-types'

export function UserInfo(username, accessToken, refreshToken) {
  this.username = username;
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
}

export const UserInfoPropType = PropTypes.shape({
  username: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  refreshToken: PropTypes.string.isRequired
});
