import React, { Component } from 'react';
import { View, StyleSheet, Text, ListView, Image, TouchableOpacity } from 'react-native';

class PriceListView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    const { data } = this.props;
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(data) });
  }

  onPress(data) {
    alert('I will change info of id: ' + data.id);
  }

  renderRow(data) {
    const { logo, price } = data;
    const logoUrl = `../../assets/logos/${logo}`;

    return (
      <TouchableOpacity style={styles.row} onPress={() => this.onPress(data)}>
        <Image style={styles.logo} source={{uri: logo}}/>
        <Text style={styles.price}>{price}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { dataSource } = this.state;

    return (
      <ListView
        dataSource={dataSource}
        renderRow={(data) => this.renderRow(data)}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: Image.resizeMode.contain
  },

  price: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
    textAlign: 'right'
  }
});

export default PriceListView;
