[resilience-theme](https://www.netlifycms.org/) with [next.js](https://nextjs.org/) proof of concept

# How it works
Sites take their content from markdown files in  `/content`. Two of pages (`home` and `about`) are referencing directly their respective markdown files.

`npm install' then 'npm run dev'

Blog component loads all posts (during build!) and lists them out [How to load multiple md files](https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f)

Posts are separate static sites thanks to dynamically created export map.
[here](https://medium.com/@joranquinten/for-my-own-website-i-used-next-js-725678e65b09)
