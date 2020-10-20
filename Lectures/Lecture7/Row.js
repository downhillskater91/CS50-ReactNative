import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

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

Row.propTypes = {
	name: PropTypes.string,
	phone: PropTypes.string,
}

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