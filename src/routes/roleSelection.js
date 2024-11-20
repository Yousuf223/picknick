import React from 'react';
import { connect } from 'react-redux';
// @navigations
import AuthNavigation from './Auth/authNavigation';
import CoachNavigation from './coach/coachStack';
import UserNavigation from './user/userStack';

const RoleSelection = ({ role }) => {
  if (!role) {
    return <AuthNavigation initialRoute={undefined} />;
  }

  switch (role) {
    case 'User':
      return <UserNavigation initialRoute={undefined} />;
    case 'Vendor':
      return <CoachNavigation />;
    default:
      return <AuthNavigation initialRoute={undefined} />;
  }
};

const mapStateToProps = ({ authReducer: { role } }) => ({
  role,
});

export default connect(mapStateToProps)(RoleSelection);
