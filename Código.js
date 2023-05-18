idSheet = '19ODRcAVoujVILQsV3HqEGPS8ESt8D1alHNue9rrwN-o';
sheetPQR = SpreadsheetApp.openById(idSheet);

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function registerData(depto, pqr) {
  const email = Session.getActiveUser().getEmail();
  try {
    sheetPQR.appendRow([getLastId() + 1, email, depto, pqr, 'REGISTRO']);
    addOptions();
    return true;
  } catch(err) {
    return false;
  }
}

function addOptions() {
  const lastRow = sheetPQR.getLastRow();
  const cell = sheetPQR.getRange(`E${lastRow}`);
  const options = ['REGISTRO', 'NOTIFICAR', 'NOTIFICADO'];
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(options, true).build();
  cell.setDataValidation(rule);
}

function getLastId() {
  const ids = sheetPQR.getDataRange().getValues();
  const id = ids[ids.length - 1][0];
  return (id === 'ID') ? 0 : id;
}

function test() {
  // registerData('RH', 'ESTE ES UN EJEMPLO');
  console.log('<<<< ', getLastId())
}

