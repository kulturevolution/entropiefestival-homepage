FROM node:20-alpine

WORKDIR /app

# Declare build arguments
ARG NEXT_CMS_API
ARG NEXT_PUBLIC_CMS_UPLOADS
ARG NEXT_CMS_TOKEN

# Set environment variables
ENV NEXT_CMS_API=${NEXT_CMS_API}
ENV NEXT_PUBLIC_CMS_UPLOADS=${NEXT_PUBLIC_CMS_UPLOADS}
ENV NEXT_CMS_TOKEN=${NEXT_CMS_TOKEN}


COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]