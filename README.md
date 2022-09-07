# talbati App

### NPM & yarn
```bash
$ node -v
v16.17.0
------
$ npm -v
8.15.0
-----
$ yarn -v
1.22.19
```

### eas

```bash
npm install -g eas-cli
```

### expo-optimize
```bash
npm install -g sharp-cli@^1.0.0
npx expo-optimize
```

### Expo Push Notifications

**Using FCM for Push Notifications. Uploading Server Credentials**

1. At the top of the sidebar, click the gear icon to the right of Project Overview to go to your project settings.
2. Click on the Cloud Messaging tab in the Settings pane.
3. Copy the token listed next to Server key.
4. Run `expo push:android:upload --api-key <your-token-here>`, replacing **<your-token-here>** with the string you just copied. We'll
   store your token securely on our servers, where it will only be accessed when you send a push notification.
5. push notifications to work correctly, Firebase requires the API key to either be unrestricted (the key can call
   any API), or have access to both `Firebase Cloud Messaging API` and `Firebase Installations API`

```bash
expo push:android:upload --api-key
```
