# Episode-01 | Micorservices vs Monolith - How to Build a Project

## SDLC - Waterfall Model

1. Requirement Gathering - PM (Product/Project Manager) + Designer
2. Design - Senior Engineer / EM / Lead - High Level Design, Low Level Design
3. Development - SDE1, SDE2
4. Testing - SDET
5. Deployment - DevOps Engineer / Developer / Tester
6. Maintenance - Repeat the Waterfall for a feature

## Monolith vs Micorservices

### Monolith (MO)

- One single project repository
- Has everything in one repo - Backend code / DB connections / Frontend code / Auth / Emails / Analytics

### Microservices (MS)

- Build small projects for each service
- Separate code repos for each service
- Example - Uber has microservices for Payment Calculation / Fraud Detection etc

### Comparisons (as per Akshay Saini)

#### _Dev Speed_

- MO slow, MS high

#### _Code Repo_

- _Scalability_

- MO tough, MS easier

#### _Deployment_

- MO Single deployment, MS Multiple deployment

#### _Tech Stack_

- MO usually stick to one tech stack
- MS different tech stacks can be used for different services as per requirement

#### _Infra Cost_

- MO easier infra - cheaper
- MS higher infra cost

#### _Complexity_

- Large application MO complexity increases, MS less complex

#### _Fault Isolation_

- One line of code failure can make the entire project to go down in MO, while in MS a service might go down (for example Analytics)
- Tough in MO, Easier in MS

#### _Testing_

- End to End test cases in MO becomes easier, MS architectures has a lot of api calls etc so it becomes tough to do end to end testing

#### _Ownership_

- MO one small team who makes bigger decisions
- MS Each team takes ownership of their own microservice

#### _Maintenance_

- MO difficult MS easier

#### _Rewamps_

- MO difficult MS easier

#### _Debugging_

- MO slightly easier to debug
- MS can have blame games among teams

#### _Overall Dev Experience_

- Akshay prefers microservices architecture

### What happens in NamasteDev.com?

- Student-Web - For frontend - Next.js
- Admin-Web - Admin Dashboard - React.js
- Backend - For backend - Node.js
- Student-MobileApp - For the Mobile Application - ReactNative

### What are we building in Dev Tinder?

#### Two Microservices

- Frontend - React.js
- Backend - Node.js
