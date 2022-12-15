# Microservices project - Ticketing

## Dependencies

### Packages

You need to have installed `Skaffold`, you can install it from [install skaffold](https://skaffold.dev/docs/install/)

### Software
- [Docker](https://www.docker.com/)
- [Kubectl](https://docs.docker.com/desktop/kubernetes/)
- [Ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)

## Variables

- Json Web Token:
  Its necessary to set an env variable called `JWT_KEY`.
  You can create the env variable with the command
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=${value}
```

## Commands

The only one command you need to run the project is:
```
skaffold dev
```

