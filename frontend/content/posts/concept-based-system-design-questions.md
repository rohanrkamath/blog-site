---
title: "Core System Design Concepts"
description: "These are some concepts I studied and making notes of it here."
date: "2025-08-09"
tags: ["system design concepts"] 
categories: ["system design"]
published: false 
---

# Introduction 

Following are some concepts I read and noting them down in a question-answer format. I will be continuously updaing this page with more concepts.

1. What is difference between API Gateway and Load Balancer?
2. What is difference between Reverse Proxy and Forward Proxy?
3. What is difference between Horizontal scaling and vertical scaling?
4. What is difference between Microservices and Monolithic architecture?
5. What is difference between vertical and horizontal partitioning?
6. What is Rate Limiter?
7. How does Single Sign On (SSO) works?
8. How does Apache Kafka works?
9. Differnece between Kafka, ActiveMQ, and RabbitMQ?
10. Difference between JWT, OAuth, and SAML?

### 1. What is the difference between API Gateway and Load Balancer?

| Feature           | API Gateway                                                                                                                | Load Balancer                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Purpose**       | Manages and routes **API requests**, often adding features like authentication, rate limiting, logging, and transformation | Distributes **incoming network traffic** across multiple servers to ensure high availability and performance |
| **Layer**         | Works at **application layer (HTTP/HTTPS)**                                                                                | Can work at **transport (Layer 4)** or **application layer (Layer 7)**                                       |
| **Functionality** | Request routing, versioning, authentication, throttling, monitoring, request/response transformation                       | Traffic balancing, health checks, failover, SSL termination                                                  |
| **Target**        | Typically routes to **microservices / backend APIs**                                                                       | Routes to **servers / application instances**                                                                |
| **Use Case**      | Expose multiple microservices as a unified API endpoint                                                                    | Handle high traffic and distribute requests evenly among backend servers                                     |

### 2. What is difference between Reverse Proxy and Forward Proxy?

| Feature               | Forward Proxy                                                                                                                                          | Reverse Proxy                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Who it represents** | Works on behalf of the **client**; sits between client and external servers to send/receive requests on the client’s behalf.                           | Works on behalf of the **server**; sits between clients and backend servers, handling requests before they reach the server.                                 |
| **Client awareness**  | Usually configured manually or via network settings, so the client is aware and must point traffic through it.                                         | Often transparent to the client; the client thinks it’s talking directly to the target server.                                                               |
| **Common use cases**  | Enforcing corporate browsing policies, bypassing geo-restrictions, hiding client IPs, caching frequently accessed resources, monitoring user activity. | Load balancing across multiple servers, caching static content, SSL/TLS termination, application firewalling, hiding backend architecture from the internet. |
| **Traffic flow**      | `Client → Forward Proxy → Internet Server` — the proxy decides whether to allow or block requests, and may modify them before forwarding.              | `Client → Reverse Proxy → Backend Servers` — the proxy distributes requests, handles security, and optimizes delivery before sending to the backend.         |
| **IP masking**        | Hides the **client’s IP** from the target server; the server only sees the proxy’s IP.                                                                 | Hides the **server’s IP** from the client; the client only sees the proxy’s IP.                                                                              |

**Summary**: Forward Proxy is a layer between the client and internet, helps in hiding clients IPs from servers, monitoring user activities, caching frequent resources and browsing policies. Reverse Proxy is a layer between the server and the internet, helps in load balancing across servers, caching content, firewalling and hiding backend architecture from the internet. Both are usually used for security measures.

### 3. What is difference between Horizontal scaling and vertical scaling?

| Feature                | Horizontal Scaling                                                                  | Vertical Scaling                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Definition**         | Adding **more machines/instances** to handle increased load.                        | Increasing the **resources** (CPU, RAM, storage) of an existing machine. |
| **Approach**           | Scale **out** (or in) by adding/removing nodes in a distributed system.             | Scale **up** (or down) by upgrading/downgrading the same server.         |
| **Performance impact** | Improves concurrency and fault tolerance; good for distributed workloads.           | Improves performance for single-threaded or resource-heavy applications. |
| **Complexity**         | More complex — requires load balancing, data partitioning, and distributed systems. | Simpler — often just upgrading hardware or VM specs.                     |
| **Limitations**        | Can scale almost infinitely, but needs architecture to support it.                  | Limited by the maximum capacity of the hardware.                         |

**Summary**: Horizontal Scaling is more machines and Vertical Scaling is bigger machines.

#### 4. What is difference between Microservices and Monolithic architecture? 

| Feature              | Monolithic Architecture                                                                     | Microservices Architecture                                                            |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Structure**        | Single, unified codebase where all components (UI, business logic, DB) are tightly coupled. | Multiple small, independent services, each responsible for a specific functionality.  |
| **Deployment**       | Entire application is deployed as one unit — any change requires redeploying the whole app. | Each service can be deployed, updated, and scaled independently.                      |
| **Scalability**      | Scales as a whole — can’t scale components individually.                                    | Can scale only the services that need more resources.                                 |
| **Technology stack** | Usually uses one tech stack for the entire app.                                             | Each service can use a different tech stack and database as needed.                   |
| **Fault isolation**  | A bug in one module can potentially bring down the entire application.                      | Failures are isolated to the affected service, minimizing impact on the whole system. |

**Summary**: Monolithic architecture is like a one big block where are all the components are coupled tightly whereas in Microservices Architecture, every component is a standalone service that, and they communicate with each other.

### 5. What is difference between vertical and horizontal partitioning?

| Feature         | Vertical Partitioning                                                                    | Horizontal Partitioning                                                                 |
| --------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Definition**  | Splitting a table **by columns** into multiple tables.                                   | Splitting a table **by rows** into multiple tables or database instances.               |
| **Goal**        | Reduce table width, improve query performance by storing only needed columns.            | Distribute data across multiple servers/shards for scalability and faster access.       |
| **Example**     | `Users` table split into `UserProfile` (name, email) and `UserSecurity` (password, 2FA). | `Users` table split so IDs 1–1M go to DB1, and IDs 1M–2M go to DB2.                     |
| **When to use** | When certain columns are rarely queried together or for security (sensitive data).       | When dataset is huge and queries/traffic can be split by data ranges or keys.           |
| **Impact**      | Smaller tables = less I/O per query, but may need joins to get full record.              | Spreads load and storage, but requires routing logic to find the right partition/shard. |




