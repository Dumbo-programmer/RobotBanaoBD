exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const orderData = JSON.parse(event.body);

        // Log order to console (in production, you'd save this to a database)
        console.log('New Order Received:', {
            orderId: orderData.orderId,
            customer: orderData.customer.name,
            total: orderData.total,
            timestamp: orderData.timestamp
        });

        // Here you could:
        // 1. Send email notifications (using services like SendGrid, Mailgun)
        // 2. Save to a database (Airtable, Firebase, MongoDB)
        // 3. Send SMS notifications (Twilio)
        // 4. Integrate with your inventory system
        
        // For now, we'll just return success
        // The order data is logged and you can view it in Netlify Functions logs

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                message: 'Order received successfully',
                orderId: orderData.orderId
            })
        };
    } catch (error) {
        console.error('Error processing order:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: 'Failed to process order'
            })
        };
    }
};
