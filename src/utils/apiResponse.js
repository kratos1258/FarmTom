export const successResponse = (
    res,
    {
        statusCode = 200,
        message = "Request successful.",
        data = null,
    } = {}
) => {
    const response = {
        success: true,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export default successResponse;