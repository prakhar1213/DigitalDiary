import { createStackNavigator, createBottom } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { EvilIcons, Foundation, Ionicons } from '@expo/vector-icons';
import React from 'react'


import Event from '../Screen/Event'
import AddEvent from '../Screen/AddEvent'
import ViewDetails from '../Screen/ViewDetails';
import UpdateDetails from '../Screen/UpdateDetails';
import Notes from '../Screen/Notes'
import AddNotes from '../Screen/AddNotes'
import NotesViewDetails from '../Screen/NotesViewDetails'
import Reminder from '../Screen/Reminder'
import AddReminder from '../Screen/AddReminder'
import ViewReminder from '../Screen/ViewReminder'
import UpdateReminder from '../Screen/UpdateReminder'




const TestNavigation = createStackNavigator({
    Event: Event,
    AddEvent: {
        screen: AddEvent,
        navigationOptions: {
            headerTitle: 'Add Event'
        }
    },
    ViewDetails: {
        screen: ViewDetails,
        navigationOptions: {
            headerTitle: 'View Details'
        }
    },
    UpdateDetails: {
        screen: UpdateDetails,
        navigationOptions: {
            headerTitle: 'Update Details'
        }
    },


},

    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black'
            },
            headerTintColor: 'white'
        }
    }
);

const NotesNavigation = createStackNavigator({
    Notes: Notes,
    AddNotes: {
        screen: AddNotes,
        navigationOptions: {
            headerTitle: 'Add Notes'
        }
    },
    NotesViewDetails: {
        screen: NotesViewDetails,
        navigationOptions: {
            headerTitle: 'Your Note'
        }
    },



},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black'
            },
            headerTintColor: 'white'
        }
    })

const ReminderNavigation = createStackNavigator({
    Reminder: Reminder,
    AddReminder: {
        screen: AddReminder,
        navigationOptions: {
            headerTitle: 'Add Reminder'
        }
    },
    ViewReminder: {
        screen: ViewReminder,
        navigationOptions: {
            headerTitle: 'Reminder'
        }
    },
    UpdateReminder: {
        screen: UpdateReminder,
        navigationOptions: {
            headerTitle: 'Update Reminder'
        }
    },



},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black'
            },
            headerTintColor: 'white'
        }
    })



const TabNavigator = createBottomTabNavigator({

    StackEvent: {
        screen: TestNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <EvilIcons name="calendar" size={40} color={tabInfo.tintColor} />
            },


        }
    },
    TabNotes: {
        screen: NotesNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Foundation name="clipboard-notes" size={30} color={tabInfo.tintColor} />
            },
        }
    },
    TabReminder: {
        screen: ReminderNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="md-alarm" size={30} color={tabInfo.tintColor} />
            },
        }
    }

},
    {
        tabBarOptions: {
            activeTintColor: '#B10000',
            inactiveBackgroundColor: '#000000',
            inactiveTintColor: '#ffffff',
            activeBackgroundColor: '#000000',
            showLabel: false,
            tabStyle: {
                height: '100%',

            }

        }
    }
)

export default createAppContainer(TabNavigator);
