# Calculator SMTP Setup Guide

## Current Status
✅ **Calculator is functional** - Leads are being captured even without SMTP configured
⚠️ **Email notifications disabled** - SMTP credentials need to be configured

## What's Working Now

### Without SMTP Configuration:
- ✅ Users can submit quote requests
- ✅ All lead data is logged to console
- ✅ Users see success message
- ❌ No email sent to `zorxdxb@gmail.com` or `sales@bwmc.ae`

### With SMTP Configuration:
- ✅ Users can submit quote requests
- ✅ All lead data is logged to console
- ✅ Users see success message
- ✅ **Email sent to `zorxdxb@gmail.com` and `sales@bwmc.ae` with full lead details**

---

## How to Configure SMTP

### Step 1: Get SMTP Credentials

#### Option A: Gmail (Recommended for Testing)
1. Go to your Gmail account
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "BWMC Calculator"
   - Copy the 16-character password

#### Option B: Professional Email Service
Use your company email provider (e.g., Office 365, Zoho Mail, etc.)

### Step 2: Add Environment Variables

Create or update `.env.local` file in the project root:

```env
# SMTP Configuration for Quote Emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
```

**For Gmail:**
- `SMTP_HOST`: `smtp.gmail.com`
- `SMTP_PORT`: `465`
- `SMTP_USER`: Your Gmail address
- `SMTP_PASS`: The 16-character app password

**For Office 365:**
- `SMTP_HOST`: `smtp.office365.com`
- `SMTP_PORT`: `587`
- `SMTP_USER`: Your Office 365 email
- `SMTP_PASS`: Your password

### Step 3: Restart Development Server

```bash
npm run dev
```

### Step 4: Test

1. Go to `/calculator`
2. Complete all 3 steps
3. Click "Get Your Detailed Quote Now"
4. Check console logs for "✅ Email sent successfully"
5. Check sales@bwmc.ae inbox

---

## Monitoring Leads

### Console Logs

All leads are logged to the console with this format:

```
📝 Lead captured: {
  "timestamp": "2026-01-06T11:15:00.000Z",
  "businessName": "Tech Innovations LLC",
  "contactName": "Ahmed Al Mansoori",
  "mobile": "+971 50 123 4567",
  "email": "ahmed@company.com",
  "businessActivity": "software-development",
  "jurisdiction": "freezone",
  "freezone": {
    "freezone": "SHAMS",
    "officeType": "Virtual Office",
    "visaCount": 2,
    "contractYears": 1,
    "calculatedPrice": 6875
  },
  "emailSent": true
}
```

### Checking Email Status

- `"emailSent": true` - Email was sent successfully
- `"emailSent": false` - SMTP not configured or email failed

---

## Production Deployment

### Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
4. Redeploy your application

### Security Notes

- ✅ Never commit `.env.local` to Git
- ✅ Use App Passwords, not your main email password
- ✅ Rotate credentials periodically
- ✅ Monitor for suspicious activity

---

## Troubleshooting

### "Email not sent" in console

**Check:**
1. Are environment variables set correctly?
2. Is the SMTP password an App Password (for Gmail)?
3. Is 2FA enabled on your Gmail account?
4. Try restarting the dev server

### "Authentication failed"

**Solutions:**
- For Gmail: Generate a new App Password
- For Office 365: Verify password is correct
- Check if account has SMTP access enabled

### Emails going to spam

**Solutions:**
- Add sender email to contacts
- Set up SPF/DKIM records (production)
- Use a professional email service

---

## Alternative: Email Service Integration

If SMTP is problematic, consider these alternatives:

### 1. SendGrid
```bash
npm install @sendgrid/mail
```

### 2. Resend
```bash
npm install resend
```

### 3. Mailgun
```bash
npm install mailgun-js
```

Contact the development team if you need help integrating these services.

---

## Current Behavior Summary

| Scenario | Lead Captured | Email Sent | User Experience |
|----------|---------------|------------|-----------------|
| SMTP configured correctly | ✅ | ✅ | Success message |
| SMTP not configured | ✅ | ❌ | Success message |
| SMTP configured incorrectly | ✅ | ❌ | Success message |
| Network error | ❌ | ❌ | Error message with contact info |

**Important:** Users always see a success message if their data is valid, ensuring a good user experience even if email fails. All leads are logged to console for manual follow-up if needed.
