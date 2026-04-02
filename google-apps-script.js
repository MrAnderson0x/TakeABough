// ============================================
// Google Apps Script for Take A Bough Reviews
// ============================================
// SETUP INSTRUCTIONS:
// 1. Create a Google Sheet with headers: Timestamp | Name | Location | Rating | Review | Approved
// 2. Go to Extensions > Apps Script
// 3. Paste this entire code into the script editor
// 4. Click Deploy > New Deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the deployment URL
// 6. Paste the URL into js/main.js where it says REVIEWS_SCRIPT_URL = ''
// 7. Delete this file from the repo (it's just for reference)
// ============================================

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date().toISOString(),
    data.name,
    data.location,
    data.rating,
    data.review,
    "no"  // Not approved by default
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var reviews = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    // Only return approved reviews (column F = "yes")
    if (row[5] && row[5].toString().toLowerCase() === "yes") {
      reviews.push({
        name: row[1],
        location: row[2],
        rating: row[3],
        review: row[4]
      });
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify(reviews))
    .setMimeType(ContentService.MimeType.JSON);
}
