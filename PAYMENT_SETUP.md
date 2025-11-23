# Payment Integration Guide

This guide explains how to set up Stripe payment collection for the Stake Engine Project Validator.

## Quick Setup (5 minutes)

### 1. Create Stripe Account
- Go to https://stripe.com and sign up
- Verify your email address

### 2. Get Your API Keys
- Go to https://dashboard.stripe.com/apikeys
- Copy your **Publishable key** (starts with `pk_test_` for test mode)

### 3. Create a Payment Link
1. Go to https://dashboard.stripe.com/payment-links
2. Click **"New payment link"**
3. Configure the product:
   - **Name**: Stake Engine Validation
   - **Price**: $3.00
   - **Currency**: USD
4. Under **"After payment"**, set:
   - Success URL: `http://localhost:5173/validator?payment_success=true` (for development)
   - Or your production URL: `https://yourdomain.com/validator?payment_success=true`
5. Click **"Create link"**
6. Copy the payment link (e.g., `https://buy.stripe.com/test_XXXXX`)

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_YOUR_LINK_HERE
```

### 5. Test the Integration
```bash
npm run dev
```

Navigate to `/validator` and click **"Pay $3 & Start Validation"**. You should be redirected to Stripe's payment page.

## Test Mode

Use these test card numbers in Stripe test mode:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiration date and any 3-digit CVC

## Production Deployment

### 1. Switch to Live Mode
- Get your live publishable key: https://dashboard.stripe.com/apikeys
- Create a new payment link in live mode
- Update your `.env` file with live keys

### 2. Update Success/Cancel URLs
Make sure your payment link success URL points to your production domain:
```
https://yourdomain.com/validator?payment_success=true
```

### 3. Deploy Environment Variables
Add these to your hosting platform (Vercel, Netlify, etc.):
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_PAYMENT_LINK`

## How It Works

1. User visits `/validator`
2. If not paid, they see payment gate with $3 button
3. Clicking button redirects to Stripe payment page
4. After successful payment, Stripe redirects back with `?payment_success=true`
5. App stores payment status in localStorage
6. User can now upload and validate projects

## Validation Credits

Currently, payment is stored in localStorage per browser. For production, consider:
- Backend validation of payment status
- User accounts with credit tracking
- Webhook integration for real-time payment verification
- Database to store validation credits

## Support

For Stripe-related questions:
- Docs: https://stripe.com/docs
- Support: https://support.stripe.com

For implementation questions:
- Check the `ProjectValidator.tsx` component
- Review the payment flow in the `handlePayment` function
