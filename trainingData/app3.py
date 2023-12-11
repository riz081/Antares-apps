from flask import Flask, jsonify, request
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn import svm
import pandas as pd
import requests

app = Flask(__name__)

# Load the trained SVM model
tanah_dataset = pd.read_csv('dataset2.csv')
X = tanah_dataset.drop(columns='Output', axis=1)
Y = tanah_dataset['Output']

scaler = StandardScaler()
scaler.fit(X)
standardized_data = scaler.transform(X)
X = standardized_data

classifier = svm.SVC(kernel='linear')
classifier.fit(X, Y)

def fetch_antares_data(api_url, headers):
    try:
        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
            return None

    except Exception as e:
        print(f"Error: {str(e)}")
        return None

def extract_con_values(data):
    try:
        # Sort the data based on the timestamp in descending order
        sorted_data = sorted(data.get('m2m:list', []), key=lambda x: x.get('m2m:cin', {}).get('ct', ''), reverse=True)
        
        # Extract "con" values from the latest entry
        con_values = [sorted_data[0].get('m2m:cin', {}).get('con', 'N/A')]
        con_values_int = [int(value.strip("'")) for value in con_values]
        return con_values_int
    except Exception as e:
        print(f"Error extracting con values: {str(e)}")
        return []

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Extract "con" values from the query parameters
        con_values = [
            float(request.args.get('nitrogen', 0)),
            float(request.args.get('ph', 0)),
            float(request.args.get('potassium', 0)),
            float(request.args.get('phosphorus', 0)),
            float(request.args.get('moisture', 0)),
            float(request.args.get('temperature', 0)),
            float(request.args.get('conductivity', 0)),
        ]

        # Perform prediction with the provided "con" values
        std_data = scaler.transform([con_values])
        prediction = classifier.predict(std_data)
        result = 'Buruk' if prediction[0] == 0 else ('Kurang Subur' if prediction[0] == 1 else ('Subur' if prediction[0] == 2 else 'Sangat Subur'))

        return jsonify({'forecasting': result, 'data_con': con_values})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
