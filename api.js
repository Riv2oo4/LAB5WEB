function obtenerDatosDeAPI() {
    // URL de la API
    const url = "https://chat.arpanetos.lol/messages";
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos obtenidos:", data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }
  obtenerDatosDeAPI();