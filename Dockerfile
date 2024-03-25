FROM node:20.11-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm cache clean --force
EXPOSE 4000
CMD ["npm", "run", "start:migration:dev"]