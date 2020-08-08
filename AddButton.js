import React, { Component } from 'react';
import { View, Icon, Fab } from 'native-base';
import { Animated } from 'react-native'

export default class FABExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        };
    }


    render() {

        return (

            <View style={{ flex: 1 }}>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#B10000', height: 70, width: 70, borderRadius: 50 }}
                    position="bottomRight"
                    onPress={this.props.onPress}>
                    <Icon name={this.props.name} />

                </Fab>
            </View>
        );
    }
}