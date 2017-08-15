FROM node:6.11.2
WORKDIR /app
COPY /backend/. /app
RUN npm install
COPY ./frontend/dist/. /app/dist/
CMD node server-tsc/run.js
EXPOSE 80