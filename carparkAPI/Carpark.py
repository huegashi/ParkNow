from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
# Update CORS configuration to be more permissive during development
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/')
def index_page():
	return render_template("index.html")


'''
address route receives POST data from index.html form and "plugs" that into first API
renders list of addresses returned from API
'''
@app.route('/address',methods = ['POST', 'GET'])
def address_listings():
	if request.method == 'POST':
		cp_address = request.form["address"] # form data

		response = requests.get("https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&q=" + cp_address)
		r = response.json()

		cp_info = r['result']['records']
		return render_template("addresses.html", text=cp_info)


'''
carpark route receives POST data from addresses.html form and "plugs" that into second API
renders carpark availability from API
'''
@app.route('/carpark',methods = ['POST', 'GET'])
def carpark_availability():
	if request.method == 'POST':
		cp_number = request.form["Carpark"] 

		carpark_api = requests.get("https://api.data.gov.sg/v1/transport/carpark-availability")
		carpark_json = carpark_api.json()
		cp_data = carpark_json['items'][0]["carpark_data"]

		for x in cp_data: 								
			if x["carpark_number"] == cp_number:
				cp_lots = x["carpark_info"]
				raw_time = x['update_datetime']  # 2018-10-08T18:06:06 
				timestamp = raw_time[-8:] + '  /' + raw_time[:-9]
				return render_template("carparks.html", text=cp_lots, data=cp_number, time=timestamp) 
		return render_template("carparks.html", text="", data=cp_number) # else error handling

# Add a new route specifically for the carpark list
@app.route('/api/carparks', methods=['GET'])
def get_carparks():
    try:
        response = requests.get("https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c")
        data = response.json()
        
        if 'result' in data and 'records' in data['result']:
            carparks = data['result']['records']
            formatted_carparks = [
                {
                    'value': carpark['car_park_no'],
                    'label': f"{carpark['address']} ({carpark['car_park_no']})"
                }
                for carpark in carparks
            ]
            return jsonify(formatted_carparks)
        else:
            return jsonify([])
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)