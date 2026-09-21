---
title: "Connect a Workflow Runtime"
description: Register an integration that runs durable workflows with the WSO2 Integration Control Plane so its executions, human tasks, and reviews appear in the console.
keywords: [wso2 integrator, integration control plane, icp, workflow runtime, enable workflow management, config.toml, task queue]
sidebar_label: "Getting Started"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect a Workflow Runtime

A durable workflow runs inside your integration. The Integration Control Plane (ICP) can list its executions, hand out its human tasks, and control running instances only after the integration is registered with an ICP server. There are two ways to do that: run the ICP that ships with WSO2 Integrator, which registers the integration for you, or register it yourself on an ICP server you installed.

## Use the ICP bundled with WSO2 Integrator

For development and evaluation, WSO2 Integrator ships its own ICP server and writes the runtime bridge configuration for you, so there is nothing to create in the console by hand.

1. Open the integration overview and, under **Integration Control Plane**, check **Enable ICP monitoring**.
2. Expand **Publish to local ICP** and click **Start ICP Server**.
3. Start the integration. It registers with the server as it boots.

![Enabling ICP monitoring, expanding Publish to local ICP, and starting the bundled ICP server from the deployment options panel](/img/workflows/getting-started/build-a-claim-workflow-agent/start-icp-server.gif)

Start ICP before the integration, so the integration has somewhere to publish to as it comes up. The project and the integration are both created for you, and because the integration carries a durable workflow it is registered as a workflow integration.

For more information, see [Configuring the integration node with ICP](../../deploy-operate/observe/integration-control-plane-icp#configuring-the-integration-node-with-icp)

## Register the integration on an installed ICP

On a server you installed yourself ([Install ICP](../../manage/icp/install-icp.md)), create the project and the integration in the console, then connect a runtime to it.

### 1. Create a workflow integration

The **Workflow** integration type is what tells ICP that this integration hosts workflows.

1. Go to **Projects** > *your project*, or click **+ Create Project** first.
2. Click **+ Create Integration** and fill in the **Create New Integration** form:

   | Field | Value |
   | --- | --- |
   | **Display Name** | A readable name, for example `Order workflow` |
   | **Name** | The URL-safe handle derived from the display name. Click the edit icon to override it. |
   | **Technology** | **WSO2 Integrator** |
   | **Integration Type** | **Workflow**, which orchestrates long-running processes with durable state and human tasks |

3. Click **Create**.

![The Create New Integration form with Technology set to WSO2 Integrator and the Workflow integration type selected](/img/workflows/icp/connect-runtime/create-workflow-integration.png)

### 2. Add a runtime

Add a runtime to the new integration the same way as for any other integration: generate a secret from **Add Runtime** on the environment card, add the snippet to the integration's `Config.toml` with a unique runtime name, enable remote management in `Ballerina.toml`, import the runtime bridge, and start the integration.

The full procedure, with the field reference and troubleshooting, is in [Connect an Integration to ICP](../../manage/icp/connect-runtime.md).

:::info
The secret is displayed only once. Copy it before closing the dialog.
:::

### 3. Verify

Once the runtime's heartbeat reaches ICP:

- Under **Runtimes**, the runtime appears with status **RUNNING**.
- The integration's sidebar carries **Workflows** and **Human Tasks**.
- The environment card lists the integration's workflows under **Workflow Definitions**, with **View Workflows** and **Start New Workflow** beside them.

## What's next

- [Start a workflow](start.md) — launch a new execution from the console
- [Workflow executions](executions.md) — inspect the timeline, execution graph, and history of a run
- [Workflow permissions](permissions.md) — the permissions and roles that control each view
- [Management API](../reference/management-api.md) — the REST API the console calls
