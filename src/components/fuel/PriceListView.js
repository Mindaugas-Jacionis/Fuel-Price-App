import React, { Component } from 'react';
import { View, StyleSheet, Text, ListView, Image, TouchableOpacity, TextInput } from 'react-native';

class PriceListView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      showEditView: false,
      tab: this.props.tab,
      id: null,
      text: null
    };
  }

  componentWillMount() {
    const { data } = this.props;
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(data) });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.data) });
    }
  }

  showModal(data) {
    this.setState({
      id: data.id,
      showEditView: true,
      text: String(data.price)
    });
  }

  dismissModal() {
    this.setState({
      id: null,
      showEditView: false,
      text: null
    });
  }

  onSave() {
    const { text, tab, id } = this.state;
    this.props.onSave(tab, id, text);
    this.dismissModal();
  }

  renderRow(data) {
    const { logo, price } = data;
    const logoUrl = `../../assets/logos/${logo}`;

    return (
      <TouchableOpacity style={styles.row} onPress={() => this.showModal(data)}>
        <Image style={styles.logo} source={{uri: logo}}/>
        <Text style={styles.price}>{price}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { dataSource, showEditView } = this.state;

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={(data) => this.renderRow(data)}
        />
        <TouchableOpacity onPress={() => this.dismissModal()} style={showEditView ? styles.visible : styles.invisible}>
          <TouchableOpacity style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <TouchableOpacity style={styles.save} onPress={() => this.onSave()}>
              <Text style={styles.saveText}>Išsaugoti</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

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
  },

  invisible: {
    height: 0,
    width: 0,
    overflow: 'hidden'
  },

  visible: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '80%',
    backgroundColor: '#c8c7cc',
    borderRadius: 6,
    marginBottom: 100
  },

  input: {
    lineHeight: 35,
    height: 35,
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 17,
    borderColor: '#efeff4',
    backgroundColor: '#efeff4',
    borderWidth: 1,
    borderRadius: 6,
    textAlign: 'center'
  },

  save: {
    backgroundColor: '#68a0cf',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center'
  },

  saveText: {
    color: '#efeff4',
    fontWeight: '700'
  }
});

export default PriceListView;
