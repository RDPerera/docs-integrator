---
title: Setup Guide
---
# Setup Guide

This guide walks you through configuring SAP S/4HANA Communication Management to expose the Condition Record for Pricing in Sales API and obtaining the credentials required to use the connector.


## Prerequisites

- An active SAP S/4HANA Cloud or on-premise system with administrative access.
- A user with the SAP_BR_ADMINISTRATOR or equivalent role to create communication arrangements.

## Step 1: Create a communication user

1. Log in to your SAP S/4HANA system.
2. Navigate to **Communication Management** → **Maintain Communication Users**.
3. Select **New** to create a new communication user.
4. Fill in the following fields:
   - **User Name**: Enter a name (e.g., `BALLERINA_PRC_USR`).
   - **Description**: Enter a meaningful description.
   - **Password**: Set a strong password and confirm it.
5. Select **Create**.

## Step 2: Create a communication system

1. Navigate to **Communication Management** → **Communication Systems**.
2. Select **New**.
3. Fill in the following fields:
   - **System ID**: Enter a unique ID (e.g., `BALLERINA_INTEGRATION`).
   - **System Name**: Enter a display name.
   - **Host Name**: Enter the hostname or IP of the system that will connect (your integration host).
4. Under **Users for Inbound Communication**, add the communication user created in the previous step.
5. Select **Save**.

## Step 3: Create a communication arrangement for the pricing API

1. Navigate to **Communication Management** → **Display Communication Scenario**.
2. In the search bar, type `Pricing Data Integration` and select the corresponding scenario
   (`SAP_COM_0294`) from the results.
3. In the top right corner of the screen, select **Create Communication Arrangement**.
4. Enter a unique name for the arrangement.
5. In the **Communication System** field, select the communication system created in the previous step.
6. Under **Inbound Communication**, confirm the authentication method is set to **User ID and Password**.
7. Select **Save**.

:::note
After saving the arrangement, the system displays the Service URL (base path). Copy the hostname portion; you will use it as the `hostname` parameter when initialising the Ballerina client.
:::

## Step 4: Retrieve the API hostname

1. Open the saved Communication Arrangement.
2. In the top right corner of the screen, locate the displayed hostname
   (e.g., `<unique-id>-api.s4hana.cloud.sap`). This is your `hostname` value.
3. Note the **User Name** of the inbound communication user; this is your `username`.
4. Use the password set in step 1 as your `password`.

:::tip
Store the hostname, username, and password securely.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime
rather than hardcoding them in source code.
:::

## What's next

- [Action reference](actions.md): Available operations
