// We are creating constants that we will use later on
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// Logging information about our workbook

function logWorkbookInformation() {
  //get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is ${workbook.name}`);

  //get the array of dashboards and stand alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index ${index} is: ${element.name}`);
  });

  //finding the actual active worksheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is ${vizActiveSheet.name}`);

  //list all of the worksheets with the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index ${index} is ${worksheetName}`);
  });

  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  saleByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  saleSales = listSheets.find((ws) => ws.name == "Total Sales");
  saleBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

//Constants for buttons
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

//create function for when buttons are presssed
function oregonWashFuction() {
  console.log(oregonWashingtonButton.value);
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  saleByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  saleSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  saleBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

//function clear state filter
function clearStateFilter() {
  console.log(clearFilterButton.value);
  saleMap.clearFilterAsync("State");
  saleByProduct.clearFilterAsync("State");
  saleSales.clearFilterAsync("State");
  saleBySegment.clearFilterAsync("State");
}

//function to undo
function unDo() {
  console.log(undoButton.value);
  viz.undoAsync();
}

//run for function when button is clicked
oregonWashingtonButton.addEventListener("click", oregonWashFuction);
//run clear filter button
clearFilterButton.addEventListener("click", clearStateFilter);
//run undo button
undoButton.addEventListerner("click", unDo);

//run our funtion when the workbook becomes interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);
