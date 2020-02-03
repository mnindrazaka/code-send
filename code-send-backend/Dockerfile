# Step 1 : Build
FROM node
COPY . .
RUN npm install
RUN npm run build

# Step 2 : Run
ENV NODE_PATH=./build
CMD ["node", "build/server.js"]