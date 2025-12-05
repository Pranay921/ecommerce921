# MongoDB Authentication Error - Quick Fix Guide

## Current Error: "bad auth : authentication failed"

This means your password is incorrect or improperly formatted in the `.env` file.

---

## Solution Steps

### Step 1: Get Your Correct Password

You have **3 options**:

#### Option A: Reset Password in MongoDB Atlas (RECOMMENDED)
1. Go to https://cloud.mongodb.com/
2. Click **Database Access** (left sidebar under Security)
3. Find user `pranaydeep921_db_user`
4. Click **Edit** button
5. Click **Edit Password**
6. Choose **Autogenerate Secure Password** OR set a simple password like `Test1234`
7. **COPY the password** immediately
8. Click **Update User**

#### Option B: Use Existing Password
- If you know your password, make sure to URL encode special characters

#### Option C: Create New User
1. Go to **Database Access**
2. Click **Add New Database User**
3. Username: `pranaydeep921_db_user` (or new name)
4. Password: Set a simple one like `Test1234` (no special characters)
5. Database User Privileges: **Atlas admin** or **Read and write to any database**
6. Click **Add User**

---

### Step 2: Update Your `.env` File

Open `backend/.env` and use this **EXACT** format:

```env
MONGODB_URI=mongodb+srv://pranaydeep921_db_user:YOUR_PASSWORD_HERE@cluster1.t9ofifv.mongodb.net/auth_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
```

**Replace `YOUR_PASSWORD_HERE` with your actual password.**

---

### Step 3: Handle Special Characters

If your password contains special characters, **URL encode them**:

| Character | Replace With |
|-----------|--------------|
| @ | %40 |
| : | %3A |
| / | %2F |
| ? | %3F |
| # | %23 |
| ! | %21 |
| $ | %24 |
| & | %26 |
| = | %3D |

**Example:**
- Password: `MyPass@123!`
- In .env: `MyPass%40123%21`

---

### Step 4: Verify IP Whitelist

Make sure your IP is whitelisted:

1. Go to **Network Access** in MongoDB Atlas
2. You should see your IP or `0.0.0.0/0` (allow all)
3. If not, click **Add IP Address** → **Allow Access from Anywhere**

---

### Step 5: Test Connection

After updating `.env`:

1. **Save the file**
2. The nodemon should auto-restart
3. Look for: `✅ MongoDB Atlas connected successfully`

---

## Quick Test Examples

### Example 1: Simple Password (No Special Characters)
```env
MONGODB_URI=mongodb+srv://pranaydeep921_db_user:Test1234@cluster1.t9ofifv.mongodb.net/auth_db?retryWrites=true&w=majority
```

### Example 2: Password with Special Characters
If password is `Pass@word!123`:
```env
MONGODB_URI=mongodb+srv://pranaydeep921_db_user:Pass%40word%21123@cluster1.t9ofifv.mongodb.net/auth_db?retryWrites=true&w=majority
```

---

## Still Not Working?

### Double-check these:

1. ✅ **No spaces** in the connection string
2. ✅ **No quotes** around the URI
3. ✅ Username is exactly: `pranaydeep921_db_user`
4. ✅ Cluster name is: `cluster1.t9ofifv.mongodb.net`
5. ✅ Password is URL encoded if it has special characters
6. ✅ IP address is whitelisted in MongoDB Atlas

### Alternative: Use MongoDB Compass to Test

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Use the same connection string
3. If Compass connects, the issue is in your `.env` file formatting
4. If Compass fails, the issue is with MongoDB Atlas settings

---

## Expected Success

When it works, you'll see:

```
🚀 Server running on port 5000
✅ MongoDB Atlas connected successfully
```

Then try signing up at http://localhost:5173/login
