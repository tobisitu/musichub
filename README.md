## Instructions to run musicHUB

Open [https://musichub-tobisitu.vercel.app/](https://musichub-tobisitu.vercel.app/) with your browser.

## Instructions to run musicHUB code from github locally

First, run the development server:

$ npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

_______

## ABOUT musicHUB

Welcome to musicHUB -an application created for users to view & manage artists' royalties!
Users log in with google to get started.
They can add artists to the application's db. They can also make edits to or delete artists they created. 
NB: Users can view all artists but only make changes to the artists they added to the db.

## STACK

This web application was created using:
- React
- Firebase
- NextJS
- Vercel
- Tailwind CSS
- NodeJS


## PAGES & COMPONENTS

Navigation:
- musicHUB logo that redirects to home page on click 

- "Add Artist" button that redirects to page /add-artist which allows user to create a new artist in the db.

- User image button which opens a dropdown with navigation button options to 
    /add-artist,
    /dashboard and 
    sign out

___________

Home Page:
- View all the data of all the artists using musicHUB in a table. 
* All table data sorted in descending order by payout amount

    Data available to view:
        - Artist's Name
        - Rate
        - Total streams
        - Total pay from April 2006 till date
        - Average Monthly pay
        - Payout complete
        - Artist's Manager -user that added the artist

- Check/uncheck the 'payout complete' checkbox to indicate an artist has beeen completely paid or not - only editable for artists that you manage

- Click a row to view thee artist's data on a separate page
___________

Add Artist Page:
- Create a new artist by filling out the form with: 
    - Artist's Name -required
    - Rate -required
    - Total streams -required
    - A photo of the artist -optional
___________

Dashboard Page:
- View all the data of the artists you manage in a table. 
* All table data sorted in descending order by payout amount

    Data available to view:
        - Artist's Name
        - Rate
        - Total streams
        - Total pay from April 2006 till date
        - Average Monthly pay
        - Payout complete
        - Artist's Manager -user that added the artist

- Check/uncheck the 'payout complete' checkbox to indicate an artist has beeen completely paid or not - only editable for artists that you manage

- Click a row to view the artist's data on a separate page

- Click on the 'pencil' button to edit the artist

- Click on the 'trashcan' button to delete the artist
__________

Artist Page:
- View all the data of the artists you selected

    Data available to view:
        - Artist's Photo 
        - Artist's Name
        - Artist's Manager (user that added the artist)
        - Payment Status
        - Rate
        - Total streams
        - Total pay from April 2006 tiil date
        - Average Monthly pay
        

- Check/uncheck the 'payout complete' checkbox to indicate an artist has beeen completely paid

- Click on the 'pencil' button to edit the artist - only available for artists that you manage

- Click on the 'trashcan' button to delete the artist - only available for artists that you manage


