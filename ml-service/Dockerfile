FROM python:3-buster

WORKDIR /usr/src/app

COPY ./ml-server ./

RUN ["pip", "install", "--upgrade", "pip"]

RUN ["pip", "install", "-r", "requirements.txt"]



