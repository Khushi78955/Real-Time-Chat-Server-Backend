import * as authService from "../services/auth.service.js";

export async function register(req, res) {
    const user = await authService.register(req.body);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user
    })
}



export async function login(req, res){
    const {user, accessToken, refreshToken} = await authService.login(req.body);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,          
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user,
            accessToken,
        },
    });
}



export async function refresh(req, res){
    const refreshToken = req.cookies.refreshToken;
    const tokens = await authService.refresh(refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false,          
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
            accessToken: tokens.accessToken,
        },
    });
}


export async function logout(req, res){
    const refreshToken = req.cookies.refreshToken;
    await authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}


export async function me(req, res){
    const user = await authService.getCurrentUser(req.user.id);
    res.status(200).json({
        success: true,
        data: user,
    });
}