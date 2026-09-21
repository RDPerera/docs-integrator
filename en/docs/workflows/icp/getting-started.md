---
title: "Getting Started"
description: Register an integration that runs durable workflows with the WSO2 Integration Control Plane, then review its workflows, executions, and runtimes from the console.
keywords: [wso2 integrator, integration control plane, icp, workflow runtime, enable workflow management, config.toml, task queue, workflow definitions, integration overview]
sidebar_label: "Getting Started"
---

# Getting Started

The Integration Control Plane (ICP) is where you watch and steer the durable workflows an integration runs. This page covers connecting an integration to ICP and finding your way around the workflow views it opens up.

## Connect a workflow runtime

A durable workflow runs inside your integration. The Integration Control Plane (ICP) can list its executions, hand out its human tasks, and control running instances only after the integration is registered with an ICP server. There are two ways to do that: run the ICP that ships with WSO2 Integrator, which registers the integration for you, or register it yourself on an ICP server you installed.

### Use the ICP bundled with WSO2 Integrator

For development and evaluation, WSO2 Integrator ships its own ICP server and writes the runtime bridge configuration for you, so there is nothing to create in the console by hand.

1. Open the integration overview and, under **Integration Control Plane**, check **Enable ICP monitoring**.
2. Expand **Publish to local ICP** and click **Start ICP Server**.
3. Start the integration. It registers with the server as it boots.

![Enabling ICP monitoring, expanding Publish to local ICP, and starting the bundled ICP server from the deployment options panel](/img/workflows/getting-started/build-a-claim-workflow-agent/start-icp-server.gif)

Start ICP before the integration, so the integration has somewhere to publish to as it comes up. The project and the integration are both created for you, and because the integration carries a durable workflow it is registered as a workflow integration.

For more information, see [Configuring the integration node with ICP](../../deploy-operate/observe/integration-control-plane-icp.md#configuring-the-integration-node-with-icp).

### Register the integration on an installed ICP

On a server you installed yourself ([Install ICP](../../manage/icp/install-icp.md)), create the project and the integration in the console, then connect a runtime to it.

#### 1. Create a workflow integration

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

#### 2. Add a runtime

Add a runtime to the new integration the same way as for any other integration: generate a secret from **Add Runtime** on the environment card, add the snippet to the integration's `Config.toml` with a unique runtime name, enable remote management in `Ballerina.toml`, import the runtime bridge, and start the integration.

The full procedure, with the field reference and troubleshooting, is in [Connect an Integration to ICP](../../manage/icp/connect-runtime.md).

:::info
The secret is displayed only once. Copy it before closing the dialog.
:::

#### 3. Verify

Once the runtime's heartbeat reaches ICP:

- Under **Runtimes**, the runtime appears with status **RUNNING**.
- The integration's sidebar carries **Workflows** and **Human Tasks**.
- The environment card lists the integration's workflows under **Workflow Definitions**, with **View Workflows** and **Start New Workflow** beside them.

## Open an integration overview

Once an integration is registered, the Integration Control Plane provides workflow management views for it. From an integration overview, you can review the available workflows, open their executions, start a workflow, and view the connected runtimes.

Select **Overview** in the console navigation to open the integration overview. From there:

1. Open the integration that contains the workflows, such as `orderprocessor`.
2. Review the environment cards shown for the integration, such as **Dev** and **Prod**. The page displays the workflow definitions available for each environment and actions for viewing workflows and runtimes.

![Integration overview showing workflow definitions, workflow actions, and runtime status](/img/workflows/icp/integration-overview.png)

The environment overview also summarizes workflow activity by status:

| Status | Description |
| --- | --- |
| **Running** | Workflow instances that are currently executing or paused. Select the status to open the execution list. |
| **Suspended** | Workflow instances paused by an operator and waiting to resume. |
| **Failed (24h)** | Workflow instances that failed within the last 24 hours. |
| **Completed (24h)** | Workflow instances that completed successfully within the last 24 hours. |
| **Pending reviews** | Workflow instances waiting for a review decision, such as an approval or a failed activity review. |
| **Pending tasks** | Human tasks waiting for action from an eligible user. |

## View workflow definitions

The **Workflow Definitions** section lists the workflows that the integration provides. Select a workflow definition to see the workflow available for execution.

Select **View Workflows** to open the **Workflow Executions** page. This page lists the executions for the selected integration and environment.

## View workflow executions

The **Workflow Executions** page lists the workflow runs for the integration. You can search for executions, review their status, and inspect individual runs.

To start a workflow, select **Start New Workflow**. The console opens the **Start Workflow** dialog, where you select a workflow definition and enter its input values. For instructions on starting a workflow, see [Start a workflow](start.md).

## What's next

- [Start a workflow](start.md) — launch a new execution from the console
- [Workflow executions](executions.md) — inspect workflow runs and their progress
- [Complete human tasks](human-tasks.md) — decide the tasks and reviews a halted run is waiting on
- [Workflow permissions](permissions.md) — the permissions and roles that control each view
- [Management API](../reference/management-api.md) — the REST API the console calls
