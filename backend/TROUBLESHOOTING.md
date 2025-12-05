# MongoDB Connection Troubleshooting

## Current Errors

You're experiencing two MongoDB connection issues:

1. **IP Whitelist Error**: Your IP address is not whitelisted in MongoDB Atlas
2. **SSL/TLS Error**: Connection string may need adjustment

---

## Solution 1: Whitelist Your IP Address (REQUIRED)

### Steps:

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Login** to your account
3. **Select your cluster** (Cluster1)
4. **Click "Network Access"** in the left sidebar (under Security)
5. **Click "Add IP Address"** button
6. **Choose one of these options**:
   - **Option A (Recommended for Development)**: Click "Allow Access from Anywhere" 
     - This adds `0.0.0.0/0` to whitelist
     - ⚠️ Only use for development, not production
   
   - **Option B (More Secure)**: Click "Add Current IP Address"
     - Adds only your current IP
     - You'll need to update if your IP changes

7. **Click "Confirm"**
8. **Wait 1-2 minutes** for changes to propagate

---

## Solution 2: Update Connection String

Your `.env` file should have one of these formats:

### Format 1: Standard (Recommended)
```env
MONGODB_URI=mongodb+srv://pranaydeep921_db_user:YOUR_PASSWORD@cluster1.t9ofifv.mongodb.net/auth_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
```

### Format 2: With SSL Options (If Format 1 doesn't work)
```env
MONGODB_URI=mongodb+srv://pranaydeep921_db_user:YOUR_PASSWORD@cluster1.t9ofifv.mongodb.net/auth_db?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
```

### Format 3: Alternative without appName
```env
MONGODB_URI=mongodb+srv://pranaydeep921_db_user:YOUR_PASSWORD@cluster1.t9ofifv.mongodb.net/auth_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
```

---

## Important Notes

### Password Special Characters

If your password contains special characters, you need to URL encode them:

| Character | Encoded |
|-----------|---------|
| @ | %40 |
| : | %3A |
| / | %2F |
| ? | %3F |
| # | %23 |
| [ | %5B |
| ] | %5D |
| ! | %21 |

**Example**: If password is `Pass@123!`, use `Pass%40123%21`

---

## Step-by-Step Fix

1. **First**: Add your IP to MongoDB Atlas whitelist (see Solution 1)
2. **Second**: Update your `.env` file with the correct password
3. **Third**: Make sure password special characters are URL encoded
4. **Fourth**: Restart the backend server

```bash
# Stop the current server (Ctrl+C)
# Then restart
nodemon server.js
```

---

## Expected Success Output

When connection is successful, you should see:

```
🚀 Server running on port 5000
✅ MongoDB Atlas connected successfully
```

---

## Still Not Working?

### Check These:

1. **Verify password is correct**
   - Go to MongoDB Atlas → Database Access
   - Check your user `pranaydeep921_db_user`
   - Reset password if needed

2. **Check database user permissions**
   - User should have "Read and write to any database" role

3. **Verify cluster name**
   - Should be `cluster1.t9ofifv.mongodb.net`

4. **Check network**
   - Some corporate/school networks block MongoDB Atlas
   - Try using mobile hotspot or different network

---

## Quick Test

After fixing, test the connection:

1. Start backend: `nodemon server.js`
2. Open browser: `http://localhost:5000/api/health`
3. Should see: `{"status":"Server is running","timestamp":"..."}`
