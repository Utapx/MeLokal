- Admin opens `/admin/submissions`, enters the script property token, and approves or rejects the submission. Approved submissions can be removed with **Remove from website**, which deletes the row from Google Sheets.
# Google Sheets submissions

## 1. Create the sheet

Create a Google Sheet, then open **Extensions > Apps Script** and paste the contents of `scripts/google-apps-script/Code.gs`.

The script creates a `Submissions` tab with these columns on the first request:

`id`, `createdAt`, `status`, `name`, `region`, `tagline`, `description`, `category`, `address`, `latitude`, `longitude`, `heroImage`, `submitterName`, `submitterEmail`, `reviewedAt`, `googleMapsUrl`

## 2. Set the admin token

In Apps Script, open **Project Settings > Script Properties** and add:

- Property: `ADMIN_TOKEN`
- Value: a long random secret

Do not put this token in the public frontend environment variables. Enter it manually on `/admin/submissions` when reviewing.

## 3. Deploy the API

Use **Deploy > New deployment > Web app**:

- Execute as: **Me**
- Who has access: **Anyone**

Copy the Web app URL into `.env.local`:

```env
VITE_SUBMISSIONS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart Vite after changing `.env.local`.

## 4. Use the workflow

- User opens `/submit-destination` and submits a place.
- Apps Script writes it to `Submissions` with `status = pending`.
- Admin opens `/admin/submissions`, enters the script property token, and approves or rejects it.
- Explore fetches approved submissions and displays them with the static destinations.

The form asks the user to select one of the existing cities and submit a place inside that city. It also asks for a Google Maps pin URL. Apps Script validates the city, extracts latitude and longitude from the URL, stores both coordinates and the original URL, and the public API only returns approved rows. The admin list only returns pending and approved rows when the token is valid.
