FROM node:8-alpine
WORKDIR /app
COPY ./build ./build
EXPOSE 5000
CMD ["npx", "serve", "-s", "build"]
