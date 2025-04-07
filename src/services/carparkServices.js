// /services/carparkService.js

export async function fetchCarparkData() {
    try {
      const response = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  }
  
  export async function loadCarparkData() {
    const carparkData = await fetchCarparkData();
    
    if (carparkData && carparkData.items) {
      const parsedData = carparkData.items[0].carpark_data.map(carpark => {
        return carpark.carpark_info.map(info => ({
          carparkNumber: carpark.carpark_number,
          lotType: info.lot_type,
          totalLots: info.total_lots,
          availableLots: info.lots_available,
          lastUpdated: carpark.update_datetime,
        }));
      }).flat();
  
      localStorage.setItem('carparkData', JSON.stringify(parsedData));
      console.log('Carpark data loaded and stored locally.');
      return parsedData;
    } else {
      console.error('No carpark data available.');
    }
  }
  