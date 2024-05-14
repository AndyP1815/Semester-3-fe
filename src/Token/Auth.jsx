import TokenManager from '../Token/TokenManager';

const AuthUtils = {
  setUser: async () => {
    try {
      const claims = await TokenManager.getClaims();
      if (claims != null) {
        return claims;
      } else {
        console.log("Not Logged in");
        return null;
      }
    } catch (error) {
      console.error("Error fetching claims:", error);
      return null;
    }
  },
};

export default AuthUtils;