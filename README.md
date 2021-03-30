# capacitor-plugin-google-signin

Google signin plugin

## Install

```bash
npm install capacitor-plugin-google-signin
npx cap sync
```

## API

<docgen-index>

* [`signIn()`](#signin)
* [`signOut()`](#signout)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### signIn()

```typescript
signIn() => Promise<User | null>
```

**Returns:** <code>Promise&lt;<a href="#user">User</a> | null&gt;</code>

--------------------


### signOut()

```typescript
signOut() => Promise<void>
```

--------------------


### Interfaces


#### User

| Prop          | Type                |
| ------------- | ------------------- |
| **`id`**      | <code>string</code> |
| **`email`**   | <code>string</code> |
| **`idToken`** | <code>string</code> |

</docgen-api>
