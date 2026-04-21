from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

def generate_bubble_sort_trace(data):
    trace = []
    arr = data.copy()
    n = len(arr)
    
    # Initial state
    trace.append({"array": arr.copy(), "comparing": [], "swapping": []})
    
    for i in range(n):
        for j in range(0, n - i - 1):
            # Step: We are comparing these two
            trace.append({"array": arr.copy(), "comparing": [j, j + 1], "swapping": []})
            
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                # Step: We just swapped them
                trace.append({"array": arr.copy(), "comparing": [], "swapping": [j, j + 1]})
                
    # Final state
    trace.append({"array": arr.copy(), "comparing": [], "swapping": []})
    return trace

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/sort/bubble')
def bubble_sort():
    # Example unsorted data
    unsorted_data = [20, 45, 10, 30, 15]
    trace = generate_bubble_sort_trace(unsorted_data)
    return jsonify(trace)

if __name__ == '__main__':
    app.run(debug=True, port=5000)