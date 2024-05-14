import { jwtDecode } from "jwt-decode";

const TokenManager = {
    getAccessToken: () => sessionStorage.getItem("accessToken"),
    getRefreshToken: () => sessionStorage.getItem("refreshToken"),
    getClaims: () => {
        if (!sessionStorage.getItem("claims")) {
            return null;
        }
        return JSON.parse(sessionStorage.getItem("claims"));
    },
    setTokens: (accessToken, refreshToken) => {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        const claims = jwtDecode(accessToken);
        sessionStorage.setItem("claims", JSON.stringify(claims));
        return claims;
    },
    clear: () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("claims");
    }
}

export default TokenManager;
