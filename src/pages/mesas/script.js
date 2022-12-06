window.onload = async function () {
   const tables = await getTables();

   renderTables(tables);
}

async function getTables(){
   try {
      const response = await fetch("http://localhost:3000/tables")

      const data = await response.json();

      return data;
   } catch (error) {
      console.error(error);
   }
}

function renderTables(tables){
   const tablesContainer = document.getElementById("mesas");

   let generalTemplate = "";

   tables.map((table)=> {
      const ocupada = table.engaged ? "ocupada" : "livre"
      generalTemplate+=`<button class=${ocupada}>Mesa ${table.id}</button>`
   })

   tablesContainer.insertAdjacentHTML("beforeend", generalTemplate)
}