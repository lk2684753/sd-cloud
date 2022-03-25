# Creating a NEAR Account

The easiest way to create an account on NEAR is with [NEAR Wallet](https://wallet.near.org/). NEAR has several [development networks](https://docs.near.org/docs/concepts/networks) operating independently of each other with their own accountIDs. Below we have guides for creating account for two of these networks:

- [`testnet`](https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account)
- [`mainnet`](https://docs.near.org/docs/develop/basics/create-account#creating-a-mainnet-account)

------

## Creating a `testnet` account

The following guide with walk you through `testnet` account creation using [NEAR Wallet](https://wallet.testnet.near.org/).

### Reserve Account ID

> - Navigate to [https://wallet.testnet.near.org](https://wallet.testnet.near.org/) and click on "Create Account".

![mainnet wallet landing](https://docs.near.org/assets/images/mainnet-wallet-landing-eebf84d671b65a53b8860cffb1a34504.jpg)

> - Next, enter your desired account name.

![mainnet create account](https://docs.near.org/assets/images/testnet-create-account-620ce634f95e0aabb27045e250767140.jpg)

------

### Secure your account

> - Choose your account recovery method. "Recovery Phrase" or [Ledger](https://www.ledger.com/) is recommended as the most secure method.

#### Seed Phrase Account Recovery

> - When selecting a recovery phrase / [seed phrase](https://en.bitcoin.it/wiki/Seed_phrase) it is **extremely important** to write down your words **IN ORDER** and keep them in a safe place! We will not have a backup and will not be able to help you recover your account without it.

![recovery method selection](https://docs.near.org/assets/images/security-method-a300ff96bf67ce236955ff40154d4694.jpg)

![setup seed phrase](https://docs.near.org/assets/images/seed-phrase-9c8ddf9f48eb13a250e834e33bb649b2.jpg)

#### E-mail / Phone Number Account Recovery

> - When choosing e-mail or text, a **ONE TIME** recovery link will be sent to you that will have a recovery seed phrase embedded in the URL.
> - **DO NOT DELETE THIS MESSAGE!** We are unable to resend this link to you. If you loose access to this it will result in the loss of your account unless you have another recovery method enabled.

![e-mail recovery](https://docs.near.org/assets/images/email-text-recovery-e63e656349cb16ecd6d378d1f0854c85.jpg)

------

### Success!

> You just created a `testnet` account and received 200 Ⓝ! Upon recovery method confirmation you should be directed to your account dashboard similar to the one below:

![testnet success](https://docs.near.org/assets/images/testnet-success-e7d0450a39bf1d55727c0e9b27b34764.jpg)

> - Here you can view your total balance, available balance, and minimum balance needed for on-chain storage costs. Also, you can view and rotate your [Access Keys](https://docs.near.org/docs/concepts/account#access-keys) by enabling *(add)* or disabling *(delete)* them.

------

## Creating a `mainnet` account

Creating an account on `mainnet` is *almost* identical to `testnet` but will require initial funding for the account. Here is a guide to `mainnet` account creation.

### Reserve Account ID

> - Navigate to [https://wallet.near.org](https://wallet.near.org/) and click on "Create Account".

![mainnet wallet landing](https://docs.near.org/assets/images/mainnet-wallet-landing-eebf84d671b65a53b8860cffb1a34504.jpg)

> - Next, enter your desired account name.

![mainnet create account](https://docs.near.org/assets/images/mainnet-create-account-fc860d2415acfb2f0201b2756302d2be.jpg)

------

### Secure your account

> - Choose your account recovery method. "Recovery Phrase" or [Ledger](https://www.ledger.com/) is recommended as the most secure method.

#### Seed Phrase Account Recovery

> - When selecting a recovery phrase / [seed phrase](https://en.bitcoin.it/wiki/Seed_phrase) it is **extremely important** to write down your words **IN ORDER** and keep them in a safe place! We will not have a backup and will not be able to help you recover your account without it.

![recovery method selection](https://docs.near.org/assets/images/security-method-a300ff96bf67ce236955ff40154d4694.jpg)

![setup seed phrase](https://docs.near.org/assets/images/seed-phrase-9c8ddf9f48eb13a250e834e33bb649b2.jpg)

#### E-mail / Phone Number Account Recovery

> - When choosing e-mail or text, a **ONE TIME** recovery link will be sent to you that will have a recovery seed phrase embedded in the URL.
> - **DO NOT DELETE THIS MESSAGE!** We are unable to resend this link to you. If you loose access to this it will result in the loss of your account unless you have another recovery method enabled.

![e-mail recovery](https://docs.near.org/assets/images/email-text-recovery-e63e656349cb16ecd6d378d1f0854c85.jpg)

------

### Fund Your Account

> - An initial funding of 0.1 Ⓝ will be required to create the account and pay for a small amount of initial storage. You will receive a temporary funding account address similar to the one below.

![fund your account](https://docs.near.org/assets/images/fund-your-account-4a50b97be479b23fbeca9ab1de488d90.jpg)

> - Copy this funding account address and **OPEN A NEW TAB** to fund the account. It is important to leave this page open while funding the account creation. If it accidentally gets closed, you can reconstruct the link by following this format: **wallet.near.org/fund-create-account/YOUR_ACCOUNT.near/FUNDING_ACCOUNT_ADDRESS**

![image](https://docs.near.org/assets/images/url-breakdown-07a250edcc311c9a3d2d9cd982368ee4.png)

> - To fund the account, have an existing NEAR account send >= 0.1 Ⓝ to the funding account address, or click on "Where can I purchase NEAR" to go to an exchange and purchase some. You will then need to provide them with the funding account address.

![purchase near](https://docs.near.org/assets/images/purchase_near-896eb86e05d519065a296ef6029a6523.jpg)

> - Once your account is funded, navigate back to the "Fund Your Account" tab you left open earlier. This page should be automatically updated notifying you that your account has been funded. To complete the process, check the box that acknowledges your one-time funding address will now be deleted and any further assets sent to this address will be lost.

![image](https://docs.near.org/assets/images/account-funded-e55961460848b8d29d47ff8a521ebd62.png)

> - If you are using a Ledger device, two pop-ups will appear: the first one asking you to sign the account creation transaction, and a second one to sign deletion of the one-time funding account address. This second [transaction](https://nomicon.io/RuntimeSpec/Actions.html#deleteaccountaction) will also transfer remaining funds in your one-time address to your new named account.

------

### Success!

> - You have now created a NEAR account on `mainnet`!

![image](https://docs.near.org/assets/images/mainnet-success-c8eb27b6698624b2986b8f8eb0de0b8c.jpg)

> - You should now be directed to your account dashboard where you can view your total balance, available balance, and minimum balance needed for on-chain storage costs. Also, you can view and rotate your [Access Keys](https://docs.near.org/docs/concepts/account#access-keys) by enabling *(add)* or disabling *(delete)* them.

![image](https://docs.near.org/assets/images/mainnet-wallet-dashboard-04c9d80f31fe47b8da4d91510ee609b8.jpg)

## Creating an Account w/ Ledger

> This two minute video walkthrough will guide you on the account creation process using a Ledger device.
>
> - [[ **Click here** ](https://docs.near.org/docs/tutorials/ledger#setup)] for detailed instructions on setting up your Ledger device and the NEAR App.

<iframe width="960" height="540" src="https://www.youtube-nocookie.com/embed/i9XYvHpeBZ4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="box-sizing: border-box; border: 0px; user-select: text; display: block; color-scheme: auto; color: rgb(0, 0, 0); font-family: Inter, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></iframe>

## Access Key Storage / Sign Out

> **WARNING!** Make sure you have a recovery method enabled and working ***BEFORE*** doing this! If you do not, you **WILL NOT** be able to recover your account!
>
> You'll notice that there is not a "sign out" option available with NEAR Wallet. This is due to your [access key](https://docs.near.org/docs/concepts/account#access-keys) being stored in your browser's local storage. If it is imperative that you disable the ability of your browser to access your account, open your browser's dev tools and clear the key/value line of the account you wish to remove.

![local storage access key](https://docs.near.org/assets/images/local-storage-e7f54c9ddde5b856dcb50b8fa2d13dec.png)

> Alternatively, if you would like to save an [access key](https://docs.near.org/docs/concepts/account#access-keys) to your hard-drive, you can use the [`near-cli`](https://docs.near.org/docs/tools/near-cli) command [`near login`](https://docs.near.org/docs/tools/near-cli#near-login).