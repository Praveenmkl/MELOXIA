# EmailJS Setup Guide for Meloxia Studio Contact Form

## 🚀 Quick Setup (5 Minutes)

EmailJS sends emails directly from your frontend - **no backend password needed!**

---

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **Sign Up** (Free - 200 emails/month)
3. Sign up with your email or Google account

---

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Click **Connect Account** and authorize with your Gmail
5. **Service ID** will be generated (e.g., `service_abc123`) - **Copy this!**
6. Click **Create Service**

---

## Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Replace the template content with this:

```
Subject: New Contact Form - {{service}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Service Requested: {{service}}

Message:
{{message}}

---
This email was sent from Meloxia Studio contact form.
```

4. **Template ID** will be shown (e.g., `template_xyz789`) - **Copy this!**
5. Click **Save**

---

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find **Public Key** (e.g., `aBc123XyZ...`) - **Copy this!**

---

## Step 5: Update Your Code

Open: `frontend/src/sections/FormSection/FormSection.jsx`

Find these lines (around line 32):
```javascript
const serviceID = 'YOUR_SERVICE_ID';
const templateID = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

Replace with your actual IDs:
```javascript
const serviceID = 'service_abc123';      // From Step 2
const templateID = 'template_xyz789';    // From Step 3
const publicKey = 'aBc123XyZ...';        // From Step 4
```

---

## Step 6: Test It!

1. Start your frontend: `cd frontend; npm run dev`
2. Fill out the contact form
3. Submit
4. Check your Gmail inbox! 📧

---

## 📧 What Happens When User Submits?

1. User fills form on your website
2. EmailJS sends email **directly from frontend** to your Gmail
3. You receive email with all customer details
4. You can reply directly to the customer

---

## ✨ Template Variables Explained

In your EmailJS template, these variables are filled automatically:

- `{{from_name}}` → Customer's name
- `{{from_email}}` → Customer's email
- `{{phone}}` → Customer's phone
- `{{service}}` → Selected service
- `{{message}}` → Project details
- `{{to_name}}` → "Meloxia Studio" (your company)

---

## 🎨 Customize Email Template (Optional)

You can make the email prettier with HTML:

1. In EmailJS dashboard → **Email Templates**
2. Click on your template
3. Click **Edit** and switch to HTML editor
4. Use this fancy template:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #FD9800; border-bottom: 3px solid #FD9800;">
    New Contact Form Submission
  </h2>
  
  <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Phone:</strong> {{phone}}</p>
    <p><strong>Service:</strong> {{service}}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3>Project Details:</h3>
    <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #FD9800;">
      {{message}}
    </p>
  </div>
  
  <hr style="border: none; border-top: 1px solid #ddd;">
  <p style="color: #666; font-size: 12px;">Sent from Meloxia Studio contact form</p>
</div>
```

---

## 🔧 Advanced: Auto-Reply to Customer (Optional)

Want to send an automatic "Thank you" email to customers?

1. Create a **second template** in EmailJS
2. Name it "Customer Confirmation"
3. Template content:

```
Subject: Thank you for contacting Meloxia Studio!

Hi {{from_name}},

Thank you for reaching out to Meloxia Studio!

We've received your message about: {{service}}

Our team will review your request and get back to you within 24 hours.

Best regards,
Meloxia Studio Team
```

4. In `FormSection.jsx`, add this after the first `emailjs.send()`:

```javascript
// Send confirmation to customer
await emailjs.send(
  serviceID,
  'template_customer_confirmation', // Your second template ID
  templateParams,
  publicKey
);
```

---

## 💰 Pricing

- **Free:** 200 emails/month
- **Personal:** $7/month - 1,000 emails
- **Professional:** $15/month - 5,000 emails

For a small business, free tier is usually enough!

---

## 🐛 Troubleshooting

### "Failed to send message"
- Check your Service ID, Template ID, and Public Key are correct
- Make sure you authorized Gmail in Step 2
- Check browser console for detailed error

### Email not received
- Check spam folder
- Verify your Gmail is connected in EmailJS dashboard
- Make sure template variables match exactly

### "User ID is required"
- You're using Public Key, not User ID (it's the same thing)
- Copy from Account → General → Public Key

---

## ✅ Files Modified

- ✅ `frontend/src/sections/FormSection/FormSection.jsx` - Using EmailJS
- ✅ Removed all backend email files
- ✅ No email password needed!

---

## 🎉 Benefits of EmailJS

✅ No backend email configuration  
✅ No app passwords needed  
✅ Works directly from frontend  
✅ Free tier is generous  
✅ Super easy to set up  
✅ Secure and reliable  

All done! Your contact form is now powered by EmailJS! 🚀

