// backend/utils/SendShopToken.js
const SendShopToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'PRODUCTION' // Only secure in production
    }

    // ✅ Fixed: Use seller_token instead of shop_token to match auth middleware
    res.status(statusCode).cookie("seller_token", token, options).json({
        success: true,
        user,
        token,
    })
}

module.exports = SendShopToken;