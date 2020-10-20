import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Row = (props) => (
	<TouchableOpacity 
		style={styles.contactItem}
		onPress={() => {
			props.onSelectContact(props)
		}}
	>
		<Text style={styles.nameText}>{props.name}</Text>
		<Text style={styles.phoneText}>{props.phone}</Text>
	</TouchableOpacity>
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