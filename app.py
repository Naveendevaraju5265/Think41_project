from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Load individual datasets
DATASET_DIR = os.path.join(os.path.dirname(__file__), 'ecommerce_data')

distribution_centers = pd.read_csv(os.path.join(DATASET_DIR, 'distribution_centers.csv'))
inventory_items = pd.read_csv(os.path.join(DATASET_DIR, 'inventory_items.csv'))
order_items = pd.read_csv(os.path.join(DATASET_DIR, 'order_items.csv'))
orders = pd.read_csv(os.path.join(DATASET_DIR, 'orders.csv'))
products = pd.read_csv(os.path.join(DATASET_DIR, 'products.csv'))
users = pd.read_csv(os.path.join(DATASET_DIR, 'users.csv'))

@app.route('/top-products', methods=['GET'])
def top_products():
    """
    Returns top 5 most sold products
    """
    if orders.empty or order_items.empty or products.empty:
        return jsonify({'error': 'Dataset not loaded'}), 500
    # Merge order_items with orders to get order status
    merged = pd.merge(order_items, orders, left_on='order_id', right_on='order_id')
    # Filter only completed/delivered orders (assuming status 'delivered' means sold)
    completed_orders = merged[merged['status'] == 'delivered']
    # Count number of items sold per product_id
    product_sales = completed_orders.groupby('product_id').size().sort_values(ascending=False).head(5)
    # Get product names for top products
    top_products = pd.merge(product_sales.reset_index(), products, left_on='product_id', right_on='id')
    result = top_products[['product_name', 0]].rename(columns={0: 'units_sold'}).to_dict(orient='records')
    return jsonify(result)

@app.route('/order-status/<order_id>', methods=['GET'])
def order_status(order_id):
    """
    Returns the status of the order with given order_id
    """
    if df.empty:
        return jsonify({'error': 'Dataset not loaded'}), 500
    order = df[df['order_id'] == int(order_id)]
    if order.empty:
        return jsonify({'error': 'Order ID not found'}), 404
    status = order.iloc[0]['order_status']
    return jsonify({'order_id': order_id, 'status': status})

@app.route('/stock-count/<product_name>', methods=['GET'])
def stock_count(product_name):
    """
    Returns the stock count of the given product_name
    """
    if df.empty:
        return jsonify({'error': 'Dataset not loaded'}), 500
    product = df[df['product_name'].str.lower() == product_name.lower()]
    if product.empty:
        return jsonify({'error': 'Product not found'}), 404
    stock_left = product.iloc[0]['stock']
    return jsonify({'product_name': product_name, 'stock_left': stock_left})

@app.route('/columns', methods=['GET'])
def get_columns():
    if df.empty:
        return jsonify({'error': 'Dataset not loaded'}), 500
    return jsonify({'columns': df.columns.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
