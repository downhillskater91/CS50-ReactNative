import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Row = (props) => (
	<View style={styles.contactItem}>
		<Text style={styles.nameText}>{props.name}</Text>
		<Text style={styles.phoneText}>{props.phone}</Text>
	</View>
);

export default Row;

const styles = StyleSheet.create({
	contactItem: {
		padding: 20,
	},
	nameText: {
		fontSize: 18,
		fontWeight: "500",
	},
	phoneText: {
		fontSize: 16,
	},
});