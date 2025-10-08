FROM node:18 AS builder
 

WORKDIR /app
 

COPY package.json ./
 

RUN yarn install
 

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN yarn build
 

FROM node:18
 

WORKDIR /app
 

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
 
 

RUN yarn install --production
 

CMD ["node", "build"]
 

EXPOSE 3000