import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Order } from "../../../types/order.type";
import { Product } from "../../../types/product.type";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  section: {
    padding: 10,
  },
});

const OrderDocument = ({
  order,
  products,
}: {
  order: Order;
  products: Product[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Order ID: {order.id}</Text>
        <Text>Date: {new Date(order.createdAt).toLocaleString()}</Text>
        <Text>Customer Name: {order.customerName}</Text>
        <Text>Shipping Address: {order.address}</Text>
      </View>
      <View style={styles.section}>
        {order.items.map((item, index) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return <></>;
          return (
            <Text key={index}>
              Product: {product.name} - Quantity: {item.quantity}
            </Text>
          );
        })}
      </View>
    </Page>
  </Document>
);

export default OrderDocument;
