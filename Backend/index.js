const app = require('express')()
const Razorpay = require('razorpay');
const shortid = require('shortid')
const cors =require('cors')

app.use(cors())
const razorpay = new Razorpay({
    key_id: 'rzp_test_nRMxpBADLzd3pQ',
    key_secret: '2PtdVAbWyagEZ7BSXNB3jeNa',
});
app.post('/razorpay', async (req, res) => {
    const payment_capture = 1
    const currency = 'INR'
    const amount=500

    const options = {
        amount: parseFloat(amount*100),
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await razorpay.orders.create(options)
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error);
    }
})

app.listen(1337, () => {
    console.log('Listening on 1337');
})