import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { isApple, DATA } from './utils/Constants';
import { PriceListView } from './components/fuel';

export default function App() {

  class degalukaina extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: DATA,
        tabViewData: {
          index: 0,
          routes: [
            { key: '1', title: 'E95', id: 'e95' },
            { key: '2', title: 'E98', id: 'e98' },
            { key: '3', title: 'D', id: 'dizelinas' },
            { key: '4', title: 'LPG', id: 'dujos' }
          ]
        }
      }
    }

    handleChangeTab(index) {
      this.setState({ index: index });
    };

    renderHeader(props) {
      return <TabBar {...props} />;
    };

    renderScene({ route }) {
      const data = this.state.data[route.id];

      return (
        <PriceListView tab={route.id} data={data} />
      );
    };

    render() {
      const { tabViewData } = this.state;

      return (
        <View style={styles.container}>
          <TabViewAnimated
            style={styles.main}
            navigationState={tabViewData}
            renderScene={(route) => this.renderScene(route)}
            renderHeader={(props) => this.renderHeader(props)}
            onRequestChangeTab={(index) => this.handleChangeTab(index)}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      paddingTop: isApple ? 20 : 0
    },

    main: {
      flex: 1
    },

    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      textAlign: 'center'
    }
  });

  AppRegistry.registerComponent('degalukaina', () => degalukaina);
}
