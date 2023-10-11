# Dreambox

Storyteller webapp base on cards with ai !

- font: svelte & svelteKit
- back: strapi

## Run project

```bash
# front
cd front
npm run dev

# back
cd cms
npm run strapi develop
```

## Build project for on docker rapsberry Pi-3

Build images
```
# Front
docker build --platform linux/arm/v7 -t dreambox-pi-front:latest ./front
# Back
docker build --platform linux/arm/v7 -t dreambox-pi-cms:latest ./cms
```

(optional) Share the image
```
docker save <image-name> -o <saveFile.tar>
docker load -i <saveFile.tar>
```

Deploy
```
docker-compose -f pi-docker-compose.yaml
```

- copy/paste `.env.example`, rename it `.env` and fill it with your openai key