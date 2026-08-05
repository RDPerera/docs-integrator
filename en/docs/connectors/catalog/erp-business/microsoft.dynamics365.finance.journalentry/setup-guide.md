---
title: Setup Guide
---
# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 API permissions, adding it as a Dynamics 365 Finance user, and obtaining the credentials required by the connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox) with the General ledger module enabled.
- A Microsoft Entra ID (Azure AD) tenant with permissions to register applications and grant admin consent.
- Sufficient privileges in the Dynamics 365 Finance environment to add application users and assign security roles.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.
2. Give the application a name (e.g., `journalentry-integration`), select the appropriate supported account type, and select **Register**.
3. On the app's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**.
4. Under **Certificates & secrets**, select **New client secret**, add a description and expiry, and select **Add**. Copy the generated secret **value** immediately — it is only shown once.

:::tip
Store the Application (client) ID, Directory (tenant) ID, and client secret value securely. They map directly to the `clientId`, `tenantId`, and `clientSecret` used when initializing the connector client, and to the `tokenUrl` you construct from the tenant ID: `https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token`.
:::

## Step 2: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.
2. Search for the Microsoft Entra ID application that represents your Dynamics 365 Finance and Operations environment (commonly listed as **Dynamics ERP** or by your environment's own app registration name) and add the application permission or delegated `user_impersonation` scope it exposes, depending on your integration pattern.
3. Select **Grant admin consent for `<your tenant>`** to approve the permission for the whole tenant.

:::note
The exact Microsoft Entra ID application and scope you grant depends on how your organization has configured Dynamics 365 Finance and Operations access. Confirm the correct entry with your Dynamics 365 administrator before proceeding.
:::

## Step 3: Add the application as a Dynamics 365 Finance user

1. Sign in to your Dynamics 365 Finance environment and go to **System administration → Users → New**.
2. Enter a **User name** and **User ID**, then in the **Azure Active Directory object ID** (or **Application ID**) field, paste the Application (client) ID noted in Step 1.
3. Set the user's status to **Enabled**.
4. Assign the security roles required to access journal entry data — for example, a role that includes duties covering the general ledger, journal, and ledger transaction settlement entities you plan to call.
5. Select **Save**.

:::tip
Application users authenticate with client credentials rather than an interactive sign-in, but the assigned security roles still govern which OData entities and operations (list, create, update, delete) the application is allowed to perform.
:::

## Step 4: Locate the service URL

1. The OData root of your Dynamics 365 Finance and Operations environment is its base URL with `/data` appended, for example `https://<your-org>.operations.dynamics.com/data`.
2. Confirm the exact host by signing in to the environment and checking the browser address bar, or by asking your Dynamics 365 administrator for the environment URL.
3. This value is passed as the `serviceUrl` parameter when initializing the connector client.

## What's next

- [Action reference](actions.md): Available operations
