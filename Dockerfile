FROM node:16.10-alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "index.js"]
EXPOSE 4000
