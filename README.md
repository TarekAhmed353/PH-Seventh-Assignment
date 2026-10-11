# বাজার দর (BazarDor)

A Bangla website for checking today's prices of everyday groceries in Bangladesh. You can see what got more expensive today, what got cheaper, browse by category, and open any product to compare its price across 12 markets around the country.

Built for Programming Hero Assignment 7 (B14-A7-Bazar Dor).

Live site: https://bazardor-tarek.vercel.app

Repository: https://github.com/TarekAhmed353/PH-Seventh-Assignment

## Features

- The home page opens with today's date in Bangla, then shows the 6 products whose price went up the most today and the 6 that dropped the most, followed by the full list of products.
- A ticker under the navbar keeps scrolling through every product with its current price and the change since yesterday.
- Each category (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) has its own page that you can sort by price, low to high or high to low. Prices are shown in Bengali digits, but the sort runs on the actual numbers, so ১২০ comes after ৯৫ the way it should.
- The product page shows the lowest, highest and average price, plus a table of all 12 markets with their division and price range. You have to be signed in to open it. If you aren't, the site sends you to the sign in page and brings you back to the same product once you log in.
- You can sign up and sign in with email and password, or with your Google or GitHub account. Login is handled by BetterAuth and accounts are stored in MongoDB.
- The profile page shows your name, email and the date you joined. A separate page lets you change your name.
- Numbers, dates and units are all in Bangla. Text uses the Hind Siliguri font, and a colour emoji font makes sure product icons show up on Windows too.
- Skeleton cards appear while data loads. There is a custom 404 page, and toast messages for sign in, sign out, errors and protected pages.
- If the price API hits its rate limit, the site falls back to a saved copy of the same data, so the pages keep working.
- The layout works on phones, tablets and desktops, and refreshing any page on the live site works without errors.

## Built with

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS 4 and DaisyUI 5
- BetterAuth with the MongoDB adapter
- MongoDB Atlas
- react-hot-toast for notifications
- react-fast-marquee for the price ticker
- lucide-react for icons
- Deployed on Vercel

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, today's biggest risers and fallers, all products |
| `/category/[slug]` | Products in one category with price sorting |
| `/product/[slug]` | Price summary and market-wise table (sign in required) |
| `/signin`, `/signup` | Email, Google and GitHub login |
| `/profile` | Your account details (sign in required) |
| `/profile/update` | Form to change your name (sign in required) |

## Running it locally

Clone the repo and install the packages:

```bash
git clone https://github.com/TarekAhmed353/PH-Seventh-Assignment.git
cd PH-Seventh-Assignment
npm install
```

Create a `.env.local` file in the project root and fill in your own values:

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

For Google and GitHub login, add these callback URLs in your OAuth app settings:

```
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

Then start the dev server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Data

Prices come from the Bazar Dor API provided with the assignment:

- `https://api.api-store.workers.dev/api/bazardor`
- `https://api.abcz.workers.dev/api/bazardor`

The site tries the first URL, then the second, and uses the saved copy in `src/lib/fallback-products.json` only if both fail.