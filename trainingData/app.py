from flask import Flask, jsonify, request
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn import svm
import pandas as pd

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

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json['data']
        input_data_as_numpy_array = np.asarray(input_data)
        input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
        std_data = scaler.transform(input_data_reshaped)
        prediction = classifier.predict(std_data)

        result = 'Tanah Tidak Subur' if prediction[0] == 0 else 'Tanah Subur'

        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
