FROM node:20.9.0-alpine3.18 as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package.json ./
RUN npm i

COPY --chown=node:node . .
RUN npm run db:gen:docker
RUN npm run build \
    && npm prune --production

# ---

FROM node:20.9.0-alpine3.18

WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder --chown=node:node /home/node/prisma ./prisma
COPY --from=builder --chown=node:node /home/node/*.sh ./

CMD ["npm", "run", "start:prod", "&", "sleep 30;", "npm", "run", "db:push:docker"]
