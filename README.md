# vg-hc-store-static-resources
Example Api with Node

# Build the image 
    docker build --no-cache -t vg-hc-store-static-resources:v1 .


# View images uploaded to minikube
    minikube image ls

# Upload the image directly to the cluster (without registry)
    minikube image load vg-hc-store-static-resources:v1  # Si usas Minikube
    
    kind load docker-image vg-hc-store-static-resources:v1 # Si usas Kind

# Create Deployment, Service and Ingress
    kubectl apply -f k8s-deployment.yaml
    kubectl apply -f k8s-service.yaml
    kubectl apply -f k8s-ingress.yaml


# Activar el Ingress Controller (minikube)
    minikube addons enable ingress

    