---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to the Dynamics 365 Finance and Operations API, and obtaining the values the connector needs: `tokenUrl`, `clientId`, `clientSecret`, and `serviceUrl`.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox), with permission to sign in as a system administrator.
- A Microsoft Entra ID (Azure AD) tenant associated with that environment, with permission to register applications.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.

2. Give the application a name (e.g., `hrdev-integration`), select the appropriate supported account type, and select **Register**.

3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**. You will use these to build the `clientId` and `tokenUrl` values.

4. Go to **Certificates & secrets → Client secrets → New client secret**. Add a description and expiry, then select **Add**.

:::tip
Copy the client secret **value** immediately after creating it — it is shown only once and cannot be retrieved later. Store it securely; it becomes the `clientSecret` configurable value.
:::

## Step 2: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.

2. Search for **Dynamics ERP** (the Dynamics 365 Finance and Operations API) and add the `.default` application permission scope.

3. Select **Grant admin consent for &lt;your tenant&gt;** and confirm.

:::note
Granting admin consent requires Global Administrator or Privileged Role Administrator permissions in the tenant. If you don't have these permissions, ask your tenant administrator to complete this step.
:::

## Step 3: Add the application as a Dynamics 365 user

The app registration must also be added as a user inside the Finance and Operations environment before it can call the OData API.

1. Sign in to your Dynamics 365 Finance environment and go to **System administration → Users → New**.

2. Set a **User name**, then paste the Azure AD **Application (client) ID** you noted in Step 1 into the **Azure AD object ID** (or equivalent application identifier) field.

3. Assign the security roles needed for the HR development entities this application will access (for example, roles that include permission to the CourseGroups, Teams, Skills, RatingModels, and related entities).

4. Save the user record. It may take a few minutes for the permissions to propagate.

## Step 4: Build the token URL

Assemble the OAuth2 token URL using the **Directory (tenant) ID** from Step 1:

```
https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token
```

This is the `tokenUrl` value passed to the connector's `auth` configuration.

## Step 5: Locate the service URL

1. In your Dynamics 365 Finance environment, note the base URL you use to sign in, for example `https://<your-org>.operations.dynamics.com`.

2. The connector's `serviceUrl` is that base URL with the OData data root appended:

```
https://<your-org>.operations.dynamics.com/data
```

:::tip
You can verify the OData root is reachable by browsing to `<serviceUrl>/$metadata` while signed in to the environment — it should return an XML service document.
:::

## What's next

- [Action reference](actions.md): Available operations
