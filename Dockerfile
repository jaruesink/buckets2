FROM node:6.11.2-slim
WORKDIR /app
COPY /backend/. /app
RUN npm install
COPY ./frontend/dist/. /app/dist/
CMD node server.js
EXPOSE 3000