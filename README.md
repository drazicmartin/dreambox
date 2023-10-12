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
docker save <IMAGE_NAME> -o <SAVE_FILE.tar>
docker load -i <SAVE_FILE.tar>

docker save dreambox-pi-front:latest -o dreambox-pi-front.tar
docker save dreambox-pi-cms:latest -o dreambox-pi-cms.tar
```

Deploy
```
docker-compose -f pi-docker-compose.yaml up
```

- copy/paste `.env.example`, rename it `.env` and fill it with your openai key