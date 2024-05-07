FROM node:lts-alpine as build
RUN mkdir -p /app
WORKDIR /app
ENV DATABASE_URL="file:./db.db"
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM build as app
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
RUN npm ci --omit dev 
# RUN npx prisma migrate deploy

RUN apk add curl 

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --retries=2 --start-period=5s --timeout=5s --interval=1m CMD curl -f http://localhost:3000/ || exit 1

CMD [ "node","build"]
# CMD [  "npm", "run", "start:prod" ]