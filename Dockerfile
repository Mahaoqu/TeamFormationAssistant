FROM node:16 as build-stage
WORKDIR /
COPY frontend/package.json .
RUN npm install
COPY frontend .
RUN npm run build

FROM node:16 as backend
WORKDIR /
COPY ./backend/package.json .
RUN npm install
COPY --from=build-stage /build/ /static

COPY backend .
RUN npm run build
