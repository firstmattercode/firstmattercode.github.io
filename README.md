# firstmattercode.com

The one-page site for First Matter Code LLC. Next.js static export,
deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push
to `main`.

```
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run gen:brand  # regenerate icon.png + the social cards
```

Page copy lives in `src/app/page.tsx`, site-wide metadata in
`src/app/layout.tsx`, and the Mist color scale in `src/app/globals.css`.
The custom domain comes from `public/CNAME`, which the export copies to
the site root.
