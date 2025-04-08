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
  
  export async function fetchCarparksByAddress(searchAddress) {
    try {
      const datasetId = "d_23f946fa557947f93a8043bbef41dd09";
      const url = "https://data.gov.sg/api/action/datastore_search?resource_id=" + datasetId;
      
      // First fetch all carpark data
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch carpark address data');
      }
      
      const data = await response.json();
      if (!data.result || !data.result.records) {
        throw new Error('Invalid data format received');
      }

      // Filter carparks based on address search
      const searchTerms = searchAddress.toLowerCase().split(' ');
      const matchingCarparks = data.result.records.filter(carpark => {
        if (!carpark.address) return false;
        
        const address = carpark.address.toLowerCase();
        // Check if all search terms are present in the address
        return searchTerms.every(term => term.trim() && address.includes(term.trim()));
      });

      // Log the number of matches for debugging
      console.log(`Found ${matchingCarparks.length} carparks matching '${searchAddress}'`);
      
      return matchingCarparks.map(carpark => ({
        carparkId: carpark.car_park_no,
        address: carpark.address,
        xCoord: carpark.x_coord,
        yCoord: carpark.y_coord
      }));
    } catch (error) {
      console.error('Error fetching carpark address data:', error);
      throw error;
    }
  }
  