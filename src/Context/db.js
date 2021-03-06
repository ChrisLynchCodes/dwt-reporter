// db.js
import Dexie from 'dexie';
import { v4 as uuid } from 'uuid';
import { LastInsertedReportId } from './Report/ReportActions';

export const db = new Dexie('reportImages');
db.version(1).stores({
  images: 'id, reportId',  // primary key
 
});


export async function removeImage(imageId) {
  
    
  try {
     await db.images.delete(imageId); 
           
  } catch (error) {
    console.log(error);
  }
}


export async function addImage(imageSrc, callback) {
  
    
    try {
      const reportId = LastInsertedReportId()
     
      
      // Add the new image to the database
      const image = await db.images.add({
        id: uuid(),
        image: imageSrc,
        reportId: reportId
      });
      callback(image);

     
    } catch (error) {
      console.log(error);
    }
  }

//   export function ImageById({id}) {
//     const image = useLiveQuery(
//       async () => {
//         //
//         // Query Dexie's API
//         //
//         const image = await db.images
//           .where('id')
//           .equals(id)
//             .first();
  
//         // Return result
//         return image;
//       },
//       // specify vars that affect query:
//       [id] 
//     )
//  }

// //  export function ImageList() {
// //   const images = useLiveQuery(
// //     () => db.images.toArray()
// //   );
// //   return images

// // }

// export const ImageList = () => {
  
//   try {

//     const images = useLiveQuery(
//       () => db.images.toArray()
      
//     )
    
    
//     return images;
    

//   } catch (e) {
//     debugger
//       console.log("ERROR" + e);
//   }

// }