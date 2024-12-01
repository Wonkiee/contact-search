Deploying a React application to Amazon ECS

Here are the steps to deploy a React app to ECS using GitHub Actions:

# Prerequisites:

1. **AWS Account** with ECS, ECR, and IAM access.
2. **Docker** installed on your local machine (for local testing).
3. **GitHub Repository** for your React app.
4. **AWS CLI** installed and configured on your local machine.
5. **IAM User/Role** with sufficient permissions (ECS, ECR, IAM roles, etc.).

---

### 1. **Prepare the React App and Dockerfile**

Create a `Dockerfile` for the React application.

## Example `Dockerfile`:

```Dockerfile

FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## 2. **Push Your Docker Image to Amazon ECR (Elastic Container Registry)**

Before ECS can use the Docker image, it needs to be stored in ECR.

1. **Create an ECR repository**:

   - Note down the repository URI.

2. **Authenticate Docker to ECR**:
   Authenticate the Docker client by running the below command

   ```bash
   aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<your-region>.amazonaws.com
   ```

3. **Build and Tag the Docker Image**:
   Build the docker image inside the React app directory.

   ```bash
   docker build -t react-app .
   ```

4. **Tag and Push to ECR**:
   Tag the image with the ECR repository URI and push it:
   ```bash
   docker tag react-app:latest <aws_account_id>.dkr.ecr.<your-region>.amazonaws.com/<repository-name>:latest
   docker push <aws_account_id>.dkr.ecr.<your-region>.amazonaws.com/<your-repository-name>:latest
   ```

---

### 3. **Create ECS Cluster**

1. Go to the **ECS Console** in AWS.
2. Create a new ECS cluster.
3. After creation, note the cluster name and setup the required security groups, subnets, and IAM roles.

---

### 4. **Setup GitHub Actions CI/CD Pipeline**

In the GitHub repository, we'll use GitHub Actions to automate the build and deployment process.

1. **Create a `.github/workflows/ci-cd.yml` file**:
   This file defines the CI/CD pipeline.

#### Example `ci-cd.yml`:

```yaml
name: CI/CD for Contact Sreach App to ECS

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Cache Docker layers
        uses: actions/cache@v2
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-

      - name: Login to AWS ECR
        run: |
          aws ecr get-login-password --region ${{ secrets.AWS_REGION }} | docker login --username AWS --password-stdin ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com

      - name: Build Docker image
        run: |
          docker build -t react-app .
          docker tag react-app:latest ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest

      - name: Push Docker image to ECR
        run: |
          docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest

      - name: Deploy to ECS
        run: |
          ecs_task_definition=$(aws ecs register-task-definition \
            --family react-app-task \
            --network-mode awsvpc \
            --container-definitions "[{\"name\":\"react-app\",\"image\":\"${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest\",\"essential\":true,\"memory\":512,\"cpu\":256,\"portMappings\":[{\"containerPort\":80,\"hostPort\":80}]}]" \
            --query 'taskDefinition.taskDefinitionArn' --output text)

          aws ecs update-service --cluster react-app-cluster \
            --service react-app-service \
            --task-definition $ecs_task_definition \
            --desired-count 1
```

## Configuration:

- Replace `AWS_ACCOUNT_ID`, `AWS_REGION`, `ECR_REPOSITORY`, `react-app-cluster`, and `react-app-service` with the actual values for your AWS account.
- The pipeline is set to trigger on `push` to the `main` branch.

2. **Add GitHub Secrets**:
   Go to the repository's **Settings** > **Secrets** and add the following secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION` (e.g., `us-west-2`)
   - `AWS_ACCOUNT_ID`
   - `ECR_REPOSITORY` (ECR repository name)

---

## 5. **Deploy the ECS Service**

Ensure that you have a service in ECS that references your container image from ECR.

1. Go to **ECS Console**.
2. Create a new service, if its not done yet, and select the **Fargate** launch type (or EC2, depending on your choice).
3. Link the service to your ECS task definition.
4. Configure the desired count of running tasks and any load balancing, networking, and security group settings.

---

## 6. **Push Changes to GitHub and Trigger Deployment**

Commit and push the changes to the `main` branch:

```bash
git add .
git commit -m "Setup CI/CD"
git push origin main
```

This will trigger the GitHub Actions pipeline, and,

- Build the Docker image
- Push it to Amazon ECR
- Update the ECS service with the new image

---

## 7. **Verify the Deployment**

Use the App's public IP ro load balancer URL to check whether the app is running or not. Check the logs for any issues.

---
