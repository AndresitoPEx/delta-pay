import mercadopago from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
    try {
        mercadopago.configure({
            access_token: MERCADOPAGO_API_KEY,
        });

        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: 'Mi producto',
                    unit_price: 100,
                    currency_id: 'PEN',
                    quantity: 1,
                },
            ],
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending',
            },
            auto_return: 'approved',
            notification_url: 'https://5d7e-2001-1388-6660-73e7-1da8-308c-50-4ad1.ngrok.io/webhook',
        });

        console.log(result);

        res.json({ init_point: result.body.init_point }); // Devuelve el link de pago en la respuesta
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({ error: 'Error al crear la preferencia de pago' });
    }
};


export const webhook = async (req, res) => {
    console.log('webhook', req.query);

    const payment = req.query;

    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment["data.id"])
            console.log(data);
        }
        res.status(200).send('ok');
    }catch (error) {
        console.error('Error al procesar el webhook:', error);
        res.status(500).json({ error: 'Error al procesar el webhook' });
    }

}   